import { ref } from "vue";
import {
  db,
  collection,
  updateDoc,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "../../firebaseInit";

export function useWebRTC() {
  const configuration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const localStream = ref(0);
  const remoteStream = ref(0);
  const peerConnection = new RTCPeerConnection(configuration);
  let roomRef = null;
  let remoteDescriptionSet = false;
  let iceCandidateQueue = [];

  peerConnection.ontrack = (event) => {
    console.log("On track: " + event);
    const [stream] = event.streams;
    remoteStream.value = stream; // Assuming remoteStream is a Vue ref
  };

  peerConnection.onconnectionstatechange = function (event) {
    console.log(
      `Connection state changed to ${peerConnection.connectionState}`
    );
  };
  peerConnection.onicegatheringstatechange = function (event) {
    console.log(
      `ICE gathering state changed: ${peerConnection.iceGatheringState}`
    );
    console.log(event);
  };

  // Initialize the local stream
  async function initLocalStream() {
    localStream.value = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    console.log({
      localStream: localStream.value,
      tracks: localStream.value.getTracks(),
    });
    localStream.value
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream.value));
  }

  // Create a new room within an existing session
  async function createRoom(id) {
    await initLocalStream();
    // Create an initial document to update.
    roomRef = doc(db, "sessions", id.toString());

    collectIceCandidates(id, true);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(offer.sdp);
    // To update age and favorite color:
    await updateDoc(roomRef, {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    });

    const unsubscribe = onSnapshot(roomRef, async (snapshot) => {
      console.log("Got updated room:", snapshot.data());
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log("Set remote description: ", data.answer);
        const answer = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answer);
        remoteDescriptionSet = true;
        iceCandidateQueue.forEach((candidate) =>
          peerConnection.addIceCandidate(candidate)
        );
        iceCandidateQueue = [];
      }
    });

    return unsubscribe;
  }

  async function joinRoom(id) {
    await initLocalStream();

    roomRef = doc(db, "sessions", id.toString());
    collectIceCandidates(id);

    // Listen to changes in the document
    const unsubscribe = onSnapshot(roomRef, async (snapshot) => {
      console.log("Got updated room:", snapshot.data());
      const data = snapshot.data();
      if (data && data.offer && !peerConnection.currentRemoteDescription) {
        console.log("Set remote description: ", data.offer);
        const offer = data.offer;
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        remoteDescriptionSet = true;
        iceCandidateQueue.forEach((candidate) =>
          peerConnection.addIceCandidate(candidate)
        );
        iceCandidateQueue = [];

        // Create an answer now that you've received an offer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Update Firestore with your answer
        await updateDoc(roomRef, {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        });
      }
    });
    return unsubscribe;
  }

  // Listen for ICE candidates and handle them
  function collectIceCandidates(id, isCaller = false) {
    console.log({ collectIceCandidates: id });
    const candidatesCollection = collection(
      db,
      "sessions",
      id,
      "iceCandidates"
    );

    // ICE candidate collection and setting
    peerConnection.onicecandidate = async (event) => {
      console.log("ICE Candidate event:", event);
      if (event.candidate) {
        console.log(event);
        await addDoc(candidatesCollection, event.candidate.toJSON());
        console.log("event");
      }
    };

    // Listen for remote ICE candidates
    const q = query(candidatesCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log({ snapshot });
      snapshot.docChanges().forEach((change) => {
        console.log({ change });
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          if (remoteDescriptionSet) {
            peerConnection.addIceCandidate(candidate);
          } else {
            iceCandidateQueue.push(candidate);
          }
        }
      });
      console.log("after snapshot");
    });

    return unsubscribe;
  }

  function addIceCandidates() {
    const candidatesCollection = collection(
      db,
      "sessions",
      id,
      "iceCandidates"
    );
  }

  // Clean up on disconnect
  async function onDisconnect() {
    localStream.value.getTracks().forEach((track) => track.stop());
    peerConnection.close();
  }

  return {
    localStream,
    remoteStream,
    initLocalStream,
    createRoom,
    joinRoom,
    collectIceCandidates,
    onDisconnect,
  };
}

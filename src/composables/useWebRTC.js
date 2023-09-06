import { ref } from "vue";
import {
  db,
  collection,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "../../firebaseInit";

export default function useWebRTC() {
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
  const localStream = ref(null);
  const peerConnection = new RTCPeerConnection(configuration);
  let roomRef = null;

  // Initialize the local stream
  async function initLocalStream() {
    localStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.value
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream.value));
  }

  // Create a new room within an existing session
  async function createRoom(id) {
    // Create an initial document to update.
    roomRef = doc(db, "sessions", id.toString());

    collectIceCandidates(id);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

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
      }
    });

    return unsubscribe;
  }

  async function joinRoom(id) {
    roomRef = doc(db, "sessions", id.toString());
    collectIceCandidates(id);

    // Listen to changes in the document
    const unsubscribe = onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (data && data.offer && !peerConnection.currentRemoteDescription) {
        const offer = data.offer;
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        // Create an answer now that you've received an offer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Update Firestore with your answer
        await updateDoc(`sessions/${id}`, {
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
  function collectIceCandidates(id) {
    const candidatesCollection = collection(
      db,
      "sessions",
      id,
      "iceCandidates"
    );

    // ICE candidate collection and setting
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(candidatesCollection, event.candidate.toJSON());
      }
    };

    // Listen for remote ICE candidates
    const q = query(candidatesCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });

    return unsubscribe;
  }

  // Clean up on disconnect
  async function onDisconnect() {
    localStream.value.getTracks().forEach((track) => track.stop());
    peerConnection.close();
  }

  return {
    localStream,
    initLocalStream,
    createRoom,
    joinRoom,
    collectIceCandidates,
    onDisconnect,
  };
}

import { ref } from "vue";
import {
  getDocument,
  updateDocument,
  listenToDocument,
  listenToCollection,
} from "./useFirestore";

export default function useWebRTC() {
  const localStream = ref(null);
  const peerConnection = new RTCPeerConnection();
  let sessionId = null;
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
  async function createRoom(existingSessionId) {
    sessionId = existingSessionId;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    roomRef = await getDocument(`sessions/${sessionId}`);
    await updateDocument(`sessions/${sessionId}`, {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    });
  }

  async function joinRoom(roomID) {
    roomRef = await listenToDocument(`sessions/${roomID}`);

    // Listen to changes in the document
    roomRef.onSnapshot(async (snapshot) => {
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
        await updateDocument(`sessions/${roomID}`, {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        });
      }
    });
  }

  // Listen for ICE candidates and handle them
  function handleICECandidates() {
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const json = event.candidate.toJSON();
        updateDocument(`sessions/${sessionId}/iceCandidates`, json);
      }
    };

    listenToCollection(`sessions/${sessionId}/iceCandidates`, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });
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
    handleICECandidates,
    onDisconnect,
  };
}

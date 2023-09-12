import AgoraRTC from "agora-rtc-sdk-ng";
import { ref, computed } from "vue";

const { VITE_AGORA_APP_ID } = import.meta.env;

export function useAgora() {
  let options = {
    // Pass your App ID here.
    appId: VITE_AGORA_APP_ID,
    // Set the channel name.
    channel: "Brainwriting",
    // Pass your temp token here.
    // "must_be_initialized_by_auth_calling_API",
    token:
      "007eJxTYDizYqP6zOQ/D8UuptpU9n0x/eOpXbz2RJ/LxB3Ke3hWcrQrMCRamCZaJJobp5qYmZkYp1okmpkbGRoYmhqamRiZGJkZlZUzpDYEMjJwvTFhZWSAQBCfh8GpKDEzr7wosyQzL52BAQBiICF2",
    // Set the user ID.
    uid: "must_be__a_string_initialized_by_auth",
  };

  let channelParameters = {
    // A variable to hold a local audio track.
    localAudioTrack: null,
    // A variable to hold a remote audio track.
    remoteAudioTrack: null,
    // A variable to hold the remote user id.
    remoteUid: null,
  };

  let agoraEngine = null;
  const hasJoinedCall = ref(false);

  // Audio Controls
  const isMuteAudio = ref(false);
  const localAudioVolume = computed(() => {
    if (
      !channelParameters.localAudioTrack ||
      channelParameters.localAudioTrack.getVolume == undefined
    ) {
      return 0;
    }
    return channelParameters.localAudioTrack.getVolume();
  });

  const remoteAudioVolume = computed(() => {
    if (
      !channelParameters.remoteAudioTrack ||
      !channelParameters.remoteAudioTrack.getVolume
    ) {
      return 0;
    }
    return channelParameters.remoteAudioTrack.getVolume();
  });

  function initOptions({ uid }) {
    options.uid = uid;
    // must call API for token
  }

  async function startBasicCall() {
    // Create an instance of the Agora Engine
    agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });

    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      // Subscribe and play the remote audio track.
      if (mediaType == "audio") {
        channelParameters.remoteUid = user.uid;
        // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track.
        channelParameters.remoteAudioTrack.play();
        showMessage("Remote user connected: " + user.uid);
      }

      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
        showMessage("Remote user has left the channel");
      });
    });
  }

  async function tryJoinChannel() {
    await agoraEngine.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    showMessage("Joined channel: " + options.channel);
    // Create a local audio track from the microphone audio.
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    // Publish the local audio track in the channel.
    await agoraEngine.publish(channelParameters.localAudioTrack);
    console.log("Publish success!");
    hasJoinedCall.value = true;
  }

  async function leaveCall() {
    // Destroy the local audio track.
    channelParameters.localAudioTrack.close();
    // Leave the channel
    await agoraEngine.leave();
    console.log("You left the channel");
    // Refresh the page for reuse
    // window.location.reload();
    hasJoinedCall.value = false;
  }

  const toggleMute = () => {
    if (isMuteAudio.value == false) {
      console.log("Mute the local audio");
      // Mute the local audio.
      channelParameters.localAudioTrack.setEnabled(false);
      isMuteAudio.value = true;
    } else {
      console.log("Unmute the local audio");
      // Unmute the local audio.
      channelParameters.localAudioTrack.setEnabled(true);
      isMuteAudio.value = false;
    }
  };

  const setLocalAudioVolume = (volume) => {
    console.log("Volume of local audio :" + volume);
    // Set the local audio volume.
    channelParameters.localAudioTrack.setVolume(parseInt(volume));
  };

  const setRemoteAudioVolume = (volume) => {
    console.log("Volume of remote  audio :" + volume);
    // Set the remote audio volume.
    channelParameters.remoteAudioTrack.setVolume(parseInt(volume));
  };

  function showMessage(text) {
    console.log({ useAgora: text });
  }

  startBasicCall();

  return {
    channelParameters,
    hasJoinedCall,
    isMuteAudio,
    localAudioVolume,
    remoteAudioVolume,
    startBasicCall,
    initOptions,
    tryJoinChannel,
    leaveCall,
    toggleMute,
    setLocalAudioVolume,
    setRemoteAudioVolume,
  };
}

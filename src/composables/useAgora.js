import AgoraRTC from "agora-rtc-sdk-ng";

const { VITE_AGORA_APP_ID } = import.meta.env;

export function useAgora() {
  let options = {
    // Pass your App ID here.
    appId: VITE_AGORA_APP_ID,
    // Set the channel name.
    channel: "brainwriting",
    // Pass your temp token here.
    // "must_be_initialized_by_auth_calling_API",
    token:
      "007eJxTYHDuiBUNrN2gtGcRw5+KJW/yb8z5Ni2Bt6HWYv+SXdErHxYpMCRamCZaJJobp5qYmZkYp1okmpkbGRoYmhqamRiZGJkZnb/0J6UhkJFhgtlTZkYGCATxeRiSihIz88qLMksy89IZGACq9iQV",
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
  }

  async function leaveCall() {
    // Destroy the local audio track.
    channelParameters.localAudioTrack.close();
    // Leave the channel
    await agoraEngine.leave();
    console.log("You left the channel");
    // Refresh the page for reuse
    // window.location.reload();
  }

  function showMessage(text) {
    console.log(text);
  }

  startBasicCall();

  return {
    startBasicCall,
    initOptions,
    tryJoinChannel,
    leaveCall,
  };
}

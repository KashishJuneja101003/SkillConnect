const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const socket = io("http://localhost:3000");

const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
});

let localStream;

// Get user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
        localVideo.srcObject = stream;
        localStream = stream;

        // Add local stream tracks to peer connection
        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });
    })
    .catch((error) => console.error("Error accessing media devices:", error));

// Handle remote stream
peerConnection.ontrack = (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
};

// Handle ICE candidates
peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, target: "targetSocketId" });
    }
};

// Listen for offers
socket.on("offer", async (data) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { sdp: answer, target: data.from });
});

// Listen for answers
socket.on("answer", (data) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
});

// Listen for ICE candidates
socket.on("ice-candidate", (data) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
});

// Create an offer
async function createOffer(targetSocketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { sdp: offer, target: targetSocketId });
}

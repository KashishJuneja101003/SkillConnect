const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
    res.send("Skill Connect Signaling Server Running!");
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle offers
    socket.on("offer", (data) => {
        socket.to(data.target).emit("offer", {
            sdp: data.sdp,
            from: socket.id,
        });
    });

    // Handle answers
    socket.on("answer", (data) => {
        socket.to(data.target).emit("answer", {
            sdp: data.sdp,
            from: socket.id,
        });
    });

    // Handle ICE candidates
    socket.on("ice-candidate", (data) => {
        socket.to(data.target).emit("ice-candidate", {
            candidate: data.candidate,
            from: socket.id,
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));

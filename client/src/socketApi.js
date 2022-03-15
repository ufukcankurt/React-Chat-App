import io from "socket.io-client"

let socket;

export const init = () => {
    console.log("Connecting...");
    socket = io("http://localhost:3000",{
        transports : ["websocket"],
    })

    socket.on("connect", () => console.log("Connected!"));
}

export const sendMessage = (message) => {
    if (socket){
        socket.emit("new-message", message)
    }
}

// gelen mesajları dinlemek için
// gönderdiğimiz mesajları, bağlı olan diger client'larda alıyor. 
export const subscribeChat = (cb) => {
    if(!socket) return;

    socket.on("receive-message", (message) => {
        console.log("Yeni mesaj var", message)
        cb(message)
    })
}
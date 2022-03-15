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

// Kanala abone olmak
export const subscribeInitialMessages = (cb) =>{
    if(!socket) return;

    socket.on("message-list", (message) => {
        console.log("Initial", message)
        cb(message)
    })
}

// Uygulamada kullanıcı girişi olmadığı için mesajları kullanıcı ID'leriyle eşleştiremiyoruz.
// Bu nedenle sayfayı yeniledikten sonra tüm mesajlar sol tarafta gözüküyor.. ve "fromMe" parametresini tutamadığımız için tekrardan kullanılmıyor 
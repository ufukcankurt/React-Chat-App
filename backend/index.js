const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

const Messages = require("./lib/Messages");

app.use(cors());

app.get("/", (req, res) => {
	res.end("Merhaba Socket.IO");
});

io.on("connection", (socket) => { //bağlantı gerçekleştiği anda 
	console.log("a user connected");

	Messages.list((data) => { // redis üzerindeki mesajları alıyoruz
		console.log(data);
		socket.emit("message-list", data); // bağlanmış olan kullanıcıya iletiyoruz || Message-list kanalına gönderiliyor.
	});

	socket.on("new-message", (message) => { // herhangi bir mesaj backend'e emit edildiğinde 
		console.log(message);
		Messages.upsert({ message }); // bunu redise yazıyoruz

		// dinleyeceğimiz kanal "receive-message" kanalı
		socket.broadcast.emit("receive-message", message); // daha sonra bağlı olan diğer client'lara bunu emitliyoruz
	});

	socket.on("disconnect", () => console.log("a user disconnected")); // disconnect
});

http.listen(process.env.PORT || "3000", () => {
	console.log("listening on *:3000");
});
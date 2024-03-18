import MessageManager from "../Dao/controllers/Mongo/messageManagerMongo.js";

const mm = new MessageManager();

const socketChat = (socketServer) => {
    socketServer.on('connection', async (socket) => {
        console.log("Conectado usuario con id: " + socket.id);
    
        socket.on("mensaje", async (info) => {
            await mm.createMessage(info);
            // Emitir el mensaje a todos los clientes conectados
            socketServer.emit("chat", await mm.getMessages());
        });

        socket.on("clearchat", async () => {
            // borrar todos los mensajes utilizados en el chat
            await mm.deleteAllMessages(); 
        });

        socket.on("nuevousuario", (usuario) => {
            socket.broadcast.emit("broadcast", usuario);
        });
    });
};

export default socketChat;

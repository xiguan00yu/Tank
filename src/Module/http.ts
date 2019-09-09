import Express from "express";
import HttpServer from "http";
import SocketIO from "socket.io";
import { HTTP } from "../Common";

const app = Express();
const server = new HttpServer.Server(app);
const io = SocketIO(server);

server.listen(HTTP.PORT);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// only input socket.io
export default (
    socketBindArr: Array<{ event: string; listener: (data: any) => void }>
) => {
    // event
    io.on("connection", socket => {
        console.log(
            "socket connection",
            socket.request.connection.remoteAddress
        );
        socketBindArr.map(({ event, listener }) =>
            socket.on(event, data => {
                console.log(`socket get message event => ${event}`, data);
                return listener && listener(data);
            })
        );
    });
    return [app, io];
};

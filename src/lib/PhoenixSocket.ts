import { Socket, Channel } from "phoenix";

class PhoenixSocket {
  socket: Socket | undefined;
  channel: Channel | undefined;

  constructor() {
    this.connect();
  }

  joinChannel() {
    if (this.socket) {
      this.channel = this.socket.channel("talksgame", {});
      this.channel.join().receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      });
    }
  }

  connect() {
    const uri = process.env.REACT_APP_SOCKET_URL ?? "";
    this.socket = new Socket(uri);
    this.socket.connect();
    return this;
  }
}

export default PhoenixSocket;

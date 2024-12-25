export default class TextSocket {
    private socket: WebSocket | null = null;
    private messageCallback: (message: string) => void = () => {};

    public connect(url: string, onMessage: (message: string) => void): void {
        if (this.socket) {
            this.disconnect();
        }

        this.socket = new WebSocket(url);
        this.messageCallback = onMessage;

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            this.messageCallback(event.data);
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error: ', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    public sendMessage(message: string): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

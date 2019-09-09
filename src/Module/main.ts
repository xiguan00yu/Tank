import { Board, Car, Http } from "../Module";

class Main {
    public static instance: Main = null;
    public static getInstance = (): Main => {
        if (Main.instance) {
            return Main.instance;
        } else {
            Main.instance = new Main();
        }
        return Main.instance;
    };
    constructor() {
        this.init();
    }
    private init = () => {
        // init board
        Board.getInstance()
            .addReadyListener(this.onReady)
            .addExitListener(this.onExit)
            .startBoard();
    };
    private onReady = () => {
        // ready board
        Http([
            {
                event: "car-left",
                listener: data => Car.getInstance().left(data.speed)
            },
            {
                event: "car-right",
                listener: data => Car.getInstance().right(data.speed)
            },
            {
                event: "car-forward",
                listener: data => Car.getInstance().forward(data.speed)
            },
            {
                event: "car-reverse",
                listener: data => Car.getInstance().reverse(data.speed)
            },
            {
                event: "car-stop",
                listener: data => Car.getInstance().stop()
            }
        ]);
    };
    private onExit = () => {
        // exit board
        Car.getInstance().stop();
    };
}

export default Main;

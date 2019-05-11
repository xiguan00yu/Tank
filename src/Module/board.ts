import five from "johnny-five";
const RaspiIO = require("raspi-io").RaspiIO;

export type IBoardListener = (ioBoard: five.Board) => void;

class Board {
    public static instance: Board = null;
    public static getInstance = (): Board => {
        if (Board.instance) {
            return Board.instance;
        } else {
            Board.instance = new Board();
        }
        return Board.instance;
    };
    private ioBoard: five.Board = null;
    private readyListeners: IBoardListener[] = [];
    private exitListeners: IBoardListener[] = [];
    public startBoard = (): Board => {
        if (this.ioBoard) {
            return;
        }
        this.ioBoard = new five.Board({
            io: new RaspiIO()
        });
        this.ioBoard.on("ready", this.readyBoard);
        this.ioBoard.on("exit", this.exitBoard);
        return this;
    };
    public addReadyListener = (rls: IBoardListener[] | IBoardListener) => {
        if (!rls) {
            return;
        }
        this.readyListeners = this.readyListeners.concat(
            Array.isArray(rls) ? rls : [rls]
        );
        return this;
    };
    public addExitListener = (els: IBoardListener[] | IBoardListener) => {
        if (!els) {
            return;
        }
        this.exitListeners = this.exitListeners.concat(
            Array.isArray(els) ? els : [els]
        );
        return this;
    };
    private readyBoard = () => {
        if (this.readyListeners.length) {
            this.readyListeners.map(rl => rl && rl(this.ioBoard));
        }
    };
    private exitBoard = () => {
        if (this.exitListeners.length) {
            this.exitListeners.map(el => el && el(this.ioBoard));
        }
    };
}

export default Board;

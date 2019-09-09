import five from "johnny-five";
import { SERVO } from "../Common";

export default class Servo {
    public static instance: Servo = null;
    public static getInstance = (): Servo => {
        if (Servo.instance) {
            return Servo.instance;
        } else {
            Servo.instance = new Servo();
        }
        return Servo.instance;
    };
    private mainServo: five.Servo = null;
    constructor() {
        this.mainServo = new five.Servo(SERVO.main);
    }
    public getMainServo = () => {
        return this.mainServo;
    };
}

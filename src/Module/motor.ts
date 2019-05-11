import five from "johnny-five";
import { MOTOR } from "../Common";

class Motor {
    public static instance: Motor = null;
    public static getInstance = (): Motor => {
        if (Motor.instance) {
            return Motor.instance;
        } else {
            Motor.instance = new Motor();
        }
        return Motor.instance;
    };
    private leftMotor: five.Motor = null;
    private rightMotor: five.Motor = null;
    constructor() {
        this.leftMotor = new five.Motor(MOTOR.LEFT);
        this.rightMotor = new five.Motor(MOTOR.RIGHT);
    }
    public getLeftMotor = () => {
        return this.leftMotor;
    };
    public getRightMotor = () => {
        return this.rightMotor;
    };
}

export default Motor;

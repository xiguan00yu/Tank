import Motor from "./motor";
class Car {
    public static instance: Car = null;
    public static getInstance = (): Car => {
        if (Car.instance) {
            return Car.instance;
        } else {
            Car.instance = new Car();
        }
        return Car.instance;
    };
    private motor: Motor = null;
    constructor() {
        this.init();
    }
    public stop = (): void => {
        const [left, right] = this.getMotor();
        if (left) {
            left.stop();
        }
        if (right) {
            right.stop();
        }
    };
    public reverse = (speed: number): void => {
        const [left, right] = this.getMotor();
        if (left) {
            left.reverse(speed);
        }
        if (right) {
            right.reverse(speed);
        }
    };
    public forward = (speed: number): void => {
        const [left, right] = this.getMotor();
        if (left) {
            left.forward(speed);
        }
        if (right) {
            right.forward(speed);
        }
    };
    private init = () => {
        this.motor = Motor.getInstance();
    };
    private getMotor = () => {
        return [this.motor.getLeftMotor(), this.motor.getRightMotor()];
    };
}

export default Car;

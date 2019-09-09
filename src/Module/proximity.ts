import five from "johnny-five";
import { PROXIMITY } from "../Common";

export default class Proximity {
    public static instance: Proximity = null;
    public static getInstance = (): Proximity => {
        if (Proximity.instance) {
            return Proximity.instance;
        } else {
            Proximity.instance = new Proximity();
        }
        return Proximity.instance;
    };
    private mainProximity: five.Proximity = null;
    constructor() {
        this.mainProximity = new five.Proximity(PROXIMITY.main);
    }
    public getMainProximity = () => {
        return this.mainProximity;
    };
}

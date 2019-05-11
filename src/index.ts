import { Board, Car } from "./Module";
Board.getInstance()
    .addReadyListener(() => {
        Car.getInstance().forward(255);
    })
    .addExitListener(() => {
        Car.getInstance().stop();
    })
    .startBoard();

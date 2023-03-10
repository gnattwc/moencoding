import { TwoWaterJugRiddle, JugSolution, JugAction } from "./TwoWaterJugRiddle";
import { bfsSolver } from "./WaterJugSolver";

// const root: HTMLElement = document.getElementById("root")!;
// root.textContent = "hi root";

const riddle = new TwoWaterJugRiddle(bfsSolver);
const solution: JugSolution = riddle.solveRiddle(4, 3, 2);

const list: HTMLElement = document.getElementById("outputList")!;
if (solution.length > 0) {
  solution.forEach((s,i) => {
    const li = document.createElement("li");
    const str:string = 'action='+JugAction[s.action]+ s.state;
    list.appendChild(document.createTextNode(str));
  });
} else {
  const li = document.createElement("li");
  list.appendChild(document.createTextNode("No Solution"));
}

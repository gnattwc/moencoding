import { TwoWaterJugRiddle, JugSolution, JugAction } from "./TwoWaterJugRiddle";
import { bfsSolver } from "./WaterJugSolver";

// const root: HTMLElement = document.getElementById("root")!;
// root.textContent = "hi root";

let btn = <HTMLButtonElement>document.getElementById("run");
btn.addEventListener("click", (e: Event) => solveRiddle());

function solveRiddle() {
  //   alert("haha");

  const jug1 = <HTMLInputElement>document.getElementById("leftJug");
  const jug2 = <HTMLInputElement>document.getElementById("rightJug");
  const aim = <HTMLInputElement>document.getElementById("aim");

  console.log(jug1.value, jug2.value, aim.value);
  if (!jug1.value || !jug2.value || !aim.value) {
    return;
  }

  const riddle = new TwoWaterJugRiddle(bfsSolver);
  const solution: JugSolution = riddle.solveRiddle(
    +jug1.value,
    +jug2.value,
    +aim.value
  );

  const list: HTMLElement = document.getElementById("solutionList")!;
  if (solution.length > 0) {
    solution.forEach((s, i) => {
      const li = document.createElement("li");
      const str: string = "action=" + JugAction[s.action] + '   ' + s.state;
      li.innerText = str;
      list.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    list.appendChild(document.createTextNode("No Solution"));
  }
}

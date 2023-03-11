import { TwoWaterJugRiddle, JugSolution, JugAction } from "./TwoWaterJugRiddle";
import { bfsSolver } from "./WaterJugSolver";

const btn = <HTMLButtonElement>document.getElementById("run");
btn.addEventListener("click", (e: Event) => solveRiddle());

function solveRiddle() {
  clearOutput2();

  const jug1 = <HTMLInputElement>document.getElementById("leftJug");
  const jug2 = <HTMLInputElement>document.getElementById("rightJug");
  const aim = <HTMLInputElement>document.getElementById("aim");

  console.log(jug1.value, jug2.value, aim.value);
  if (!jug1.value || !jug2.value || !aim.value) {
    alert("Please enter all values for X,Y,Z");
    return;
  }

  const form = <HTMLFormElement>document.getElementById("xyzForm");
  form.style.visibility = "hidden";

  const riddle = new TwoWaterJugRiddle(bfsSolver);
  const solution: JugSolution = riddle.solveRiddle(
    +jug1.value,
    +jug2.value,
    +aim.value
  );

  displayOutput2(solution);
  runAnimation(solution, 0, +jug1.value, +jug2.value, +aim.value);
}

function runAnimation(
  solution: JugSolution,
  i: number,
  jug1: number,
  jug2: number,
  aim: number
) {
  const leftGlass = <HTMLDivElement>document.getElementById("leftGlass");
  const rightGlass = <HTMLDivElement>document.getElementById("rightGlass");

  const leftFrom = i > 0 ? (solution[i - 1].state[0] / jug1) * 100 : 0;
  const rightFrom = i > 0 ? (solution[i - 1].state[1] / jug2) * 100 : 0;
  const leftTo = (solution[i].state[0] / jug1) * 100;
  const rightTo = (solution[i].state[1] / jug2) * 100;
  const aniDur = 1600;

  leftGlass.style.setProperty("--leftFillFrom", `-${leftFrom}px`);
  leftGlass.style.setProperty("--leftFillTo", `-${leftTo}px`);
  leftGlass.style.setProperty("--leftAniDur", `${aniDur}ms`);
  rightGlass.style.setProperty("--rightFillFrom", `-${rightFrom}px`);
  rightGlass.style.setProperty("--rightFillTo", `-${rightTo}px`);
  rightGlass.style.setProperty("--rightAniDur", `${aniDur}ms`);

  leftGlass.classList.add("leftAni");
  rightGlass.classList.add("rightAni");

  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  table.rows[i + 1].classList.add("highlight");

  setTimeout(() => {
    resetAnimation(solution, i, jug1, jug2, aim);
  }, 1600);
}

function resetAnimation(
  solution: JugSolution,
  i: number,
  jug1: number,
  jug2: number,
  aim: number
) {
  const leftGlass = <HTMLDivElement>document.getElementById("leftGlass");
  const rightGlass = <HTMLDivElement>document.getElementById("rightGlass");
  leftGlass.classList.remove("leftAni");
  rightGlass.classList.remove("rightAni");

  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  table.rows[i + 1].classList.remove("highlight");

  if (i < solution.length - 1) {
    setTimeout(() => {
      runAnimation(solution, i + 1, jug1, jug2, aim);
    }, 500);
  }
}

// display output
function displayOutput2(solution: JugSolution) {
  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  if (solution.length > 0) {
    table.style.visibility = "visible";
    solution.forEach((s, i) => {
      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(i + 1);

      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      // Add some text to the new cells:
      cell1.innerText = i.toString();
      cell2.innerText = JugAction[s.action];
      cell3.innerText = s.state.toString();
    });
  } else {
    const h2 = <HTMLHeadingElement>document.getElementById("noSolution");
    h2.style.visibility = "visible";
  }
  const form = <HTMLFormElement>document.getElementById("xyzForm");
  form.style.visibility = "visible";
}

function clearOutput2() {
  const h2 = <HTMLHeadingElement>document.getElementById("noSolution");
  h2.style.visibility = "hidden";

  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  table.style.visibility = "hidden";
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

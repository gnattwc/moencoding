import { TwoWaterJugRiddle, JugSolution, JugAction } from "./TwoWaterJugRiddle";
import { bfsSolver } from "./WaterJugSolver";

let btn = <HTMLButtonElement>document.getElementById("run");
btn.addEventListener("click", (e: Event) => solveRiddle());

function solveRiddle() {
  //   alert("haha");
  clearOutput2();

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

  displayOutput2(solution);
}

// display output
function displayOutput2(solution: JugSolution) {
  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  if (solution.length > 0) {
    table.style.visibility = "visible";
    solution.forEach((s, i) => {
      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(i+1);

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
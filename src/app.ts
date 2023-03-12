import { TwoWaterJugRiddle, JugSolution, JugAction } from "./TwoWaterJugRiddle";
import { bfsSolver } from "./WaterJugSolver";

const btn = <HTMLButtonElement>document.getElementById("run");
btn.addEventListener("click", (e: Event) => solveRiddle());

function solveRiddle() {
  clearOutput2();

  const jug1 = <HTMLInputElement>document.getElementById("leftJug");
  const jug2 = <HTMLInputElement>document.getElementById("rightJug");
  const aim = <HTMLInputElement>document.getElementById("aim");
  const MAX_JUG_SIZE = 50_000;
  const MIN_JUG_SIZE = 0;

  if (!jug1.value || !jug2.value || !aim.value) {
    alert("Please enter all values for X,Y,Z");
    return;
  } else if (+jug1.value > MAX_JUG_SIZE || +jug2.value > MAX_JUG_SIZE || +aim.value > MAX_JUG_SIZE ||
    +jug1.value < MIN_JUG_SIZE || +jug2.value < MIN_JUG_SIZE || +aim.value < MIN_JUG_SIZE ) {
    alert(`Please enter X,Y,Z between ${MIN_JUG_SIZE} and ${MAX_JUG_SIZE}`);
    return;
  }

  const inputValuesText = <HTMLHeadingElement>(
    document.getElementById("inputValuesText")
  );
  const str: string = `Input Values: LEFT: ${jug1.value} gallons, RIGHT: ${jug2.value} gallons, AIM: ${aim.value} gallons`;
  inputValuesText.innerText = str;

  const submitBtn = <HTMLButtonElement>document.getElementById("run");
  submitBtn.disabled = true;

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
  if (solution.length > 0) {
    const glassSection = <HTMLDivElement>(
      document.getElementById("glassSection")
    );
    glassSection.style.visibility = "visible";

    // make one jug look smaller
    let leftHeight = jug1 < jug2 ? 80 : 100;
    let rightHeight = jug2 < jug1 ? 80 : 100;

    const leftGlass = <HTMLDivElement>document.getElementById("leftGlass");
    const rightGlass = <HTMLDivElement>document.getElementById("rightGlass");

    const adjustment = 1.1; // the jugs doesn't look full enough when half empty.  Add some adjustment.
    const leftFrom =
      i > 0
        ? Math.min(
            (solution[i - 1].state[0] / jug1) * leftHeight * adjustment,
            leftHeight
          )
        : 0;
    const rightFrom =
      i > 0
        ? Math.min(
            (solution[i - 1].state[1] / jug2) * rightHeight * adjustment,
            rightHeight
          )
        : 0;
    const leftTo = Math.min(
      (solution[i].state[0] / jug1) * leftHeight * adjustment,
      leftHeight
    );
    const rightTo = Math.min(
      (solution[i].state[1] / jug2) * rightHeight * adjustment,
      rightHeight
    );
    const aniDur = 1600;

    leftGlass.style.setProperty("--leftHeight", `${leftHeight}px`);
    leftGlass.style.setProperty("--leftFillFrom", `-${leftFrom}px`);
    leftGlass.style.setProperty("--leftFillTo", `-${leftTo}px`);
    leftGlass.style.setProperty("--leftAniDur", `${aniDur}ms`);
    rightGlass.style.setProperty("--rightHeight", `${rightHeight}px`);
    rightGlass.style.setProperty("--rightFillFrom", `-${rightFrom}px`);
    rightGlass.style.setProperty("--rightFillTo", `-${rightTo}px`);
    rightGlass.style.setProperty("--rightAniDur", `${aniDur}ms`);

    leftGlass.classList.add("leftAni");
    rightGlass.classList.add("rightAni");

    const table = <HTMLTableElement>document.getElementById("solutionTable")!;
    table.rows[i + 1].classList.add("highlight");

    const leftGlassCtr = <HTMLDivElement>(
      document.getElementById("leftGlassCtr")
    );
    const rightGlassCtr = <HTMLDivElement>(
      document.getElementById("rightGlassCtr")
    );
    switch (solution[i].action) {
      case JugAction.EmptyLeft:
      case JugAction.FillLeft:
        leftGlassCtr.classList.add("highlight");
        break;
      case JugAction.EmptyRight:
      case JugAction.FillRight:
        rightGlassCtr.classList.add("highlight");
        break;
      case JugAction.Init:
      case JugAction.LeftToRight:
      case JugAction.RightToLeft:
        leftGlassCtr.classList.add("highlight");
        rightGlassCtr.classList.add("highlight");
        break;
    }

    setTimeout(() => {
      resetAnimation(solution, i, jug1, jug2, aim);
    }, aniDur);
  } else {
    const submitBtn = <HTMLButtonElement>document.getElementById("run");
    submitBtn.disabled = false;
  }
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

  const leftGlassCtr = <HTMLDivElement>document.getElementById("leftGlassCtr");
  const rightGlassCtr = <HTMLDivElement>(
    document.getElementById("rightGlassCtr")
  );
  leftGlassCtr.classList.remove("highlight");
  rightGlassCtr.classList.remove("highlight");

  if (i < solution.length - 1) {
    setTimeout(() => {
      runAnimation(solution, i + 1, jug1, jug2, aim);
    }, 500);
  } else {
    const h2 = <HTMLHeadingElement>document.getElementById("solutionText");
    const finalLeft = solution[i].state[0];
    const finalRight = solution[i].state[1];
    if (finalLeft === aim) {
      h2.innerText = `Solution: LEFT jug contains ${aim} gallons of water`;
      leftGlassCtr.classList.add("highlight");
    } else if (finalRight === aim) {
      h2.innerText = `Solution: RIGHT jug contains ${aim} gallons of water`;
      rightGlassCtr.classList.add("highlight");
    } else if (finalLeft + finalRight === aim) {
      h2.innerText = `Solution: BOTH jugs add together contains ${aim} gallons of water`;
      leftGlassCtr.classList.add("highlight");
      rightGlassCtr.classList.add("highlight");
    }

    const submitBtn = <HTMLButtonElement>document.getElementById("run");
    submitBtn.disabled = false;
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
    const h2 = <HTMLHeadingElement>document.getElementById("solutionText");
    h2.innerText = "No Solution";
  }
}

function clearOutput2() {
  const h2 = <HTMLHeadingElement>document.getElementById("solutionText");
  h2.innerText = "";

  const leftGlassCtr = <HTMLDivElement>document.getElementById("leftGlassCtr");
  const rightGlassCtr = <HTMLDivElement>(
    document.getElementById("rightGlassCtr")
  );
  leftGlassCtr.classList.remove("highlight");
  rightGlassCtr.classList.remove("highlight");

  const glassSection = <HTMLDivElement>document.getElementById("glassSection");
  glassSection.style.visibility = "hidden";

  const table = <HTMLTableElement>document.getElementById("solutionTable")!;
  table.style.visibility = "hidden";
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

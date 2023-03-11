import {
  JugAction,
  JugState,
  JugSolution,
  SolutionStep,
} from "./TwoWaterJugRiddle";

function sampleSolver(
  jug1: number,
  jug2: number,
  aim: number,
  initState: JugState
): JugSolution {
  return [{ action: JugAction.Init, state: [0, 0] }];
  //   return [];
}

class QueueStep {
  constructor(
    public action: JugAction,    // corresponding action
    public state: JugState,      // state to investigate
    public path: SolutionStep[]  // the path that has let to this point
  ) {
    this.path = structuredClone(path);
    this.path.push({ action: action, state: state });
  }
}

// water jug riddle solver using breadth first search
function bfsSolver(
  jug1: number,
  jug2: number,
  aim: number,
  initState: JugState
): JugSolution {
  const q: QueueStep[] = []; // queue to store states to be visited
  const visited = new Set<string>(); // states already visited

  const init = new QueueStep(JugAction.Init, initState, []);
  q.push(init);

  while (q.length > 0) {
    let cur = q.shift();

    // if already visited
    if (cur) {
      if (visited.has(cur.state.toString())) {
        continue;
      }

      // if goal reached
      if (cur.state[0] == aim || cur.state[1] === aim || cur.state[0] + cur.state[1] === aim) {
        return cur.path;
      }

      visited.add(cur.state.toString());

      q.push(new QueueStep(JugAction.EmptyLeft, [0, cur.state[1]], cur.path));
      q.push(new QueueStep(JugAction.EmptyRight, [cur.state[0], 0], cur.path));
      q.push(new QueueStep(JugAction.FillLeft, [jug1, cur.state[1]], cur.path));
      q.push(
        new QueueStep(JugAction.FillRight, [cur.state[0], jug2], cur.path)
      );
      q.push(new QueueStep(
        JugAction.TransferLeftToRight,
        [
          cur.state[0] - Math.min(cur.state[0], jug2 - cur.state[1]),
          cur.state[1] + Math.min(cur.state[0], jug2 - cur.state[1]),
        ],
        cur.path
      ));
      q.push(new QueueStep(
        JugAction.TransferRightToLeft,
        [
          cur.state[0] + Math.min(cur.state[1], jug1 - cur.state[0]),
          cur.state[1] - Math.min(cur.state[1], jug1 - cur.state[0]),
        ],
        cur.path
      ));
    }
  }

  // no solution
  return [];
}

export { sampleSolver, bfsSolver };

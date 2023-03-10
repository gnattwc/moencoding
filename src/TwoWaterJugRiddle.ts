enum JugAction {
  Init,
  EmptyLeft,
  EmptyRight,
  FillLeft,
  FillRight,
  TransferLeftToRight,
  TransferRightToLeft,
}

type JugState = [left: number, right: number];

type SolutionStep = {
  action: JugAction; // action
  state: JugState; // state after action
};

type JugSolution = SolutionStep[];

type SolverFunction = (jug1: number, jug2: number, aim:number, initState: JugState) => JugSolution;

class TwoWaterJugRiddle {
  constructor(private solver: SolverFunction) {}

  solveRiddle(
    jug1: number,
    jug2: number,
    aim: number,
    initState: JugState = [0, 0]
  ): JugSolution {
    return this.solver(jug1, jug2, aim, initState);
  }
}

export { JugAction, JugSolution, JugState, TwoWaterJugRiddle, SolverFunction, SolutionStep};


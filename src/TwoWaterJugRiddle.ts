enum JugAction {
  Init,
  EmptyLeft,
  FillLeft,
  TransferLeftToRight,
  EmptyRight,
  FillRight,
  TransferRightToLeft,
}

type JugState = [left: number, right: number];

type SolutionStep = {
  action: JugAction; // action
  state: JugState; // state after action
};

type JugSolution = SolutionStep[];

type SolverFunction = (initState: JugState) => JugSolution;

class TwoWaterJugRiddle {
  constructor(private solver: SolverFunction) {}

  solveRiddle(
    jug1: number,
    jug2: number,
    aim: number,
    initState: JugState = [0, 0]
  ): JugSolution {
    return this.solver(initState);
  }
}

export { JugAction, JugSolution, JugState, TwoWaterJugRiddle};


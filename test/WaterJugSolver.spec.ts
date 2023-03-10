import {sampleSolver} from "../src/WaterJugSolver";
import { assert} from 'chai';

describe ("WaterJugSolver Tests", () => {
    it ("sanity check", () => {
        const solution = sampleSolver(4,3,2,[0,0]);
        assert(solution);
    })
})
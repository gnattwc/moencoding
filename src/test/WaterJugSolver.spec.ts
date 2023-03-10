import {bfsSolver, sampleSolver} from "../WaterJugSolver";
import { assert} from 'chai';

describe ("sampleSolver Tests", () => {
    it ("sanity check", () => {
        const solution = sampleSolver(4,3,2,[0,0]);
        console.log('solution=',solution) ;
        assert(solution);
    })
})

describe ("bfsSolver Tests", () => {
    it ("sanity check", () => {
        const solution = bfsSolver(4,3,0,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })
    
    it ("sanity check 2", () => {
        const solution = bfsSolver(4,3,4,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })

    it ("sanity check 3", () => {
        const solution = bfsSolver(4,3,3,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })

    it ("sanity check 4", () => {
        const solution = bfsSolver(7,3,6,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })

})
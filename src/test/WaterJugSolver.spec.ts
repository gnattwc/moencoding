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
    it ("4 3 0", () => {
        const solution = bfsSolver(4,3,0,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 1);
    })
    
    it ("4 3 4", () => {
        const solution = bfsSolver(4,3,4,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 2);
    })

    it ("4 3 3", () => {
        const solution = bfsSolver(4,3,3,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 2);
    })

    it ("7 3 6", () => {
        const solution = bfsSolver(7,3,6,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 4);
    })

    it ("7 9 8", () => {
        const solution = bfsSolver(7,9,8,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 15);
    })

    it ("5 3 8", () => {
        const solution = bfsSolver(5,3,8,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })

    it ("2 8 10 - both jugs", () => {
        const solution = bfsSolver(2,8,10,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length);
    })

    it ("no solution", () => {
        const solution = bfsSolver(12,8,5,[0,0]);
        console.log('solution=',solution) ;
        assert(solution.length === 0);
    })
})
import { sleep } from "../util/sleep";
import { Cell } from "./cell";
import { Maze } from "./maze";

/**
 * 
 * @param maze maze in which path want to found
 * @param s starting cell of path
 * @param des destination cell of path
 * 
 */
export function pathSearch(found:any, s:Cell, des:Cell) {
	// await sleep(1);
	// if (found.yes) {
	// 	return 1;
	// }
	if (s === des) {
		found.yes = true;
		return 10000;
	}
	s.traversed = true;
	s.neighbors.filter((c:Cell) => {
		if(!c.traversed && s.hasPathWith(c)) {
			return c;
		}
	}).forEach((cell:Cell) => {
		cell.cellNum = s.cellNum + 1;
		// darwCellNum(maze.ctx, cell);
		pathSearch(found, cell, des);
	});
}

export function backtrace(maze:Maze, stack:any, cell:Cell, targetValue:number) {
	// await sleep(1);
	
	if (cell.cellNum == targetValue) {
		stack.solutionStack.push(cell);
		return;
	}
	stack.solutionStack.push(cell);
	cell.neighbors.filter((neighbor) => {
		if(cell.hasPathWith(neighbor) && neighbor.cellNum === cell.cellNum-1){
			console.log('hhh');
			backtrace(maze, stack, neighbor, targetValue);
		}
	});
}

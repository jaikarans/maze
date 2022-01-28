import { Cell } from "../maze/cell";
import { Maze } from "../maze/maze";
import { sleep } from "./sleep";

export async function goRight(cell:any, maze:Maze) {
	
	if (!cell.stopRightMove){
		if (cell.current == cell.destination) {
			console.log('end');
		}
		for (let i=0; i < cell.current.neighbors.length; i++) {
			if (cell.current.isRightCell(cell.current.neighbors[i]) && cell.current.neighbors[i].left) {
				cell.current = cell.current.neighbors[i];
				cell.current.mark(maze);
				await sleep(1000);
				goRight(cell, maze);
			}
		}
	}
	
}

export async function goDown(cell:any, maze:Maze) {
	
	if (!cell.stopDownMove) {
		if (cell.current == cell.destination) {
			console.log('end');
		}
		for (let i=0; i < cell.current.neighbors.length; i++) {
			if (cell.current.isBottomCell(cell.current.neighbors[i]) && cell.current.neighbors[i].top) {
				cell.current = cell.current.neighbors[i];
				cell.current.mark(maze);
				await sleep(1000);
				goDown(cell, maze);
			}
		}
	}
	
}

export async function goLeft(cell:any, maze:Maze) {
	
	if (!cell.stopLeftMove){
		if (cell.current == cell.destination) {
			console.log('end');
		}
		for (let i=0; i < cell.current.neighbors.length; i++) {
			if (cell.current.isLeftCell(cell.current.neighbors[i]) && cell.current.neighbors[i].right) {
				cell.current = cell.current.neighbors[i];
				cell.current.mark(maze);
				await sleep(1000);
				goLeft(cell, maze);
			}
		}
	}
	
}

export async function goUp(cell:any, maze:Maze) {
	
	if (!cell.stopUpMove){
		if (cell.current == cell.destination) {
			console.log('end');
		}
		for (let i=0; i < cell.current.neighbors.length; i++) {
			if (cell.current.isTopCell(cell.current.neighbors[i]) && cell.current.neighbors[i].bottom) {
				cell.current = cell.current.neighbors[i];
				cell.current.mark(maze);
				await sleep(1000);
				goUp(cell, maze);
			}
		}
	}
	
}
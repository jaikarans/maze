import { createCanvas } from "./canvas";
import { pathSearch, backtrace } from "./maze/findPath";
import { Maze } from "./maze/maze";
import { Cell } from "./maze/cell";
import { drawCellNum } from "./util/drawCellNum";

var canvas:HTMLCanvasElement = createCanvas(500,500);

var maze:Maze = new Maze(canvas, 'red', 15, 15, 500/15, 500/15);
var startingCell:Cell = maze.cells[0][0];
var destinationCell:Cell = maze.cells[maze.row-1][maze.column-1];


var found = { yes:false }
var solution = { solutionStack:new Array<Cell>() };

let v = pathSearch(found , startingCell, destinationCell);
backtrace(maze, solution, destinationCell, startingCell.cellNum);
// findPath(found, solution, maze, startingCell, destinationCell);

while(solution.solutionStack.length > 0) {
	let c:Cell = solution.solutionStack.pop()!;
	drawCellNum(maze.ctx, c);
}

maze.cells.forEach((r) => {
	let s:string = '';
	r.forEach((c) => {
		s+=c.cellNum + ' ';
	});
	console.log(s);
});
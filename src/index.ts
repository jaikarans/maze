import { createCanvas } from "./canvas";
import { pathSearch, backtrace } from "./maze/findPath";
import { Maze } from "./maze/maze";
import { Cell } from "./maze/cell";
import { drawCellNum } from "./util/drawCellNum";
import { goDown, goLeft, goRight, goUp } from "./util/moves";

var canvas:HTMLCanvasElement = createCanvas(500,500);

var maze:Maze = new Maze(canvas, 'red', 15, 15, 500/15, 500/15);
// var initialCell:Cell = maze.cells[0][0];
// var destinationCell:Cell = maze.cells[maze.row-1][maze.column-1];
var cell = {
	stopLeftMove:true,
	stopRightMove:true,
	stopUpMove:true,
	stopDownMove:true,
	initial:maze.cells[0][0],
	current:maze.cells[0][0],
	destination:maze.cells[maze.row-1][maze.column-1]
};


var found = { yes:false }
var solution = { solutionStack:new Array<Cell>() };

pathSearch(found , cell.initial, cell.destination);
backtrace(maze, solution, cell.destination, cell.initial.cellNum);
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

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown:any = null;                                                        
var yDown:any = null;

function getTouches(evt:any) {
  return evt.touches; // jQuery
}                                                     

function handleTouchStart(evt:any) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt:any) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
						console.log('left swap');
						cell.stopUpMove = true;
						cell.stopRightMove = true;
						cell.stopDownMove = true;
						cell.stopLeftMove = false;
						goLeft(cell, maze);
        } else {
            /* right swipe */
						console.log('right swap');
						cell.stopUpMove = true;
						cell.stopRightMove = false;
						cell.stopDownMove = true;
						cell.stopLeftMove = true;
						goRight(cell, maze);
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
						console.log('up swap');
						cell.stopUpMove = false;
						cell.stopRightMove = true;
						cell.stopDownMove = true;
						cell.stopLeftMove = true;
						goUp(cell, maze);
        } else { 
            /* down swipe */
						console.log('down swap');
						cell.stopUpMove = true;
						cell.stopRightMove = true;
						cell.stopDownMove = false;
						cell.stopLeftMove = true;
						goDown(cell, maze);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
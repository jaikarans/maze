import { Maze } from "./maze";

/**
 * @class Cell represent a box or cell in canvas of some width
 * and height.
 * @properties (top, right, bottom, left) tells if Cell is open from that side.
 * @property (x,y) represent the top-left coordinate of the Cell.
 * @property w, h is width and height of the Cell.
 */
export class Cell {
	x:number;
	y:number;
	w:number;
	h:number;

	// if any side of cell is open
	top:boolean = false;
	right:boolean = false;
	bottom:boolean = false;
	left:boolean = false;

	// if cell is visited
	visited:boolean = false;

	// tells if cell is alredy traversed or not
	traversed:boolean = false;
	
	// cell number in the path
	cellNum:number = -1;
	cellMarked:boolean = false;

	neighbors:Cell[]= new Array();
	
	/**
	 * @param x x coordinate of top-left point of the Cell.
	 * @param y y coordinate of top-left point of the Cell.
	 * @param width is the width of the Cell.
	 * @param height is the height of the Cell.
	 * 
	*/
	constructor(x:number, y:number, width:number, height?:number) {
		this.x = x;
		this.y = y;
		this.w = width;
		// if cell is not square
		if (height){
			this.h = height;
		}
		else {
			this.h = length;
		}
	}

	// knowing where the neighbor is relative to cell
	isTopCell(neighbor:Cell):boolean {
		if (this.y > neighbor.y) {
			console.log('t (', this.y, ", " ,this.x, ') ', '(',neighbor.y, ' ', neighbor.x,')');
			return true;
		}
		return false;
	}
	isBottomCell(neighbor:Cell):boolean {
		if (this.y < neighbor.y) {
			console.log('b (', this.y, ", " ,this.x, ') ', '(',neighbor.y, ' ', neighbor.x,')');
			return true;
		}
		return false;
	}
	isLeftCell(neighbor:Cell):boolean {
		if (this.x > neighbor.x) {
			console.log('l (', this.y, ", " ,this.x, ') ', '(',neighbor.y, ' ', neighbor.x,')');
			return true;
		}
		return false;
	}
	isRightCell(neighbor:Cell):boolean {
		if (this.x < neighbor.x) {
			console.log('r (', this.y, ", " ,this.x, ') ', '(',neighbor.y, ' ', neighbor.x,')');

			return true;
		}
		return false;
	}

	hasPathWith(c:Cell):boolean { 
		if (this.isTopCell(c) && this.top == true && c.bottom == true){
			return true;
		}
		else if (this.isRightCell(c) && this.right == true && c.left == true){
			return true;
		}
		else if (this.isBottomCell(c) && this.bottom == true && c.top == true){
			return true;
		}
		else if (this.isLeftCell(c) && this.left == true && c.right == true){
			return true;
		}
		return false;
	}

	draw(ctx:CanvasRenderingContext2D) {
		// this.markCell(c, ctx);
		if (!this.top) {
			ctx.beginPath();
			ctx.moveTo(this.x * this.w      , this.y * this.h);
			ctx.lineTo((this.x + 1) * this.w, this.y * this.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!this.right) {
			ctx.beginPath();
			ctx.moveTo((this.x + 1) * this.w, this.y * this.h);
			ctx.lineTo((this.x + 1) * this.w, (this.y + 1) * this.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!this.bottom) {
			ctx.beginPath();
			ctx.moveTo((this.x + 1) * this.w, (this.y + 1) * this.h);
			ctx.lineTo(this.x * this.w 			, (this.y + 1)* this.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!this.left) {
			ctx.beginPath();
			ctx.moveTo(this.x * this.w, (this.y + 1)* this.h);
			ctx.lineTo(this.x * this.w, this.y * this.h);
			ctx.stroke();
			ctx.closePath();
		}

	}
	
	/**
	 * 
	 * mark a cell by drawing a small rect in it.
	 * 
	 */
	mark(maze:Maze, isCurrentCell:boolean = false):void {
		let x = this.x * this.w;
		let y = this.y * this.h;
		let ctx = maze.ctx;
		if (isCurrentCell) {
			let temp:any = ctx.fillStyle;
			ctx.fillStyle = maze.colorCurrent;
			ctx.fillRect(x+this.w/4, y+this.h/4, this.w/2, this.h/2);
			ctx.fillStyle = temp;
		}
		else if (this.visited) {
			let temp:any = ctx.fillStyle;
			ctx.fillStyle = maze.colorVisited;
			ctx.fillRect(x+this.w/4, y+this.h/4, this.w/2, this.h/2);
			ctx.fillStyle = temp;
		}
		// else {
		// 	let temp = ctx.fillStyle;
		// 	ctx.fillStyle = this.colorCell;
		// 	ctx.fillRect(x+cell.w/4, y+cell.h/4, cell.w/2, cell.h/2);
		// 	ctx.fillStyle = temp;
		// }
		}
	
}
import { sleep } from "../util/sleep";
import { Cell } from "./cell";

export class Maze {

	// canvas on which maze is to be drawn
	canvas:HTMLCanvasElement;
	ctx:CanvasRenderingContext2D;
	colorCell:string;
	colorCurrent:string = 'green';
	colorVisited:string = 'blue';

	row:number;
	column:number;
	w:number;
	h:number;

	// all the cells maze contains
	cells:Cell[][] = new Array();

	/**
	 * @param canvas canvas on which maze draws
	 * @param colorCell color of cell of the maze
	 * @param row number of rows in maze
	 * @param column number of columbs in maze
	 * @param w length/width of each row
	 * @param h optional? lenght/width of each column
	 */
	constructor (canvas:HTMLCanvasElement, colorCell:string, row:number, column:number , w:number, h?:number) {
		this.canvas = canvas;
		this.colorCell = colorCell;
		this.row = row;
		this.column = column;
		this.w = w;
		// in case we want width and length same
		if (h) {
			this.h = h;
		}
		else {
			this.h = w;
		}
		
		this.ctx = canvas.getContext('2d')!;
		this.ctx.strokeStyle = colorCell;
		this.ctx.fillStyle = colorCell;

		this.generateCells();
		// this.mapNeighborCells();
	}

	generateCells():void {

		/**
		 * 
		 * x and y are the coordinates of top-left point of each Cells.
		 * x will denote horizontal axis value,
		 * y will be denoted ans vertical axis value
		 * but coordinate will in form of (x,y) for canvas despite
		 * 
		 */
		for (let r:number=0; r < this.row; r++) {
			this.cells[r] = new Array();
			for (let c:number=0; c < this.column; c++) {
				this.cells[r][c] = new Cell(c, r, this.w, this.h);
			}
		}
	}

	// map the neibour array of each array
	mapNeighborCells():void {
		for (let r=0; r < this.row; r++) {
			for (let c=0; c < this.column; c++) {
				let cell:Cell = this.cells[r][c];
				console.log("cell " + r + " " + c);

				// if top neighbor exist
				if (r-1 >= 0) {
					cell.neighbors.push(this.cells[r-1][c]);
					
				}
				//if bottom neighbor exist
				if (r+1 < this.row) {
					cell.neighbors.push(this.cells[r+1][c]);
				}
				// left neighbor
				if (c-1 >= 0) {
					cell.neighbors.push(this.cells[r][c-1]);
				}
				// right neighbor
				if (c+1 < this.column) {
					cell.neighbors.push(this.cells[r][c+1]);
				}

			}

		}

	}

	drawMaze(ctx:CanvasRenderingContext2D):void {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.cells.forEach((r:Cell[]) => {
			r.forEach((cell) => {
				this.drawCell(cell, ctx);
			});
		});
	}

	drawCell(c:Cell, ctx:CanvasRenderingContext2D) {
		// this.markCell(c, ctx);
		if (!c.top) {
			ctx.beginPath();
			ctx.moveTo(c.x * c.w      , c.y * c.h);
			ctx.lineTo((c.x + 1) * c.w, c.y * c.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!c.right) {
			ctx.beginPath();
			ctx.moveTo((c.x + 1) * c.w, c.y * c.h);
			ctx.lineTo((c.x + 1) * c.w, (c.y + 1) * c.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!c.bottom) {
			ctx.beginPath();
			ctx.moveTo((c.x + 1) * c.w, (c.y + 1) * c.h);
			ctx.lineTo(c.x * c.w 			, (c.y + 1)* c.h);
			ctx.stroke();
			ctx.closePath();
		}
		if (!c.left) {
			ctx.beginPath();
			ctx.moveTo(c.x * c.w, (c.y + 1)* c.h);
			ctx.lineTo(c.x * c.w, c.y * c.h);
			ctx.stroke();
			ctx.closePath();
		}

	}

	markCell(cell:Cell, ctx:CanvasRenderingContext2D, isCurrentCell:boolean = false):void {
		let x = cell.x * cell.w;
		let y = cell.y * cell.h;
		if (isCurrentCell) {
			let temp:any = ctx.fillStyle;
			ctx.fillStyle = this.colorCurrent;
			ctx.fillRect(x+cell.w/4, y+cell.h/4, cell.w/2, cell.h/2);
			ctx.fillStyle = temp;
		}
		else if (cell.visited) {
			let temp:any = ctx.fillStyle;
			ctx.fillStyle = this.colorVisited;
			ctx.fillRect(x+cell.w/4, y+cell.h/4, cell.w/2, cell.h/2);
			ctx.fillStyle = temp;
		}
		// else {
		// 	let temp = ctx.fillStyle;
		// 	ctx.fillStyle = this.colorCell;
		// 	ctx.fillRect(x+cell.w/4, y+cell.h/4, cell.w/2, cell.h/2);
		// 	ctx.fillStyle = temp;
		// }
	}

	async createMaze() {

		let ctx = this.canvas.getContext('2d')!;
		// current cell is blue
		ctx.fillStyle = this.colorVisited;

		// https://en.wikipedia.org/wiki/Maze_generation_algorithm
		// steps to making a maze.
		// 1. push a cell to stack and mark it as visited
		let cellStack = new Array();
		cellStack.push(this.cells[0][0]);

		// 2. while stack is not empty
		while (cellStack.length > 0) {
			this.drawMaze(this.ctx);
			console.log('hi');
			
			// 1. pop a cell from stack and make it current stack;
			let current:Cell = cellStack.pop();
			this.markCell(current, ctx, true);
			await sleep(1);

			// get neighbor of the current cell which are not visited
			let neighbors:any = this.getNeighbor(current).filter((c:Cell) => {
				if (!c.visited){
					return c;
				}
			});
			
			// 2. if current cell has any neighbor which are not visited
			if (neighbors.length > 0) {

				// 1. push the current cell to the stack
				cellStack.push(current);

				// 2. choose an neighbor cell
				let neighbor:Cell = neighbors[Math.floor(Math.random() * neighbors.length)];

				// 3. remove the wall between current and choosen cell
				this.removeWallBetween(current, neighbor, ctx);

				// 4. mark the choosen neighbor cell to visited and push to the stack
				neighbor.visited = true;
				cellStack.push(neighbor);

			}

		}

	}

	/**
	 * 
	 * @param cell cell which neighbors we want.
	 * @returns Cell[]
	 */
	getNeighbor(cell:Cell):Cell[] {
		let arr:Cell[] = new Array();
		if (cell.y-1 >= 0){
			arr.push(this.cells[cell.y-1][cell.x]);
		}
		if (cell.y+1 < this.row){
			arr.push(this.cells[cell.y+1][cell.x]);
		}
		if (cell.x-1 >=0){
			arr.push(this.cells[cell.y][cell.x-1]);
		}
		if (cell.x+1 < this.column){
			arr.push(this.cells[cell.y][cell.x+1]);
		}
		return arr;

	}

	// true means wall of cell is open from that side
	removeWallBetween(c1:Cell, c2:Cell, ctx:CanvasRenderingContext2D):void {
		// c2 is on top of c1
		if (c1.isTopCell(c2)){
			c1.top = true;
			c2.bottom = true;
		}
		// c2 is in left side to c1
		else if (c1.isLeftCell(c2)){
			c1.left = true;
			c2.right = true;
		}
		// c2 is below to c1
		else if (c1.isBottomCell(c2)){
			c1.bottom = true;
			c2.top = true;
		}
		// c2 is in right side of c1
		else if (c1.isRightCell(c2)){
			c1.right = true;
			c2.left = true;
		}
		
	}

}
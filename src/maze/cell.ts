/**
 * @class Cell represent a box or cell in canvas of some width
 * and height.
 * @properties (top, right, bottom, left) tells if Cell is open from that side.
 * @property (x,y) represent the top-left coordinate of the Cell.
 * @property lenghtX, h is width and height of the Cell.
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

	visited:boolean = false;

	neighbors:Cell[]= new Array()	;
	
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


}
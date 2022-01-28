import { Cell } from "../maze/cell";

export function drawCellNum(ctx:CanvasRenderingContext2D, cell:Cell) {
	let x = cell.x * cell.w;
	let y = cell.y * cell.h;
	let s:string = '' + cell.cellNum;
	// ctx.font = cell.w < cell.h? cell.w/2 + 'px Arial': cell.h/2 + 'px Arial';
	ctx.fillText(s, x + cell.w/2, y + cell.h/2);
}
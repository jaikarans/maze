export function createCanvas (h:number, w:number) : HTMLCanvasElement{
	let canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.height = h;
	canvas.width = w;
	return canvas;
}
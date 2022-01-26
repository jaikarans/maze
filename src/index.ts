import { createCanvas } from "./canvas";
import { Maze } from "./maze/maze";

var canvas:HTMLCanvasElement = createCanvas(500,500);

var maze:Maze = new Maze(canvas, 'red', 25, 25, 500/25, 500/25);



maze.createMaze();
console.log(maze.cells);
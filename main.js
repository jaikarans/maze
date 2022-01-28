/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createCanvas = void 0;\nfunction createCanvas(h, w) {\n    let canvas = document.createElement('canvas');\n    document.body.appendChild(canvas);\n    canvas.height = h;\n    canvas.width = w;\n    return canvas;\n}\nexports.createCanvas = createCanvas;\n\n\n//# sourceURL=webpack://Maze-generator/./src/canvas.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst canvas_1 = __webpack_require__(/*! ./canvas */ \"./src/canvas.ts\");\nconst findPath_1 = __webpack_require__(/*! ./maze/findPath */ \"./src/maze/findPath.ts\");\nconst maze_1 = __webpack_require__(/*! ./maze/maze */ \"./src/maze/maze.ts\");\nconst drawCellNum_1 = __webpack_require__(/*! ./util/drawCellNum */ \"./src/util/drawCellNum.ts\");\nconst moves_1 = __webpack_require__(/*! ./util/moves */ \"./src/util/moves.ts\");\nvar canvas = (0, canvas_1.createCanvas)(500, 500);\nvar maze = new maze_1.Maze(canvas, 'red', 15, 15, 500 / 15, 500 / 15);\n// var initialCell:Cell = maze.cells[0][0];\n// var destinationCell:Cell = maze.cells[maze.row-1][maze.column-1];\nvar cell = {\n    stopLeftMove: true,\n    stopRightMove: true,\n    stopUpMove: true,\n    stopDownMove: true,\n    initial: maze.cells[0][0],\n    current: maze.cells[0][0],\n    destination: maze.cells[maze.row - 1][maze.column - 1]\n};\nvar found = { yes: false };\nvar solution = { solutionStack: new Array() };\n(0, findPath_1.pathSearch)(found, cell.initial, cell.destination);\n(0, findPath_1.backtrace)(maze, solution, cell.destination, cell.initial.cellNum);\n// findPath(found, solution, maze, startingCell, destinationCell);\nwhile (solution.solutionStack.length > 0) {\n    let c = solution.solutionStack.pop();\n    (0, drawCellNum_1.drawCellNum)(maze.ctx, c);\n}\nmaze.cells.forEach((r) => {\n    let s = '';\n    r.forEach((c) => {\n        s += c.cellNum + ' ';\n    });\n    console.log(s);\n});\ndocument.addEventListener('touchstart', handleTouchStart, false);\ndocument.addEventListener('touchmove', handleTouchMove, false);\nvar xDown = null;\nvar yDown = null;\nfunction getTouches(evt) {\n    return evt.touches; // jQuery\n}\nfunction handleTouchStart(evt) {\n    const firstTouch = getTouches(evt)[0];\n    xDown = firstTouch.clientX;\n    yDown = firstTouch.clientY;\n}\n;\nfunction handleTouchMove(evt) {\n    if (!xDown || !yDown) {\n        return;\n    }\n    var xUp = evt.touches[0].clientX;\n    var yUp = evt.touches[0].clientY;\n    var xDiff = xDown - xUp;\n    var yDiff = yDown - yUp;\n    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/\n        if (xDiff > 0) {\n            /* left swipe */\n            console.log('left swap');\n            cell.stopUpMove = true;\n            cell.stopRightMove = true;\n            cell.stopDownMove = true;\n            cell.stopLeftMove = false;\n            (0, moves_1.goLeft)(cell, maze);\n        }\n        else {\n            /* right swipe */\n            console.log('right swap');\n            cell.stopUpMove = true;\n            cell.stopRightMove = false;\n            cell.stopDownMove = true;\n            cell.stopLeftMove = true;\n            (0, moves_1.goRight)(cell, maze);\n        }\n    }\n    else {\n        if (yDiff > 0) {\n            /* up swipe */\n            console.log('up swap');\n            cell.stopUpMove = false;\n            cell.stopRightMove = true;\n            cell.stopDownMove = true;\n            cell.stopLeftMove = true;\n            (0, moves_1.goUp)(cell, maze);\n        }\n        else {\n            /* down swipe */\n            console.log('down swap');\n            cell.stopUpMove = true;\n            cell.stopRightMove = true;\n            cell.stopDownMove = false;\n            cell.stopLeftMove = true;\n            (0, moves_1.goDown)(cell, maze);\n        }\n    }\n    /* reset values */\n    xDown = null;\n    yDown = null;\n}\n;\n\n\n//# sourceURL=webpack://Maze-generator/./src/index.ts?");

/***/ }),

/***/ "./src/maze/cell.ts":
/*!**************************!*\
  !*** ./src/maze/cell.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Cell = void 0;\n/**\n * @class Cell represent a box or cell in canvas of some width\n * and height.\n * @properties (top, right, bottom, left) tells if Cell is open from that side.\n * @property (x,y) represent the top-left coordinate of the Cell.\n * @property w, h is width and height of the Cell.\n */\nclass Cell {\n    /**\n     * @param x x coordinate of top-left point of the Cell.\n     * @param y y coordinate of top-left point of the Cell.\n     * @param width is the width of the Cell.\n     * @param height is the height of the Cell.\n     *\n    */\n    constructor(x, y, width, height) {\n        // if any side of cell is open\n        this.top = false;\n        this.right = false;\n        this.bottom = false;\n        this.left = false;\n        // if cell is visited\n        this.visited = false;\n        // tells if cell is alredy traversed or not\n        this.traversed = false;\n        // cell number in the path\n        this.cellNum = -1;\n        this.cellMarked = false;\n        this.neighbors = new Array();\n        this.x = x;\n        this.y = y;\n        this.w = width;\n        // if cell is not square\n        if (height) {\n            this.h = height;\n        }\n        else {\n            this.h = length;\n        }\n    }\n    // knowing where the neighbor is relative to cell\n    isTopCell(neighbor) {\n        if (this.y > neighbor.y) {\n            console.log('t (', this.y, \", \", this.x, ') ', '(', neighbor.y, ' ', neighbor.x, ')');\n            return true;\n        }\n        return false;\n    }\n    isBottomCell(neighbor) {\n        if (this.y < neighbor.y) {\n            console.log('b (', this.y, \", \", this.x, ') ', '(', neighbor.y, ' ', neighbor.x, ')');\n            return true;\n        }\n        return false;\n    }\n    isLeftCell(neighbor) {\n        if (this.x > neighbor.x) {\n            console.log('l (', this.y, \", \", this.x, ') ', '(', neighbor.y, ' ', neighbor.x, ')');\n            return true;\n        }\n        return false;\n    }\n    isRightCell(neighbor) {\n        if (this.x < neighbor.x) {\n            console.log('r (', this.y, \", \", this.x, ') ', '(', neighbor.y, ' ', neighbor.x, ')');\n            return true;\n        }\n        return false;\n    }\n    hasPathWith(c) {\n        if (this.isTopCell(c) && this.top == true && c.bottom == true) {\n            return true;\n        }\n        else if (this.isRightCell(c) && this.right == true && c.left == true) {\n            return true;\n        }\n        else if (this.isBottomCell(c) && this.bottom == true && c.top == true) {\n            return true;\n        }\n        else if (this.isLeftCell(c) && this.left == true && c.right == true) {\n            return true;\n        }\n        return false;\n    }\n    draw(ctx) {\n        // this.markCell(c, ctx);\n        if (!this.top) {\n            ctx.beginPath();\n            ctx.moveTo(this.x * this.w, this.y * this.h);\n            ctx.lineTo((this.x + 1) * this.w, this.y * this.h);\n            ctx.stroke();\n            ctx.closePath();\n        }\n        if (!this.right) {\n            ctx.beginPath();\n            ctx.moveTo((this.x + 1) * this.w, this.y * this.h);\n            ctx.lineTo((this.x + 1) * this.w, (this.y + 1) * this.h);\n            ctx.stroke();\n            ctx.closePath();\n        }\n        if (!this.bottom) {\n            ctx.beginPath();\n            ctx.moveTo((this.x + 1) * this.w, (this.y + 1) * this.h);\n            ctx.lineTo(this.x * this.w, (this.y + 1) * this.h);\n            ctx.stroke();\n            ctx.closePath();\n        }\n        if (!this.left) {\n            ctx.beginPath();\n            ctx.moveTo(this.x * this.w, (this.y + 1) * this.h);\n            ctx.lineTo(this.x * this.w, this.y * this.h);\n            ctx.stroke();\n            ctx.closePath();\n        }\n    }\n    /**\n     *\n     * mark a cell by drawing a small rect in it.\n     *\n     */\n    mark(maze, isCurrentCell = false) {\n        let x = this.x * this.w;\n        let y = this.y * this.h;\n        let ctx = maze.ctx;\n        if (isCurrentCell) {\n            let temp = ctx.fillStyle;\n            ctx.fillStyle = maze.colorCurrent;\n            ctx.fillRect(x + this.w / 4, y + this.h / 4, this.w / 2, this.h / 2);\n            ctx.fillStyle = temp;\n        }\n        else if (this.visited) {\n            let temp = ctx.fillStyle;\n            ctx.fillStyle = maze.colorVisited;\n            ctx.fillRect(x + this.w / 4, y + this.h / 4, this.w / 2, this.h / 2);\n            ctx.fillStyle = temp;\n        }\n        // else {\n        // \tlet temp = ctx.fillStyle;\n        // \tctx.fillStyle = this.colorCell;\n        // \tctx.fillRect(x+cell.w/4, y+cell.h/4, cell.w/2, cell.h/2);\n        // \tctx.fillStyle = temp;\n        // }\n    }\n}\nexports.Cell = Cell;\n\n\n//# sourceURL=webpack://Maze-generator/./src/maze/cell.ts?");

/***/ }),

/***/ "./src/maze/findPath.ts":
/*!******************************!*\
  !*** ./src/maze/findPath.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.backtrace = exports.pathSearch = void 0;\n/**\n *\n * @param maze maze in which path want to found\n * @param s starting cell of path\n * @param des destination cell of path\n *\n */\nfunction pathSearch(found, s, des) {\n    // await sleep(1);\n    // if (found.yes) {\n    // \treturn 1;\n    // }\n    if (s === des) {\n        found.yes = true;\n        return 10000;\n    }\n    s.traversed = true;\n    s.neighbors.filter((c) => {\n        if (!c.traversed && s.hasPathWith(c)) {\n            return c;\n        }\n    }).forEach((cell) => {\n        cell.cellNum = s.cellNum + 1;\n        // darwCellNum(maze.ctx, cell);\n        pathSearch(found, cell, des);\n    });\n}\nexports.pathSearch = pathSearch;\nfunction backtrace(maze, stack, cell, targetValue) {\n    // await sleep(1);\n    if (cell.cellNum == targetValue) {\n        stack.solutionStack.push(cell);\n        return;\n    }\n    stack.solutionStack.push(cell);\n    cell.neighbors.filter((neighbor) => {\n        if (cell.hasPathWith(neighbor) && neighbor.cellNum === cell.cellNum - 1) {\n            console.log('hhh');\n            backtrace(maze, stack, neighbor, targetValue);\n        }\n    });\n}\nexports.backtrace = backtrace;\n\n\n//# sourceURL=webpack://Maze-generator/./src/maze/findPath.ts?");

/***/ }),

/***/ "./src/maze/maze.ts":
/*!**************************!*\
  !*** ./src/maze/maze.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Maze = void 0;\nconst cell_1 = __webpack_require__(/*! ./cell */ \"./src/maze/cell.ts\");\nclass Maze {\n    /**\n     * @param canvas canvas on which maze draws.\n     * @param colorCell color of cell of the maze.\n     * @param row number of rows in maze.\n     * @param column number of columbs in maze.\n     * @param w width of each Cell.\n     * @param h height of each Cell.\n     */\n    constructor(canvas, colorCell, row, column, w, h) {\n        this.colorCurrent = 'green';\n        this.colorVisited = 'blue';\n        // all the cells maze contains\n        this.cells = new Array();\n        this.canvas = canvas;\n        this.colorCell = colorCell;\n        this.row = row;\n        this.column = column;\n        this.w = w;\n        // in case we want width and length same\n        if (h) {\n            this.h = h;\n        }\n        else {\n            this.h = w;\n        }\n        this.ctx = canvas.getContext('2d');\n        this.ctx.strokeStyle = colorCell;\n        this.ctx.fillStyle = colorCell;\n        this.generateCells();\n        this.mapNeighborCells();\n        this.createMaze();\n        this.draw(this.ctx);\n    }\n    /**\n     * x and y are the coordinates of top-left point of each Cells.\n     * x will denote horizontal axis value,\n     * y will be denoted ans vertical axis value\n     * but coordinate will in form of (x,y) for canvas despite\n     *\n     */\n    generateCells() {\n        for (let r = 0; r < this.row; r++) {\n            this.cells[r] = new Array();\n            for (let c = 0; c < this.column; c++) {\n                this.cells[r][c] = new cell_1.Cell(c, r, this.w, this.h);\n            }\n        }\n    }\n    // map the neibour array of each array\n    mapNeighborCells() {\n        for (let r = 0; r < this.row; r++) {\n            for (let c = 0; c < this.column; c++) {\n                let cell = this.cells[r][c];\n                // if top neighbor exist\n                if (r - 1 >= 0) {\n                    cell.neighbors.push(this.cells[r - 1][c]);\n                }\n                //if bottom neighbor exist\n                if (r + 1 < this.row) {\n                    cell.neighbors.push(this.cells[r + 1][c]);\n                }\n                // left neighbor\n                if (c - 1 >= 0) {\n                    cell.neighbors.push(this.cells[r][c - 1]);\n                }\n                // right neighbor\n                if (c + 1 < this.column) {\n                    cell.neighbors.push(this.cells[r][c + 1]);\n                }\n            }\n        }\n    }\n    /**\n     * draw the whole maze\n     * @param ctx canvas context in which we want to draw\n     */\n    draw(ctx) {\n        // Erase the canvas before drawing anything on it.\n        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.cells.forEach((rowCells) => {\n            rowCells.forEach((cell) => {\n                cell.draw(ctx);\n            });\n        });\n    }\n    /**\n     * Maze generating algorithm\n     */\n    createMaze() {\n        let ctx = this.canvas.getContext('2d');\n        // current cell is blue\n        ctx.fillStyle = this.colorVisited;\n        // https://en.wikipedia.org/wiki/Maze_generation_algorithm\n        // steps to making a maze.\n        // 1. push a cell to stack and mark it as visited\n        let cellStack = new Array();\n        cellStack.push(this.cells[0][0]);\n        // 2. while stack is not empty\n        while (cellStack.length > 0) {\n            // 1. pop a cell from stack and make it current stack;\n            let current = cellStack.pop();\n            current.mark(this, true);\n            // await sleep(1);\n            // get neighbor of the current cell which are not visited\n            let neighbors = this.getNeighbor(current).filter((c) => {\n                if (!c.visited) {\n                    return c;\n                }\n            });\n            // 2. if current cell has any neighbor which are not visited\n            if (neighbors.length > 0) {\n                // 1. push the current cell to the stack\n                cellStack.push(current);\n                // 2. choose an neighbor cell\n                let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];\n                // 3. remove the wall between current and choosen cell\n                this.removeWallBetween(current, neighbor, ctx);\n                // 4. mark the choosen neighbor cell to visited and push to the stack\n                neighbor.visited = true;\n                cellStack.push(neighbor);\n            }\n        }\n    }\n    /**\n     * get all the neibhors around the cell.\n     * @param cell cell which neighbors we want.\n     * @returns Cell[]\n     */\n    getNeighbor(cell) {\n        let arr = new Array();\n        if (cell.y - 1 >= 0) {\n            arr.push(this.cells[cell.y - 1][cell.x]);\n        }\n        if (cell.y + 1 < this.row) {\n            arr.push(this.cells[cell.y + 1][cell.x]);\n        }\n        if (cell.x - 1 >= 0) {\n            arr.push(this.cells[cell.y][cell.x - 1]);\n        }\n        if (cell.x + 1 < this.column) {\n            arr.push(this.cells[cell.y][cell.x + 1]);\n        }\n        return arr;\n    }\n    // true means wall of cell is open from that side\n    removeWallBetween(c1, c2, ctx) {\n        // c2 is on top of c1\n        if (c1.isTopCell(c2)) {\n            c1.top = true;\n            c2.bottom = true;\n        }\n        // c2 is in left side to c1\n        else if (c1.isLeftCell(c2)) {\n            c1.left = true;\n            c2.right = true;\n        }\n        // c2 is below to c1\n        else if (c1.isBottomCell(c2)) {\n            c1.bottom = true;\n            c2.top = true;\n        }\n        // c2 is in right side of c1\n        else if (c1.isRightCell(c2)) {\n            c1.right = true;\n            c2.left = true;\n        }\n    }\n}\nexports.Maze = Maze;\n\n\n//# sourceURL=webpack://Maze-generator/./src/maze/maze.ts?");

/***/ }),

/***/ "./src/util/drawCellNum.ts":
/*!*********************************!*\
  !*** ./src/util/drawCellNum.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.drawCellNum = void 0;\nfunction drawCellNum(ctx, cell) {\n    let x = cell.x * cell.w;\n    let y = cell.y * cell.h;\n    let s = '' + cell.cellNum;\n    // ctx.font = cell.w < cell.h? cell.w/2 + 'px Arial': cell.h/2 + 'px Arial';\n    ctx.fillText(s, x + cell.w / 2, y + cell.h / 2);\n}\nexports.drawCellNum = drawCellNum;\n\n\n//# sourceURL=webpack://Maze-generator/./src/util/drawCellNum.ts?");

/***/ }),

/***/ "./src/util/moves.ts":
/*!***************************!*\
  !*** ./src/util/moves.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.goUp = exports.goLeft = exports.goDown = exports.goRight = void 0;\nconst sleep_1 = __webpack_require__(/*! ./sleep */ \"./src/util/sleep.ts\");\nfunction goRight(cell, maze) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!cell.stopRightMove) {\n            if (cell.current == cell.destination) {\n                console.log('end');\n            }\n            for (let i = 0; i < cell.current.neighbors.length; i++) {\n                if (cell.current.isRightCell(cell.current.neighbors[i]) && cell.current.neighbors[i].left) {\n                    cell.current = cell.current.neighbors[i];\n                    cell.current.mark(maze);\n                    yield (0, sleep_1.sleep)(1000);\n                    goRight(cell, maze);\n                }\n            }\n        }\n    });\n}\nexports.goRight = goRight;\nfunction goDown(cell, maze) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!cell.stopDownMove) {\n            if (cell.current == cell.destination) {\n                console.log('end');\n            }\n            for (let i = 0; i < cell.current.neighbors.length; i++) {\n                if (cell.current.isBottomCell(cell.current.neighbors[i]) && cell.current.neighbors[i].top) {\n                    cell.current = cell.current.neighbors[i];\n                    cell.current.mark(maze);\n                    yield (0, sleep_1.sleep)(1000);\n                    goDown(cell, maze);\n                }\n            }\n        }\n    });\n}\nexports.goDown = goDown;\nfunction goLeft(cell, maze) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!cell.stopLeftMove) {\n            if (cell.current == cell.destination) {\n                console.log('end');\n            }\n            for (let i = 0; i < cell.current.neighbors.length; i++) {\n                if (cell.current.isLeftCell(cell.current.neighbors[i]) && cell.current.neighbors[i].right) {\n                    cell.current = cell.current.neighbors[i];\n                    cell.current.mark(maze);\n                    yield (0, sleep_1.sleep)(1000);\n                    goLeft(cell, maze);\n                }\n            }\n        }\n    });\n}\nexports.goLeft = goLeft;\nfunction goUp(cell, maze) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!cell.stopUpMove) {\n            if (cell.current == cell.destination) {\n                console.log('end');\n            }\n            for (let i = 0; i < cell.current.neighbors.length; i++) {\n                if (cell.current.isTopCell(cell.current.neighbors[i]) && cell.current.neighbors[i].bottom) {\n                    cell.current = cell.current.neighbors[i];\n                    cell.current.mark(maze);\n                    yield (0, sleep_1.sleep)(1000);\n                    goUp(cell, maze);\n                }\n            }\n        }\n    });\n}\nexports.goUp = goUp;\n\n\n//# sourceURL=webpack://Maze-generator/./src/util/moves.ts?");

/***/ }),

/***/ "./src/util/sleep.ts":
/*!***************************!*\
  !*** ./src/util/sleep.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.sleep = void 0;\nfunction sleep(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\nexports.sleep = sleep;\n\n\n//# sourceURL=webpack://Maze-generator/./src/util/sleep.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
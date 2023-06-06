
class Player {
    constructor(x, y, moving, facing, location) {
        this.playerX = x
        this.playerY = y
        this.playerMoving = moving
        this.playerFacing = facing
        this.playerLocation = location
    }
}
var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {

}
class Game {

    constructor() {
        this.imageList = [];
        this.playerlist = [];
        this.imageLoad(this.imageList)
        this.initPlayers(this.playerlist)
        this.canvas = document.createElement('canvas');
        this.canvas.id = "CursorLayer";
        this.canvas.width = 620;
        this.canvas.height = 520;
        this.canvas.style.zIndex = 0;
        this.canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid black";
        this.canvas.style.left = "70px";
        this.canvas.style.top = "20px";
        this.canvas.style.margin = 0;
        this.keyPresses = {};
        console.log(this.keyPresses)
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas);
        var tileSize = 20;       // The size of a tile (32×32)
        var rowTileCount = 28;   // The number of tiles in a row of our background
        var colTileCount = 31;   // The number of tiles in a column of our background
        var imageNumTiles = 16;  // The number of tiles per row in the tileset image
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        this.animate();
        document.body.style.position = "absolute"
        document.body.style.left = 0
        document.body.style.overflowY = "hidden"
        document.body.style.margin = 0
        document.body.style.background = "black"
        
        window.addEventListener('keydown', (event) => {
            console.log(event)
            console.log(this.keyPresses)
            this.keyPresses[event.key] = true;
        }, false);
        window.addEventListener('keyup',  (event) => {
            console.log(event)
            console.log(this.keyPresses)
            this.keyPresses[event.key] = false;
        }, false)
    }

    keyUpListener(event) {
        this.keyPresses[event.key] = false;
    }
    animate() {
        this.ctx.clearRect(0, 0, 640, 480)

        // calc elapsed time since last loop
        if (this.keyPresses.w) {
            this.playerlist[0].playerY -= 2;
            this.drawPlayers()
        }
        if (this.keyPresses.a) {
            this.playerlist[0].playerX -= 2;
            this.drawPlayers()
        }
        if (this.keyPresses.s) {
            this.playerlist[0].playerY += 2;
            this.drawPlayers()
        }
        if (this.keyPresses.d) {
            this.playerlist[0].playerX += 2;
            this.drawPlayers()
        }
        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // Put your drawing code here

        }
        this.drawImage(20, 26, 31, 16)
        this.drawPlayers()
        requestAnimationFrame(() => this.animate());
    }

    initPlayers(playerList) {
        let player = new Player(0, 0, false, "up", 1)
        playerList.push(player)
    }
    imageLoad(imageList) {
        var tilesetImage = new Image();
        tilesetImage.src = 'src/tileset.png';
        imageList.push(tilesetImage)
        var tilesetImage2 = new Image();
        tilesetImage2.src = 'src/playermodel.png';
        imageList.push(tilesetImage2)
    }
    drawPlayers() {
        this.ctx.drawImage(this.imageList[1], 0, 40, 40, 40, this.playerlist[0].playerX, this.playerlist[0].playerY, 40, 40);
    }
    drawImage(tileSize, rowTileCount, colTileCount, imageNumTiles) {
        for (var r = 0; r < rowTileCount; r++) {
            for (var c = 0; c < colTileCount; c++) {
                let tile = layer1[r][c];
                let tileRow = (tile / imageNumTiles) | 0;
                let tileCol = (tile % imageNumTiles) | 0;
                this.ctx.drawImage(this.imageList[0], (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
            }
        }

    }
}
var game = new Game();







// console.log("ddd")
// 




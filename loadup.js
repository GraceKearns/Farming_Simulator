
class Player {
    constructor(x, y, moving, facing, location) {
        this.playerX = x
        this.playerY = y
        this.playerWalkX = 0
        this.playerWalkY = 0
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
        window.addEventListener('keyup', (event) => {
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
        this.drawImage(20, 26, 31, 16)
        // calc elapsed time since last loop
        if (this.keyPresses.w) {
            if (this.getTile(this.playerlist[0].playerX, this.playerlist[0].playerY - 2, 20) == 1) {
                
            }
            else {
                this.playerlist[0].playerY -= 2;
                this.playerlist[0].playerWalkX = 0
                this.playerlist[0].playerWalkY = 120
            }
        }
        if (this.keyPresses.a) {
            if (this.getTile(this.playerlist[0].playerX - 2, this.playerlist[0].playerY, 20) == 1) {
              
            }
            else {
                this.playerlist[0].playerX -= 2;
                this.playerlist[0].playerWalkX = 0
                this.playerlist[0].playerWalkY = 80
            }
        }
        if (this.keyPresses.s) {
            if (this.getTile(this.playerlist[0].playerX, this.playerlist[0].playerY + 2, 20) == 1) {
               
            }
            else {
                this.playerlist[0].playerY += 2;
                this.playerlist[0].playerWalkX = 0
                this.playerlist[0].playerWalkY = 0
            }
        }
        if (this.keyPresses.d) {
            if (this.getTile(this.playerlist[0].playerX + 2, this.playerlist[0].playerY, 20) == 1) {
                
            }
            else {
                this.playerlist[0].playerX += 2;
                this.playerlist[0].playerWalkX = 0
                this.playerlist[0].playerWalkY = 40
            }
        }
        this.drawPlayers(this.playerlist[0].playerWalkX, this.playerlist[0].playerWalkY, 40, 40, this.playerlist[0].playerX, this.playerlist[0].playerY)
        now = Date.now();

        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // Put your drawing code here

        }


        requestAnimationFrame(() => this.animate());
    }

    initPlayers(playerList) {
        let player = new Player(80, 80, false, "up", 1)
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
    drawPlayers(sx, sy, width, height, x, y) {

        this.ctx.drawImage(this.imageList[1], sx, sy, width, height, x, y, 40, 40);
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
    getTile(x, y, tileSize) {
        const tileX = Math.trunc(x / tileSize) || 0
        const tileY = Math.trunc(y / tileSize) || 0
        return layer1Boundary[tileY][tileX]
    }
}
var game = new Game();







// console.log("ddd")
// 




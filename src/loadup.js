var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {

}
class Game {
    constructor() {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        document.body.style.position = "absolute"
        document.body.style.left = 0
        document.body.style.overflowY = "hidden"
        document.body.style.margin = 0
        document.body.style.background = "black"
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

        this.animate();

        window.addEventListener('keydown', (event) => {
            console.log(this.playerlist[0].playerY)
            console.log(this.playerlist[0].playerCameraY)
            this.keyPresses[event.key] = true;
        }, false);
        window.addEventListener('keyup', (event) => {
            this.keyPresses[event.key] = false;
        }, false)
    }

    keyUpListener(event) {
        this.keyPresses[event.key] = false;
    }
    animate() {
        this.ctx.clearRect(0,0,640,480)
        this.drawMap(40, layer1.length, layer1[0].length, 16)
        
        console.log(layer1.length + " " + layer1[0].length)
    
        let deltaMov = { x: 0, y: 0 }

        if (this.keyPresses.w) {
            deltaMov.y = -2
            this.playerlist[0].playerWalkX = 0
            this.playerlist[0].playerWalkY = 120
        }
        if (this.keyPresses.a) {
            deltaMov.x = -2
            this.playerlist[0].playerWalkX = 0
            this.playerlist[0].playerWalkY = 80
        }
        if (this.keyPresses.s) {
            deltaMov.y = 2
            this.playerlist[0].playerWalkX = 0
            this.playerlist[0].playerWalkY = 0
        }
        if (this.keyPresses.d) {
            deltaMov.x = 2
            this.playerlist[0].playerWalkX = 0
            this.playerlist[0].playerWalkY = 40

        }
        if (!this.getTile(this.playerlist[0].playerX + deltaMov.x, this.playerlist[0].playerY + deltaMov.y, 20) == 1) {
            if (deltaMov.x != 0 && deltaMov.y != 0) {
                deltaMov.x *= 0.71
                deltaMov.y *= 0.71
            }
            if (this.playerlist[0].playerX > this.canvas.width / 2 && this.playerlist[0].playerCameraX >= 0) {
                this.playerlist[0].playerCameraX += deltaMov.x;
            }
            else {
                this.playerlist[0].playerX += deltaMov.x;
                this.playerlist[0].playerCameraX = 0
            }
            if (this.playerlist[0].playerY > this.canvas.height / 2 && this.playerlist[0].playerCameraY >= 0) {
                this.playerlist[0].playerCameraY += deltaMov.y;
            }
            else {
                this.playerlist[0].playerY += deltaMov.y;
                this.playerlist[0].playerCameraY = 0
            }

        }
        this.drawPlayers(this.playerlist[0].playerWalkX, this.playerlist[0].playerWalkY, 40, 40, this.playerlist[0].playerX, this.playerlist[0].playerY)
        
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
        }
        requestAnimationFrame(() => this.animate());
    }
    initPlayers(playerList) {
        let player = new Player(0, 0, false, "up", 1)
        playerList.push(player)
    }
    imageLoad(imageList) {
        var tilesetImage = new Image();
        tilesetImage.src = 'src/img/tileset2.png';
        imageList.push(tilesetImage)
        var tilesetImage2 = new Image();
        tilesetImage2.src = 'src/img/playermodel.png';
        var tilesetImage2 = new Image();
        imageList.push(tilesetImage2)
    }
    drawPlayers(sx, sy, width, height, x, y) {
        this.ctx.drawImage(this.imageList[1], sx, sy, width, height, x, y, 40, 40);
    }
    drawMap(tileSize, rowTileCount, colTileCount, imageNumTiles, tileChoice) {
        let offsetX = Math.floor(this.playerlist[0].playerX + this.playerlist[0].playerCameraX) % tileSize;
        let offsetY = Math.floor(this.playerlist[0].playerY + this.playerlist[0].playerCameraY) % tileSize;
        
        let startRow = Math.floor((this.playerlist[0].playerY + this.playerlist[0].playerCameraY) / tileSize);
        let startCol = Math.floor((this.playerlist[0].playerX + this.playerlist[0].playerCameraX) / tileSize);
    
        for (let r = startRow; r < startRow + rowTileCount + 1; r++) {
            for (let c = startCol; c < startCol + colTileCount + 1; c++) {
                let rowTile = Math.max(0, Math.min(layer1.length - 1, r));
                let colTile = Math.max(0, Math.min(layer1[0].length - 1, c));
    
                let tile = layer1[rowTile][colTile];
                let tileRow = (tile / imageNumTiles) | 0;
                let tileCol = (tile % imageNumTiles) | 0;
    
                this.ctx.drawImage(
                    this.imageList[0],
                    tileCol * tileSize,
                    tileRow * tileSize,
                    tileSize,
                    tileSize,
                    Math.floor((c - startCol) * tileSize - offsetX),
                    Math.floor((r - startRow) * tileSize - offsetY),
                    tileSize,
                    tileSize
                );
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
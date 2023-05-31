
class Game {
    constructor() {
        this.imageList = [];
        this.imageLoad(this.imageList)
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
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas);
        var tileSize = 20;       // The size of a tile (32×32)
        var rowTileCount = 28;   // The number of tiles in a row of our background
        var colTileCount = 31;   // The number of tiles in a column of our background
        var imageNumTiles = 16;  // The number of tiles per row in the tileset image
        document.body.style.position = "absolute"
        document.body.style.left = 0
        document.body.style.overflowY = "hidden"
        document.body.style.margin = 0
        document.body.style.background = "black"
        this.imageList[0].onload =() => {
            this.drawImage(20,28,31,16)

        }
    }
    imageLoad(imageList) {
        var tilesetImage = new Image();
        tilesetImage.src = 'src/tileset.png';
        imageList.push(tilesetImage)

    }
    drawImage(tileSize,rowTileCount,colTileCount,imageNumTiles) {
        console.log("no")
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




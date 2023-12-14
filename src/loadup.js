var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

// initialize the timer variables and start the animation

function startAnimating(fps) { }
class Game {
    constructor() {
        // Initialization block
        this.clock = new Clock();
        this.lastInteractTime = 0;
        this.inventoryOpen = false;
        this.imageList = [];
        this.playerlist = [];
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;

        // Styling and event listeners setup
        document.body.style.position = "absolute";
        document.body.style.left = 0;
        document.body.style.overflow = "hidden";
        document.body.style.margin = 0;
        document.body.style.background = "black";

        window.addEventListener("resize", () => this.handleResize());
        window.addEventListener("keydown", (event) => {
            this.keyPresses[event.key] = true;
        }, false);
        window.addEventListener("keyup", (event) => {
            this.keyPresses[event.key] = false;
        }, false);

        // Image and player initialization
        this.imageLoad(this.imageList);
        this.initPlayers(this.playerlist);

    }
    handleResize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.canvas2.width = window.innerWidth;
        this.canvas2.height = window.innerHeight;
        this.imageContainer.style.width = windowWidth + "px";
        this.imageContainer.style.height = windowHeight + "px";
        const imageWidth = this.imageList[2].width;
        const imageHeight = this.imageList[2].height;
        const leftPosition = (windowWidth - imageWidth) / 2 + "px";
        const bottomPosition = windowHeight - imageHeight + "px";
        this.imageList[2].style.left = leftPosition;
        this.imageList[2].style.top = bottomPosition;
        const imageWidth3 = this.imageList[3].width;
        this.imageList[3].style.position = "absolute";
        this.imageList[3].style.top = "10px";
        this.imageList[3].style.left = windowWidth - imageWidth3 + "px";
        this.imageList[3].style.width = imageWidth3 + "px";
        const imageHeight5 = this.imageList[5].height;
        const imageWidth5 = this.imageList[5].width;
        this.imageList[5].style.position = "absolute";
        this.imageList[5].style.top = (window.innerHeight - imageHeight5) / 2 + "px"
        this.imageList[5].style.left = (window.innerWidth - imageWidth5) / 2 + "px";
        this.imageList[7].style.position = "absolute";
        this.imageList[8].style.position = "absolute";
        this.imageList[9].style.position = "absolute";
        this.imageList[7].style.left = "1rem"
        this.imageList[7].style.top = "1rem"
        this.imageList[8].style.left = "1rem"
        this.imageList[8].style.top = "2rem"
        this.imageList[9].style.left = "1rem"
        this.imageList[9].style.top = "3rem"
        this.imageList[9].style.width = "180px"
        this.timeText.style.left = window.innerWidth - this.imageList[3].width / 1.5 + "px";
        this.timeText.style.top = this.imageList[3].height / 1.65 + "px";
        this.timeText2.style.left = window.innerWidth - this.imageList[3].width / 1.4 + "px";
        this.timeText2.style.top = this.imageList[3].height / 6.9 + "px";
        this.timeText2.innerHTML = this.clock.getDate();
        this.imageContainer.appendChild(this.imageList[2]);
        this.imageContainer.appendChild(this.imageList[3]);
        this.imageContainer.appendChild(this.imageList[5]);
        this.imageContainer.appendChild(this.imageList[7]);
        this.imageContainer.appendChild(this.imageList[8]);
        this.imageContainer.appendChild(this.imageList[9]);
    }
    startGame() {
        const font = new FontFace(
            "Margarine-Regular",
            "url(src/fonts/Margarine-Regular.ttf)"
        );
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        });
        this.canvas = document.createElement("canvas");
        this.canvas.id = "CursorLayer";
        this.canvas.width = 620;
        this.canvas.height = 520;
        this.canvas.style.zIndex = 0;
        this.canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid black";

        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";

        this.canvas.style.margin = 0;
        this.canvas2 = document.createElement("canvas");
        this.canvas2.id = "CursorLayer";

        this.canvas2.style.zIndex = 0;
        this.canvas2.style.position = "absolute";
        this.canvas2.style.margin = 0;
        this.canvas.style.zIndex = "1"
        this.canvas2.style.zIndex = "5"
        this.currentFrame = 0;
        this.frameCount = 3; // Assuming 4 frames in the walking animation
        this.animationDelay = 6; // Adjust this value to control the animation speed
        this.frameDelayCounter = 0;
        this.imageContainer = document.createElement("div");
        this.imageContainer.id = "imageContainer";
        this.imageContainer.style.position = "absolute";
        this.imageContainer.style.width = "640px"; // Set width as needed
        this.imageContainer.style.height = "480px"; // Set height as needed
        this.imageContainer.style.top = "0px"; // Adjust top position
        this.imageContainer.style.left = "0px"; // Adjust left position
        this.imageContainer.style.zIndex = "4"; // Ensure it's above the canvas
        this.imageContainer.style.background = "rgba(255, 255, 255, 0)"; // Optional: set background color/transparency
        this.imageList[2].style.position = "absolute";
        this.imageList[2].style.zIndex = "-1"; // Adjust left position within the imageContainer div
        this.imageList[3].style.position = "absolute";
        this.imageList[3].style.zIndex = "-1"; // Adjust left position within the imageContainer div
        this.imageList[3].style.width = this.imageList[3].width + "px";
        this.imageList[4].style.zIndex = "1";
        this.imageList[5].style.zIndex = "2";
        this.imageList[5].style.display = "none";
        this.timeText = document.createElement("p");
        this.timeText.style.position = "absolute";
        this.timeText.style.color = "black";
        this.timeText.style.zIndex = "5";
        this.timeText.style.width = "200px";
        this.timeText.style.wrap = "no-wrap";
        this.timeText.style.fontFamily = "Margarine-Regular, sans-serif";
        this.timeText2 = document.createElement("p");
        this.timeText2.style.fontFamily = "Margarine-Regular, sans-serif";
        this.timeText2.style.position = "absolute";
        this.timeText2.style.color = "black";
        this.timeText2.style.zIndex = "5";
        this.timeText2.style.width = "200px";
        this.timeText2.style.wrap = "no-wrap";

        this.handleResize();
        // Append the div to the body
        document.body.appendChild(this.imageContainer);
        document.body.appendChild(this.timeText);
        document.body.appendChild(this.timeText2);
        this.keyPresses = {};
        console.log(this.keyPresses);
        this.ctx = this.canvas.getContext("2d");
        this.ctx2 = this.canvas2.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.scale(2, 2);
        this.ctx2.imageSmoothingEnabled = false;
        this.ctx2.webkitImageSmoothingEnabled = false;
        this.ctx2.scale(2, 2);
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.canvas2);
        this.canvas2.width = window.innerWidth;
        this.canvas2.height = window.innerHeight;
        this.animate();
    }
    keyUpListener(event) {
        this.keyPresses[event.key] = false;
    }

    interact() {
        let intStart = false
        if (this.getTile(this.cordx + 15, this.cordy + 50, 40, layer1Interacts) == 2 && this.playerlist[0].playerFacing == "up" && intStart == false) {
            intStart = true
            console.log("chest open")
            this.item = new Item(this.imageList[4], { x: 108 - 108, y: 0 }, 0, this.ctx2)
            this.playerlist[0].playerInventory.inventoryAdd(this.item)
        }

    }
    openInventory() {
        if (this.inventoryOpen) {
            this.imageList[5].style.display = "none"
            this.imageList[2].style.display = "block"
            this.inventoryOpen = false
            this.clock.resumeTime()
        }
        else {
            this.imageList[5].style.display = "block"
            this.imageList[2].style.display = "none"
            this.inventoryOpen = true
            this.clock.stopTick()
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, 10000, 10000);
        this.ctx2.clearRect(0, 0, 10000, 10000);
        this.timeText.innerHTML = this.clock.getTime();
        drawMap(this.ctx, this.imageList, this.playerlist, layer1, 40, layer1.length, layer1[0].length);
        if (this.inventoryOpen) {
            this.playerlist[0].playerInventory.drawInventory(this.ctx2, this.imageList[2])
        }
        else {
            this.playerlist[0].playerInventory.drawInventoryHotbar(this.ctx2, this.imageList[2])
        }
        this.deltaMov = { x: 0, y: 0 };

        if (this.keyPresses.w && this.inventoryOpen != true) {
            this.deltaMov.y = -2;
            this.playerlist[0].playerWalkX = 0;
            this.playerlist[0].playerWalkY = 90;
            this.playerlist[0].playerFacing = "up"
        }

        if (this.keyPresses.e && Date.now() - this.lastInteractTime >= 200 && this.inventoryOpen != true) {
            this.lastInteractTime = Date.now()
            this.interact();
        }
        if (this.keyPresses.i && Date.now() - this.lastInteractTime >= 200) {
            this.lastInteractTime = Date.now()
            this.openInventory()


        }
        if (this.keyPresses.a && this.inventoryOpen != true) {
            this.deltaMov.x = -2;
            this.playerlist[0].playerWalkX = 0;
            this.playerlist[0].playerWalkY = 30;
            this.playerlist[0].playerFacing = "left"
        }
        if (this.keyPresses.s && this.inventoryOpen != true) {
            this.deltaMov.y = 2;
            this.playerlist[0].playerWalkX = 0;
            this.playerlist[0].playerWalkY = 0;
            this.playerlist[0].playerFacing = "down"
        }
        if (this.keyPresses.d && this.inventoryOpen != true) {
            this.deltaMov.x = 2;
            this.playerlist[0].playerWalkX = 0;
            this.playerlist[0].playerWalkY = 60;
            this.playerlist[0].playerFacing = "right"
        }
        const halfwayPointX = this.canvas.width / 2 / 2.1;
        const halfwayPointY = this.canvas.height / 2 / 2.8;
        this.cordx =
            this.playerlist[0].playerX >= halfwayPointX
                ? this.canvas.width / 4 + this.playerlist[0].playerCameraX
                : this.playerlist[0].playerX;
        this.cordy =
            this.playerlist[0].playerY >= halfwayPointY
                ? this.canvas.height / 4 + this.playerlist[0].playerCameraY
                : this.playerlist[0].playerY;

        if (
            !getTile(
                this.cordx + this.deltaMov.x + +15,
                this.cordy + this.deltaMov.y + 30,
                40,
                layer1Boundary
            ) == 1
        ) {
            if (this.deltaMov.x !== 0 && this.deltaMov.y !== 0) {
                this.deltaMov.x *= 0.71;
                this.deltaMov.y *= 0.71;
            } else {
                if (
                    this.playerlist[0].playerX >= halfwayPointX &&
                    this.playerlist[0].playerCameraX >= 0
                ) {
                    this.playerlist[0].playerCameraX += this.deltaMov.x;
                    console.log("e");
                } else {
                    this.playerlist[0].playerX += this.deltaMov.x;
                    this.playerlist[0].playerCameraX = 0;
                }
                if (
                    this.playerlist[0].playerY > halfwayPointY &&
                    this.playerlist[0].playerCameraY >= 0
                ) {
                    this.playerlist[0].playerCameraY += this.deltaMov.y;
                } else {
                    this.playerlist[0].playerY += this.deltaMov.y;
                    this.playerlist[0].playerCameraY = 0;
                }
            }
        }
        this.drawPlayers(
            this.playerlist[0].playerWalkX,
            this.playerlist[0].playerWalkY,
            30,
            30,
            this.playerlist[0].playerX,
            this.playerlist[0].playerY
        );
        if (this.inventoryOpen != true) {
            // now = Date.now();
            // elapsed = now - then;
            // if (elapsed > fpsInterval) {
            //   then = now - (elapsed % fpsInterval);
            // }
        }
        requestAnimationFrame(() => this.animate());
    }

    initPlayers(playerList) {
        let player = new Player(0, 0, false, "up", 1);
        playerList.push(player);
    }
    imageLoad(imageList) {
        var tilesetImage = new Image();
        tilesetImage.src = "src/img/tileset4.png";
        imageList.push(tilesetImage);
        var tilesetImage2 = new Image();
        tilesetImage2.src = "src/img/playermodel2.png";
        imageList.push(tilesetImage2);
        var itembar = new Image();
        itembar.src = "src/img/hud/hud.png";
        imageList.push(itembar);
        var menu = new Image();
        menu.src = "src/img/hud/info.png";
        imageList.push(menu);
        var iconset = new Image()
        iconset.src = "src/img/hud/iconset.png"
        imageList.push(iconset)
        var inventory = new Image()
        inventory.src = "src/img/hud/hud inventoryfull.png"
        imageList.push(inventory)
        var characterInfo = new Image()
        characterInfo.src = "src/img/hud/characterinfo.png"
        imageList.push(characterInfo)
        var health = new Image()
        health.src = "src/img/hud/health.png"
        imageList.push(health)
        var mana = new Image()
        mana.src = "src/img/hud/mana.png"
        imageList.push(mana)
        var stamina = new Image()
        stamina.src = "src/img/hud/stamina.png"
        imageList.push(stamina)
        menu.onload = () => this.startGame();
    }
    drawPlayers(sx, sy, width, height, x, y) {
        const frameWidth = this.imageList[1].width / this.frameCount;
        this.ctx.drawImage(
            this.imageList[1],
            this.currentFrame * frameWidth,
            sy,
            frameWidth,
            height,
            x,
            y,
            30,
            30
        );
        if (
            this.frameDelayCounter >= this.animationDelay &&
            (this.deltaMov.x != 0 || this.deltaMov.y != 0)
        ) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.frameDelayCounter = 0;
        } else {
            this.frameDelayCounter++;
        }
    }
    
}
var game = new Game();

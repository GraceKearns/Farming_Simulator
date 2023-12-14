class Player {
    constructor(x, y, moving, facing, location) {
        this.playerX = x
        this.playerY = y
        this.playerCameraX = 0
        this.playerCameraY = 0
        this.playerWalkX = 0
        this.playerWalkY = 0
        this.playerMoving = moving
        this.playerFacing = facing
        this.playerLocation = location
        this.playerInventory = new Inventory("player",null,3)
   
        console.log(this.playerInventory.inventoryHotBar)
    }
}

class Inventory {
    constructor(inventoryType, initItems, invRows) {
        this.inventory = []
        this.inventoryType = inventoryType;
        this.inventoryHotBar = inventoryType == "player" ? [] : null
        for (let i = 0; i < invRows; i++) {
            this.inventory.push([])
        }
    }
    inventoryAdd(item) {

        if (this.inventoryType == "player") {
            if (this.inventoryHotBar.length != 8) {
                this.inventoryHotBar.push(item)
                return true;
            }
        }
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].length != 8) {
                this.inventory[i].push(item)
                return true;
            }
        }
        return false
    }
    drawInventoryHotbar(contex,image) {
        let itemIndex = 160
        this.inventoryHotBar.forEach(item => {
            item.drawItemHud(((((800 - 480) /2) + (window.innerWidth - image.width) / 2) )-itemIndex ,   (window.innerHeight - image.height))
            itemIndex-=60
        })
    }
    drawInventory(contex,image) {
        this.inventory[0] = this.inventoryHotBar
        let itemIndex = 160
        let itemIndexY = 285
        console.log(this.inventory)
        this.inventory.forEach((item,index) => {
            item.forEach(item=> {
                item.drawItemHud(((((800 - 480) /2) + (window.innerWidth - image.width) / 2) )-itemIndex , ((((640 - 210) /2) + (window.innerHeight - image.height) / 2)-itemIndexY ))
                itemIndex-=60
            })
            console.log(index)
            itemIndex = 160
            if(index ==0) {
                itemIndexY = 205
            }
            else {
                itemIndexY -=56
            }
           
        })
    }

}
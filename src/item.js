class Item {
    constructor(image,ItemCords,itemId,context) {
        this.image = image;
        this.ItemCords=ItemCords;
        this.itemId= itemId;
        this.context = context
    }
    drawItemHud(x,y) {
        this.context.drawImage(this.image,this.ItemCords.x,this.ItemCords.y,54,54,x,y,54,54)
    }
}
class farmProduct {
    constructor(plantName,cords) {
        this.plantName = plantName;
        this.daysGrown = 0;
        this.cords = cords;
    }
    incrementDay() {
        this.daysGrown++
    }
}
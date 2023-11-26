class Clock {
  constructor() {
    this.time = {
      gameDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      gameSeasons: ["Summer", "Fall", "Winter", "Spring"],
      gameDay: 1,
      seasonDay: 1,
      gameDOW:0,
      gameSE:0,
      min: 0,
      hour: 6,
      type: "AM",
    };
    this.lastUpdate = Date.now();
    this.clockTick = setInterval(this.tick.bind(this), 3500);
  }
  tick() {
    let { min, hour, type } = this.time;
    min += 5;
    if (min >= 60) {
      min = 0;
      hour += 1;
      if (hour > 12) {
        hour = 1;
        type = type === "AM" ? "PM" : "AM";
      }
    }
    this.time = { min, hour, type };
    const formattedHours = String(hour).padStart(2, "0");
    const formattedMinutes = String(min).padStart(2, "0");
    console.log(`${formattedHours}:${formattedMinutes} ${type}`);
  }
  stopTick() {
    clearInterval(this.clockTick);
  }
  resumeTime() {
    this.clockTick = setInterval(this.tick.bind(this), 3500);
  }
  setTime(min = null, hour = null, type = null) {
    this.time = {
      min: min === null ? this.time.min : min,
      hour: hour === null ? this.time.hour : hour,
      type: type === null ? this.time.type : type,
    };

  }
  getTime() {
    let { min, hour, type } = this.time;
  
    const formattedHours = String(hour).padStart(2, "0");
    const formattedMinutes = String(min).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${type}`
  }
  setDay(day) {
    this.time.gameDay = day;
  }
}

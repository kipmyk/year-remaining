// generate.js

class YearProgress {
    constructor() {
      this.currentDate = new Date();
      this.dayOfYear = this.currentDate.calculateDayOfYear();
      this.integerPercentage = true;
      this.calculateRemainingPercentage();
      this.buildProgressBar();
    }
  
    calculateRemainingPercentage() {
      if (this.dayOfYear >= 365) {
        this.remainingPercentage = 0;
      } else if (this.dayOfYear === 1) {
        this.remainingPercentage = 100;
      } else {
        this.remainingPercentage = 1 - this.dayOfYear / 365.0;
  
        if (parseFloat(this.remainingPercentage.toFixed(3).split('.')[1].slice(2, 5)) <= 273) {
          this.remainingPercentage = parseInt(this.remainingPercentage * 100);
        } else {
          this.remainingPercentage = parseFloat((this.remainingPercentage * 1000).toFixed(1));
          this.integerPercentage = false;
        }
      }
    }
  
    buildProgressBar() {
      const strArray = Array.from(this.remainingPercentage.toString()).map(Number);
      if (strArray[strArray.length - 1] === 5 || strArray[strArray.length - 1] === 0) {
        // Do nothing
      } else if (strArray[strArray.length - 1] > 5) {
        if (strArray.length > 1) {
          strArray[strArray.length - 1] = 0;
          strArray[strArray.length - 2]++;
        } else {
          strArray[strArray.length - 1] = 1;
          strArray.push(0);
        }
      } else if (strArray[strArray.length - 1] < 5) {
        strArray[strArray.length - 1] = 5;
      }
  
      const displayString = strArray.join('');
  
      const blocksOutOfTen = (100 - parseInt(displayString)) / 10;
      const barWidth = 10;
      const charactersLeft = Math.floor(blocksOutOfTen * barWidth / 10);
      const charactersRight = barWidth - charactersLeft;
  
      const progressBarArray = new Array(charactersLeft).fill('░').concat(new Array(charactersRight).fill('▓'));
      const progressBarStr = progressBarArray.join('') + ' ' + displayString + '%';
  
      this.output = {
        dayOfYear: this.dayOfYear,
        remainingPercentage: parseFloat(displayString),
        progressBarStr: progressBarStr,
        integerPercentage: this.integerPercentage
      };
  
      console.log(progressBarStr); // Output to the console
    }
  }
  
  // Add calculateDayOfYear function to Date prototype
  Date.prototype.calculateDayOfYear = function() {
    const start = new Date(this.getFullYear(), 0, 0);
    const diff = this - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };
  
  // Create an instance of YearProgress
  const yearProgress = new YearProgress();  
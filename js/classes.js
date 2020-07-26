/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var debug = true;
function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

class Time {

    constructor(time) {
        let arr = time.split(":");
        this.hour = parseInt(arr[0]);
        this.minute = parseInt(arr[1]);
    }

    toString() {
        return zeroPad(this.hour, 2) + ":" + zeroPad(this.minute, 2);
    }

    equals(time) {
        return time.hour === this.hour && time.minute === this.minute;
    }

}

class Class {
    constructor(id, instructor, days, start, end) {
        this.id = id;
        this.instructor = instructor;
        this.days = days;
        this.start = start;
        this.end = end;
    }
    intercept(clazz) {
        DAYS_INTERCEPTION: for (let i = 0; i < this.days.length; i++) {
            for (let x = 0; x < clazz.days.length; x++) {
                if (this.days[i] === clazz.days[x]) {
                    //check if the time intercept
                    if (this.start.equals(clazz.start) || this.end.equals(clazz.end)) {
                        return true;
                    }
                    let temp = [this.start, this.end];
                    if (clazz.start.equals(this.end)) {
                        clazz.start = this.end;
                    } else {
                        temp.push(clazz.start);
                    }
                    if (clazz.end.equals(this.start)) {
                        clazz.end = this.start;
                    } else {
                        temp.push(clazz.end);
                    }
                    let arr = temp.sort(function (a, b) {
                        return a.hour - b.hour === 0 ? a.minute - b.minute : a.hour - b.hour;
                    });
                    if (debug) {
                        console.log(arr);
                        console.log("end: " + arr.indexOf(this.end) + " start:" + arr.indexOf(this.start));
                    }
                    if (arr.indexOf(this.end) - arr.indexOf(this.start) > 1 || arr.indexOf(clazz.end) - arr.indexOf(clazz.start) > 1) {
                        return true;
                    }
                    break DAYS_INTERCEPTION;
                }
            }
        }
        return false;
    }

}
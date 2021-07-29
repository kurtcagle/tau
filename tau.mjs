export class Tau {     
    static TAU = 2 * Math.PI
    static TAU_2 = Math.PI
    static TAU_4 = Math.PI/2
    static TAU_6 = Math.PI/3
    static TAU_8 = Math.PI/4
    constructor(){
        // This consists solely of static methods and constants
    }
    static toDegrees(rev){return rev * 360}
    static toRadians(rev){return rev * this.TAU}
    static fromDegrees(deg){return deg / 360}
    static fromRadians(rad){return rad / this.TAU}
    static sin(t){
        return Math.sin(t * this.TAU)
    }
    static cos(t){
        return Math.cos(t * this.TAU)
    }
    static tan(t){
        return Math.tan(t * this.TAU)
    }
    static asin(t){
        return this.fromRadians(Math.asin(t))
    }
    static acos(t){
        return this.fromRadians(Math.acos(t))
    }
    static atan(t){
        return this.fromRadians(Math.atan(t))
    }
}

export class Complex{
    constructor(x,y){
        this.x = x
        this.y = y
        return this
    }
    toString(){
        return `${this.x} ${Math.sign(this.y)>=0?'+':'-'} ${Math.abs(this.y)} i`
    }
}

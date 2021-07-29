class Tau {     
    static TAU = 2 * Math.PI
    static TAU_2 = this.TAU/2
    static TAU_4 = this.TAU/4
    static TAU_6 = this.TAU/6
    static TAU_8 = this.TAU/8
    static TAU_12 = this.TAU/12
    constructor(){
        // This consists solely of static methods and constants
    }
    // converts a revolution to degrees
    static toDegrees(rev){return rev * 360}
    // converts a revolution to radians
    static toRadians(rev){return rev * this.TAU}
    // converts from degrees to revolutions
    static fromDegrees(deg){return deg / 360}
    // converts from radians to revolutions
    static fromRadians(rad){return rad / this.TAU}
    // returns the sine value of the given revolution
    static sin(rev){
        return Math.sin(rev * this.TAU)
    }
    // returns the cosine value of the given revolution
    static cos(rev){
        return Math.cos(rev * this.TAU)
    }
    // returns the tangent value of the given revolution
    static tan(rev){
        return Math.tan(rev * this.TAU)
    }
    // returns the arcsine value of the given revolution
    static asin(rev){
        return this.fromRadians(Math.asin(rev))
    }
    // returns the arccosine value of the given revolution
    static acos(rev){
        return this.fromRadians(Math.acos(rev))
    }
    // For a given x,y value, returns the corresponding revolution from -0.5 to 0.5.
    static atan(x,y){
        return this.fromRadians(Math.atan2(y,x))
    }
}

class TauComplex{
    // Indicates the number of significant digits complex numbers are displayed using.
    static SIGDIGITS = 5;
    constructor(x,y){
        this.x = x
        this.y = y
        return this
    }
    // toString() generates a complex number of the form "a+bi" for string output
    toString(){
        let minX = Math.abs(this.x)<1e-5?0:TauComplex.trim(this.x);
        let minY = Math.abs(this.y)<1e-5?0:TauComplex.trim(this.y);
        return `${minX} ${Math.sign(this.y)>=0?'+':'-'} ${Math.abs(minY)}i`
    }
    // generates the length of the complex number vector
    get modulus(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    // generates the square of the length of the complex number vector. This avoids the need to take the square root
    get modsquare(){
        return this.x*this.x + this.y*this.y;
    }
    // retrieves the angle relative to the positive x axis of the complex number, in revolutions
    get theta(){
        let angle = Tau.atan(this.x,this.y);
        let ySgn = Math.sign(this.y);
        let adjAngle = ySgn<0?1+angle:angle;
        return adjAngle;
    }
    // retrieves the complex conjugate (a-bi) of the complex number (a+bi)
    get conjugate(){
        return new TauComplex(this.x,-this.y)
    }
    // retrieves the complex inverse of the number (a+bi).
    get inverse(){
        return (this.conjugate).scale(1/this.modsquare)
    }
    // rotates the complex number through the angle, expressed in revolutions.
    rotate(angle){
        let newX = this.x * Tau.cos(angle) - this.y * Tau.sin(angle);
        let newY = this.x * Tau.sin(angle) + this.y * Tau.cos(angle)
        return new TauComplex(newX,newY)
    }
    // Multiplies the complex number by a scalar value (or values if two arguments are supplied)
    scale(x,y=x){
        let newX = this.x * x;
        let newY = this.y * y;
        return new TauComplex(newX,newY)
    }
    // translates the complex number by the given amount. Equivalent to adding two complex numbers
    translate(x,y=x){
        let newX = this.x + x;
        let newY = this.y + y;
        return new TauComplex(newX,newY)
    }
    // Adds two or more complex numbers together.
    static sum(...c){
        let reducer = (acc, cur) => new TauComplex(acc.x+cur.x,acc.y+cur.y)
        return c.reduce(reducer)
    }
    // Multiples two or more complex numbers together.
    static mult(...c){
        let reducer = (acc, cur) => new TauComplex(acc.x*cur.x-acc.y*cur.y,acc.x*cur.y+acc.y*cur.x)
        return c.reduce(reducer)
    }
    // Divides the first complex number by the second
    static div(c1,c2){
        return TauComplex.mult(c1,c2.inverse)
    }
    // Takes the complex number to the given power. Power MUST be a non-negative integer.
    pow(power){
        let arr = [];
        for (var index=0;index!=power;index++){
            arr.push(this);
        }
        if (arr.length>0) {
            return TauComplex.mult(...arr)
        }
        else {
            return new TauComplex(1,0);
        }
    }
    // Returns the real portion of a complex number
    get re(){
        return this.x
    }
    // Returns the imaginary portion of a complex number
    get im(){
        return this.y
    }
    // Returns the complex number associated with a unit vector rotated by the revolution amount
    static tau(rev){
        return new TauComplex(Tau.cos(rev),Tau.sin(rev));
    }
    // Returns the complex exponent of the given complex number
    get exp(){
        return TauComplex.tau(this.y).scale(Math.exp(this.x))
    }
    // Creates a string representation of a number to the given significant digits, default being 5.
    static trim(value,sigDigits=this.SIGDIGITS){
        return value.toLocaleString("en-us",{maximumSignificantDigits:sigDigits})
    }
    static array(...arr){
        return arr.map((subArr,index)=>new TauComplex(...subArr))
    }

}
const _Tau = Tau;
exports.Tau = _Tau;
const _TauComplex = TauComplex;
exports.TauComplex = _TauComplex;

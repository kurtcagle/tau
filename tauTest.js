const { Tau, TauComplex } = require('./tau');
TauComplex.SIGDIGITS = 3
const c1 = new TauComplex(1,2);
const c2 =  c1.rotate(0.25);
const c3 = TauComplex.sum(c1,c2);
const c4 = new TauComplex(0,-1);
const c5 = new TauComplex(1,3/8);
const cArr = TauComplex.array([1,0],[0,1],[-1,0],[0,-1])

console.log(`c1: ${c1}`);
console.log(`c2: ${c2}`);
console.log(`c3: ${c3}`);
console.log(`c4: ${c4}`);
console.log(`modulus of c3: ${c3.modulus}`)
console.log(`modulus squared of c3: ${c3.modsquare}`)
console.log(`theta of c3: ${c3.theta}`)
console.log(`conjugate of c3: ${c3.conjugate}`)
console.log('c1 + c2: '+TauComplex.sum(c1,c2))
console.log('c1 * c2: '+TauComplex.mult(c1,c2))
console.log('c1 ^ 2: '+c1.pow(2))
console.log('c1 ^ 3: '+c1.pow(3))
console.log('1 / c1: '+c1.inverse)
console.log(`c1 / c3: ${TauComplex.div(c1,c3)}`)
console.log(`exp(c5): ${c5.exp}`)
console.log('c1 scale 2: '+c1.scale(2));
console.log('c1 translate 2,3: '+c1.translate(2,3));
for (index=0;index<=12;index++){
    console.log(`c4 rotate ${index}/12 or ${Tau.toDegrees(index/12)}: ${c4.rotate(index/12)}`)
}
console.log(`Complex Array: ${cArr}`);
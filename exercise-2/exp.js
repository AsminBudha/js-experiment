
console.log([1,2].join());
console.log([{id:1},{id:2},{id:3}].reduce((acc,val,i)=>{
	if(val.id>=2)
		acc.push(i);
	return acc;
},[]));

class MyClass{
  constructor(myVal) {
    this.myVal = myVal;
  }
  getVal() {
    return this.myVal;
  }
}
class AnotherClass extends MyClass {
  constructor(val) {
    super(100);
    this.val = val;
  }
  getNewVal() {
    console.log('My Variable', this.val);
    console.log('Inherited Class', this.myVal);
  }
}

const myClass = new AnotherClass(20);
myClass.getNewVal();




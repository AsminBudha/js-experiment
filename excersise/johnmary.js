var names=['John','Mary','John','Sam','Sam','Sam','John'];
var result=names.reduce(function(acc,val){
	if(!acc[val]) acc[val]=0;
	acc[val]++;
	return acc;
},{});
console.log(result);

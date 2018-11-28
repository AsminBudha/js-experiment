var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
];

/** Simple Implementation*/
function searchByName(arr,name){
	var result=sortByKey(arr,'name');
	// console.log(result);

	for(var i=0;i<arr.length;i++){
		if(name.toLowerCase()==arr[i].name.toLowerCase()){
			return arr[i];
		}
	}
	return null;
}

var apple=searchByName(fruits, 'apple');
console.log(apple);

function searchByKey(arr,key,val){

	for(var i=0;i<arr.length;i++){
		if(val.toLowerCase()==arr[i][key].toLowerCase()){

			return arr[i];
		}
	}

	return null;
}

var keyApple=searchByKey(fruits,'name','apple');
console.log(keyApple);

/**Binary Search Implementatioin*/
function sortByKey(fruits,key){
	return fruits.sort(function(a,b){
		return a[key]>b[key];
	});
}

function binSearch(fruits,key,val){
	var l=0,r=fruits.length-1;
	var mid=0;
	// console.log(fruits);
	while(l<=r){
		mid=l+(r-l)/2;
		mid=parseInt(mid);
		// console.log(mid);
		if(fruits[mid][key].toLowerCase()==val.toLowerCase()){
			return fruits[mid];
		}
		else if(fruits[mid][key].toLowerCase()<val.toLowerCase()){
			l=mid+1;
		}
		else{
			r=mid-1;
		}
	}
	return null;
}

function searchByNameWithBinSearch(arr,name){
	var result=sortByKey(arr,'name');
	// console.log(result);
	return binSearch(result,'name',name);
}
console.log('From Binary Search');
var appleBinSearch=searchByNameWithBinSearch(fruits, 'apple');
console.log(appleBinSearch);

function searchByKeyWithBinSearch(arr,key,val){
	var result=sortByKey(arr,key);

	return binSearch(result,key,val);
}

var keyAppleBinSearch=searchByKeyWithBinSearch(fruits,'name','apple');
console.log(keyAppleBinSearch);

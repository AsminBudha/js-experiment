var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    },{
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }] 
  },{
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];

console.log('Normalization');
function traverse(obj,output){
  if(!obj.children){
    return output;
  }
  // console.log(output);
  for(var i=0;i<obj.children.length;i++){
    var node={id:obj.children[i].id,name:obj.children[i].name,children:[]};
    output[obj.children[i].id]=node;
    output[obj.id].children.push(obj.children[i].id);
    traverse(obj.children[i],output);
  }
  return output;
}

// var fromR=people.reduce(function(acc,val,index){
//   // for(var i=0;i<tree.length;i++){
//     var obj={id:val.id,name:val.name,children:[]};
//     acc[val.id]=obj;
//     acc=traverse(val,acc);
//     // console.log(output);
//   // }
//   return acc;
// });
// console.log("From Reduce Normalization");
// console.log(fromR);
function normalize(tree){
  var output={};
  for(var i=0;i<tree.length;i++){
    var obj={id:tree[i].id,name:tree[i].name,children:[]};
    output[tree[i].id]=obj;
    output=traverse(tree[i],output);
    // console.log(output);
  }
  return output;
}

var output=normalize(people);
console.log(output);
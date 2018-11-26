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

function traverse(obj,output){
  if(!obj.children){
    return output;
  }
  for(var i=0;i<obj.children.length;i++){
    var node={id:obj.children[i].id,name:obj.children[i].name,children:[]};
    output[obj.children[i].id]=node;
    output[obj.id].children.push(obj.children[i].id);
    traverse(obj.children[i],output);
  }
  return output;
}

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
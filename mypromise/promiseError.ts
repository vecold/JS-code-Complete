let pro = new Promise((resolve,reject)=>{
  resolve(100);
});

var p1 = pro.then(value=>{
  console.log(value);
  return p1;
})

p1.then(value=>{
  console.log(value)
},reason=>{
  console.log(reason)
})
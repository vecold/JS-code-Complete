setTimeout(function() {
  var a = 'hello';
  setTimeout(function () {
    var b = 'lagou';
    setTimeout(function(){
      var c = 'I i U';
      console.log(a+b+c);
    },10)
  },10)
},10);

Promise.resolve('hello').then(value=> value + 'lagou').then(value=>console.log(value + 'I i U'));
// 监听类
class FakeListener {
  public fucArr: {[key:string]:Function};
  constructor() {
    this.fucArr = {};
  }
  // 事件监听
  addLister(target:string,type:string,fuc:Function) {
    if(typeof fuc !== 'function') return;
    this.fucArr[`${target}${type}`] = fuc;
  }

  removeLister(target:string,type:string) {
    delete this.fucArr[`${target}${type}`];
  }

  // 事件分发
  dispatchLister(target:string,type:string,body?: any) {
    if(this.fucArr[`${target}${type}`]) {
      this.fucArr[`${target}${type}`](body);
    }
  }
}

let a = new FakeListener();
a.addLister('test','click',(args)=>{
  console.log('123',args)
});
a.dispatchLister('test','click',{a:2});
a.removeLister('test','click');
a.dispatchLister('test','click',{b:3});
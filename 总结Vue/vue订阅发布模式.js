var eventBus = {
    listener:{},
    emit:function(type,payload){
        if(this.listener[type]){
            this.listener[type](payload);
        }
    },
    addListener(type,fn){
        this.listener[type] = fn;
    }
}


function Vue(){
    this.type = 'vue';
    this.props = {
        name:'root',
        value:111,
        rootFunc (){
            console.log('我是根元素上的方法')
        }
    }
    this.children =[

    ]
}

let component1 = {
    type:'vue',
    props:{
        type:'component1',
        value:111,
        func (){
            console.log('我组件1上的方法')
        }
    },
    children:[],
}
let component2 = {
    type:'vue',
    props:{
        type:'component2',
        value:222,
        func (){
            console.log('我组件2上的方法')
        }
    },
    children:[],
    init(){
        eventBus.emit('handleClick',{message:'需要调用组件3的点击事件方法',value:111,})
    }
}

let component3 = {
    type:'vue',
    data:{
        type:'component',
        value:333,
    },
    clickFn ({message='',value = 0}){
        console.log('我组件3上的点击方法');
        console.log('传过来的mwssage是:'+ message + 'value是：'+value);
        this.data.value = this.data.value +value;
        console.log('更改当前本组件上的data中value后为'+ this.data.value)
    },
    init(){
        eventBus.addListener('handleClick',this.clickFn.bind(this))
    }
}


let VueRootObject = new Vue();
VueRootObject.children.push(component1);
VueRootObject.children.push(component2);
VueRootObject.children[0].children.push(component3);

VueRootObject.children[0].children[0].init()//注册
VueRootObject.children[1].init()//触发



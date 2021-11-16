class Person{
    constructor(name) {
        this.name = name;
    }
    speak(){
        console.log('my name is '+this.name)
    }
}

class Chinese extends Person{
    constructor(name) {
        super(name);
        super.speak();
        this.isChinese = true;
    }
    speak(){
        console.log('我的名字是' + this.name)
    }
    static isType(){
        console.log('执行了isType')
        return 'Chinese'
    }
}
var yangchaolin = new Chinese('杨超林');
console.log(yangchaolin)
yangchaolin.speak();
Chinese.isType()

let app = { name:'obj',speak(){console.log('1111')}}
let app1 = Object.create(app);
console.log(app1)
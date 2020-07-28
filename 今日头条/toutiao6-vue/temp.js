let target = {
	value:42,
	name:'target'
};
let proxy = new Proxy(target,{
	has(tarpTarget,key){
		return Reflect.has(tarpTarget,key);
	}
})
console.log('value1' in proxy)

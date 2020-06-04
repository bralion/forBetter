/**
* @Description:
* @author Yangchaolin
* @date 2020/6/4
*/
export default class Components {
	constructor (props){
		this.props = props;
	}
	
	render(){
		return '<div>我是基类请不要直接使用</div>'
	}
	
	constructElement(){
		const html = this.render();
		const $content = document.createElement('div');
		$content.innerHTML = html;
		this.el = $content;
		return this.el
	}
}

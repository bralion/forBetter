/**
* @Description:
* @author Yangchaolin
* @date 2020/6/4
*/
export default class Components {
	constructor (props){
		this.props = props;
	}
	
	/**
	 * 渲染函数 子类请自行改写
	 * @return {string}
	 */
	render(){
		return '<div>我是基类请不要直接使用</div>'
	}
	
	/**
	 * 生成dom
	 * @return {HTMLDivElement | *}
	 */
	constructElement(){
		const html = this.render();
		const $content = document.createElement('div');
		const $container = document.createElement('div');
		$container.appendChild($content);
		$content.outerHTML = html;
		this.el = $container.firstChild;
		return this.el
	}
}

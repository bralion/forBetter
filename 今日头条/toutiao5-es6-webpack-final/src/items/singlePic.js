import Components from './component'
export default class SinglePic extends Components{
	constructor (props){
		super(props)
	}
	render(){
		return `<div class="item single-pic">
			<div class="content">
			<sapn on:click="clicking">
			${this.props.title}
			</sapn>
			</div>
			<img src="${this.props.imageList[0]}" />
			</div>`
	}
}

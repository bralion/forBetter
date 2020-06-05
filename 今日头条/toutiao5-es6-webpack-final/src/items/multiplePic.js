import Components from './component'
export default class MultiplePic extends Components{
	constructor (props){
		super(props)
	}
	render(){
		var imageList = this.props.imageList.map(image => {
			return `<img src=${image} />`;
		}).join('');
		return `<div class="item multiple-image" on:click="aa">
                                <h3>
                                    ${this.props.title}
                                </h3>
                                <div class="image-list">
                                    ${imageList}
                                </div>
                            </div>`
	}
}

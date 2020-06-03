module.exports={
	singlePic: function (info) {
		return `<div class="item single-pic">
                                <div class="content">
                                    <sapn on:click="clicking">
                                        ${info.data.title}
                                    </sapn>
                                </div>
                                <img src="${info.data.imageList[0]}" />
                            </div>`
	},
	multiplePic: function (info) {
		var imageList = info.data.imageList.map(image => {
			return `<img src=${image} />`;
		}).join('');
		
		return `<div class="item multiple-image" on:click="aa">
                                <h3>
                                    ${info.data.title}
                                </h3>
                                <div class="image-list">
                                    ${imageList}
                                </div>
                            </div>`;
	}
};

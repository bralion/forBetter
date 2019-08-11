/**
 * yuanxin
 */

// (function () {
// 	// 准备资源 汪洋
	// const context = document.getElementById('content').getContext('2d');
	// const heroImg = new Image();

// 	// 画图 袁鑫
// 	heroImg.onload = function () {
// 		var imgPos = {
// 			x: 0,
// 			y: 0,
// 			width: 32,
// 			height: 32
// 		};

// 		var rect = {
// 			x: 0,
// 			y: 0,
// 			width: 40,
// 			height: 40
// 		};

// 		context
// 			.drawImage(
// 				heroImg,
// 				imgPos.x,
// 				imgPos.y,
// 				imgPos.width,
// 				imgPos.height,
// 				rect.x,
// 				rect.y,
// 				rect.width,
// 				rect.height
// 			);
// 	};

// 	heroImg.src = './hero.png';
// })();



(function () {
	// 我是汪洋老师
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}


	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg) {
		var isCover=function(obj1,obj2){
			let xCover=false,yCover=false;
			if(obj2.x<=obj1.x&&obj1.x<(obj2.x+obj2.width)||obj2.x<(obj1.x+obj1.width)&&(obj1.x+obj1.width)<(obj2.x+obj2.width)){//x轴有重叠
				xCover=true
				console.log('xcover')
			}
			if(obj2.y<=obj1.y&&obj1.y<(obj2.y+obj2.height)||obj2.y<(obj1.y+obj1.height)&&(obj1.y+obj1.height)<(obj2.y+obj2.height)) {//y轴有重叠
				yCover=true
				console.log('ycover')
			}
			return xCover&&yCover
		}
		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}
		var move = function (e) {//传入键盘事件，对象移动
			if(e&&e.keyCode){
				switch(e.keyCode){
					case 38://向上
						if(hero.rect.y-10<0||isCover({...hero.rect,y:hero.rect.y-10},monster.rect)){
							break
						}
						hero.clear();
						hero.rect.y -= 10;
						hero.draw();
					break
					case 40://向下
						if(hero.rect.y+10>hero.context.canvas.height-hero.rect.height||isCover({...hero.rect,y:hero.rect.y+10},monster.rect)){
							break
						}
						hero.clear();
						hero.rect.y += 10;
						hero.draw();
					break
					case 37://向左
						if(hero.rect.x-10<0||isCover({...hero.rect,x:hero.rect.x-10},monster.rect)){
							break
						}
						hero.clear();
						hero.rect.x -= 10;
						hero.draw();
					break
					case 39://向右
						if(hero.rect.x+10>hero.context.canvas.width-hero.rect.width||isCover({...hero.rect,x:hero.rect.x+10},monster.rect)){
							break
						}
						hero.clear();
						hero.rect.x += 10;
						hero.draw();
					break
				}


			}
		}
		var clear = function () {//清除自身画布
			this.context.clearRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
		}

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},
			draw: draw,
			move,
			clear,
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},

			draw: draw
		};

		hero.draw();
		monster.draw();
		window.addEventListener('keyup',hero.move)
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();
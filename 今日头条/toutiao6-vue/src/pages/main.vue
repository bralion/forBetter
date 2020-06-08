<template>
    <div>
        <div v-if="dataList.length!=0" v-for="item in dataList">
            <multiple-pic :title="item.data.title" :imageList="item.data.imageList" v-if="item.type === 'multiplePic'"></multiple-pic>
            <single-pic :title="item.data.title" :imageList="item.data.imageList"  v-else></single-pic>
        </div>
    </div>
</template>

<script>
	import {request} from '../utils'
    import SinglePic from '../components/single-pic.vue'
    import MultiplePic from '../components/multiple-pic.vue'
	export default {
		name: "Main",
		components: {},
        components:{
	        SinglePic,MultiplePic
        },
		mounted () {
			this.init();
		},
		data () {
			return {
				dataList:[]
            }
		},
		methods: {
            init(){
				this.getData()
            },
			getData:function () {
				return request ({url:'http://localhost:8099/list',method:'post'}).then (res => {
					this.dataList = res.data;
				});
			},
		}
	}
</script>

<style scoped>

</style>

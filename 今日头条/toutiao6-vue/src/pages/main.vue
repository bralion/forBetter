<template>
    <div>
        <agriculture></agriculture>
        <div v-for="item in dataList">
            <multiple-pic v-bind="item.data" v-if="item.type === 'multiplePic'"></multiple-pic>
            <single-pic v-bind="item.data"  v-else></single-pic>
        </div>
    </div>
</template>

<script>
	import {request} from '../utils'
    import {SinglePic,MultiplePic,Agriculture} from '../components'
	export default {
		name: "Main",
		components: {},
        components:{
	        SinglePic,MultiplePic,Agriculture
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

<template>
    <div class="item multiple-image" v-on:click="aa">
        <h3>
            {{title}}
        </h3>
        <div class="image-list">
            <img v-for="item in imageList" :src="item" alt="">
        </div>
    </div>
</template>

<script>
	export default {
		name: "multiple-pic",
		components: {},
        props:{
	        title:'',
            imageList:{
		    	default:()=>[]
            }
        },
		mounted () {
			this.init ();
		},
		data () {
			return {}
		},
		methods: {
			init () {
			},
            aa(){
				
            }
		}
	}
</script>

<style scoped>

</style>

<template>
    <div class="item single-pic">
        <div class="content">
            <span v-on:click="clicking">
                {{title}}
            </span>
        </div>
        <img :src="imageList[0]" />
    </div>
</template>

<script>
	export default {
		name: "single-pic",
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
			clicking(){
				
            }
		}
	}
</script>

<style scoped>

</style>

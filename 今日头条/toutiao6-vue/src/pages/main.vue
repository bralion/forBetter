<template>
    <div v-on:click="changeName">{{ycl}}</div>
</template>

<script>
	export default {
		name: "Main",
		components: {},
		mounted () {
		},
		data () {
			return {
				ycl:'asda'
            }
		},
		methods: {
			changeName () {
				this.ycl='yangchaolin'
			}
		}
	}
</script>

<style scoped>

</style>

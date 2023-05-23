<template>
	<view>
		<liu-calendar @change="getDate" @checked="checkDate"></liu-calendar>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		//获取选中的月份
		getDate(e){
			console.log('选中的月份：'+e.value)
		},
		//获取选中的日期
		checkDate(e){
			console.log('选中的日期：'+e.value)
		}
	}
}
</script>

<style>

</style>

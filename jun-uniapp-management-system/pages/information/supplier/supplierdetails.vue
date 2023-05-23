<template>
	<view class="">
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.id" 
		 :options="options" :disabled="true">
			<view class="item u-border-bottom">
				<view class="title-wrap">
					<text class="title u-line-2">供应商ID：{{ item.id }}</text>
					<text class="title u-line-2">供应商编号：{{ item.code }}</text>
					<text class="title u-line-2">供应商名称：{{ item.name }}</text>
					<text class="title u-line-2">联系人：{{ item.contact }}</text>
					<text class="title u-line-2">联系方式：{{ item.phone }}</text>
					<text class="title u-line-2">账期(天)：{{ item.term }}</text>
					<text class="title u-line-2">座机：{{ item.mobile }}</text>
					<text class="title u-line-2">区域：{{ item.city }}</text>
					<text class="title u-line-2">详细位置：{{ item.address }}</text>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				unitlist:[],
				show: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				id:null,
				value: '',
				type: 'text',
				border: true
			}
		},
		onLoad(e) {
			_this = this;
			_this.getUnitList(e.id);
		},
		methods: {
			getUnitList(id) {
				console.log(id);
				_this._post_form('/api/ykjp/information/basisinfo/supplier/getdetails', {id}, (result) => {
					_this.setData({'unitlist' : result.data.data})
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.item {
		display: inherit;
		padding: 20rpx;
	}
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.title-wrap{
		display: inline-block;
	}
</style>

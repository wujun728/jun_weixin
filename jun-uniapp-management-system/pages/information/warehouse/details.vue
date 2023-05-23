<template>
	<view class="">
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.ID" 
		 :options="options" :disabled="true">
			<view class="item u-border-bottom">
				<view class="title-wrap">
					<text class="title u-line-2">仓库ID：{{ item.ID }}</text>
					<text class="title u-line-2">仓库编号：{{ item.number }}</text>
					<text class="title u-line-2">仓库名称：{{ item.name }}</text>
					<text class="title u-line-2">仓库库存：{{ item.inventory }}</text>
					<text class="title u-line-2">联系人：{{ item.linkman }}</text>
					<text class="title u-line-2">联系方式：{{ item.phone }}</text>
					<text class="title u-line-2">仓库类型：{{ item.type }}</text>
					<text class="title u-line-2">区域：{{ item.city }}</text>
					<text class="title u-line-2">详细地址：{{ item.address }}</text>
					<text class="title u-line-2">备注：{{ item.remark }}</text>
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
				_this._post_form('/api/ykjp/information/basisinfo/warehouse/getdetails', {id}, (result) => {
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

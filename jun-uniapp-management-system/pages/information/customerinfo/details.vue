<template>
	<view class="">
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.ID" 
		 :options="options" :disabled="true">
			<view class="item u-border-bottom">
				<view class="title-wrap">
					<text class="title u-line-2">客户ID：{{ item.id }}</text>
					<text class="title u-line-2">客户编号：{{ item.code }}</text>
					<text class="title u-line-2">客户名称：{{ item.name }}</text>
					<text class="title u-line-2">客户等级：{{ item.level }}</text>
					<text class="title u-line-2">联系人：{{ item.contact }}</text>
					<text class="title u-line-2">联系方式：{{ item.phone }}</text>
					<text class="title u-line-2">公司电话：{{ item.telephone }}</text>
					<text class="title u-line-2">账期(天)：{{ item.period }}</text>
					<text class="title u-line-2">状态：{{ item.status }}</text>
					<text class="title u-line-2">所属区域：{{ item.city }}</text>
					<text class="title u-line-2">详细地址：{{ item.address }}</text>
					<text class="title u-line-2">说明：{{ item.description }}</text>
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
				_this._post_form('/api/ykjp/information/basisinfo/customerinfo/getdetails', {id}, (result) => {
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

<template>
	<view class="">
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="供应商"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<text @tap="onNavigationBar">发布</text>
				</view>
			</view>
		</u-navbar>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.id" @click="click" @open="open"
		 :options="options" >
			<view class="item u-border-bottom" @tap="contentclick(item.id)">
				<view class="title-wrap">
					<text class="title u-line-2">供应商编号：{{ item.code }}</text>
					<text class="title u-line-2">供应商名称：{{ item.name }}</text>
					<text class="title u-line-2">联系人：{{ item.contact }}</text>
					<text class="title u-line-2">联系方式：{{ item.phone }}</text>
					<text class="title u-line-2">账期(天)：{{ item.term }}</text>
				</view>
			</view>
		</u-swipe-action>
		<u-modal v-model="show" content="是否删除该供应商信息？" :show-cancel-button = "true" @confirm="confirm"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
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
		onLoad() {
			_this = this;
			_this.getUnitList();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'addsupplier'
			})
		},
		methods: {
			onNavigationBar(){
				uni.navigateTo({
					url:'addsupplier'
				})
			},
			getUnitList() {
				_this._post_form('/api/ykjp/information/basisinfo/supplier/index', {}, (result) => {
					_this.setData({'unitlist' : result.data.data})
				});
			},
			click(index, index1) {
				_this.show = true;
				_this.id = this.unitlist[index].id;
			},
			open(index) {
				this.unitlist[index].show = true;
			},
			confirm(){
				_this._post_form('/api/ykjp/information/basisinfo/supplier/deleteProduct', {
					id:_this.id
				}, (result) => {
					_this.getUnitList()
				});
			},
			contentclick(e){
				uni.navigateTo({
					url:'supplierdetails?id=' + e
				})
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
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>

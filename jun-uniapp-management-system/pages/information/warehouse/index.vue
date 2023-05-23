<template>
	<view class="">
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="仓库信息"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<text @tap="onNavigationBar">添加</text>
				</view>
			</view>
		</u-navbar>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.ID" @click="click" @open="open"
		 :options="options" >
			<view class="item u-border-bottom" @tap="contentclick(item.ID)">
				<view class="title-wrap">
					<text class="title u-line-2">仓库编号：{{ item.number }}</text>
					<text class="title u-line-2">仓库名称：{{ item.name }}</text>
					<text class="title u-line-2">仓库库存：{{ item.inventory }}</text>
					<text class="title u-line-2">联系人：{{ item.linkman }}</text>
					<text class="title u-line-2">联系方式：{{ item.phone }}</text>
					<text class="title u-line-2">仓库类型：{{ item.type }}</text>
				</view>
			</view>
		</u-swipe-action>
		<u-modal v-model="show" content="是否删除该信息？" :show-cancel-button = "true" @confirm="confirm"></u-modal>
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
				list:[],
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
			_this.getlist();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'add'
			})
			
		},
		methods: {
			onNavigationBar(){
				uni.navigateTo({
					url:'add'
				})
			},
			getlist() {
				_this._post_form('/api/ykjp/information/basisinfo/warehouse/index', {}, (result) => {
					_this.setData({'list' : result.data.data})
				});
			},
			click(index, index1) {
				_this.show = true;
				_this.id = this.list[index].ID;
			},
			open(index) {
				this.list[index].show = true;
			},
			confirm(){
				_this._post_form('/api/ykjp/information/basisinfo/warehouse/deleteProduct', {
					id:_this.id
				}, (result) => {
					_this.getlist()
				});
			},
			contentclick(e){
				uni.navigateTo({
					url:'details?id=' + e
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

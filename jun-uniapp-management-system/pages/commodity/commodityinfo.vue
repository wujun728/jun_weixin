<template>
	<view class="wrap">
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="商品信息"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<text @tap="onNavigationBar">发布</text>
				</view>
			</view>
		</u-navbar>
		<u-section class="mt20 mb12" title="商品" :right="false" :show-line="true"></u-section>
		<view class="mt4" v-for="(item, index) in commodityList" :key="item.id">
			<u-card :title="item.name" :sub-title="item.time" :thumb="item.image" margin='0rpx' >
				<view class="" slot="body">
					<view class="title-wrap">
						<text class="title u-line-2">商品ID：{{ item.id }}</text>
						<text class="title u-line-2">商品名称：{{ item.name }}</text>
						<text class="title u-line-2">sku：{{ item.sku }}</text>
						<text class="title u-line-2">规格：{{ item.specification }}</text>
						<text class="title u-line-2">库存：{{item.inventory}}{{ item.unit }}</text>
					</view>
				</view>
				<view class="" slot="foot">
					<u-row gutter="16" justify="flex-end">
						<u-col span="3">
				<u-icon name="close-circle-fill" size="34" color="#ec3304" label="删除" label-color="#ec3304" @click="click(index)"></u-icon>
						</u-col>
					</u-row>
				</view>
			</u-card>
		</view>
		<u-modal v-model="show" content="是否删除该商品信息？" :show-cancel-button = "true" @confirm="confirm"></u-modal>
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
				commodityList:[],
				show: false,
				id:null,
				value: '',
				type: 'text',
				border: true
			}
		},
		onLoad() {
			_this = this;
			_this.getcommodityList();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'addcommodity'
			})
		},
		methods: {
			onNavigationBar(){
				uni.navigateTo({
					url:'addcommodity'
				})
			},
			getcommodityList() {
				this.commodityList = [];
				_this._post_form('/api/ykjp/product/product/getProduct', {}, (result) => {
					for (let i = 0;i<result.data.data.length;i++) {
						if(!result.data.data[i].time){
							result.data.data[i].time = _this.transformTime(result.data.data[i].updatetime);
						}
					}
					_this.setData({'commodityList' : result.data.data})
				});
			},
			click(index) {
				_this.show = true;
				_this.id = this.commodityList[index].id;
			},
			open(index) {
				this.commodityList[index].show = true;
			},
			confirm(){
				_this._post_form('/api/ykjp/product/product/deleteProduct', {
					id:_this.id
				}, (result) => {
					_this.getcommodityList()
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
	image {
			width: 120rpx;
			flex: 0 0 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
	.u-popup{
		padding: 15px;
		.text{
			color: #797373;
		    margin: auto;
		    text-align: center;
		    padding: 10px 0;
		}
	}
	.title-wrap{
		display: inline-block;
	}
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
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

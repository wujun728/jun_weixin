<template>
	<!-- 添加已录商品 -->
	<view class="wrap-backbg">
		<u-section class="mt20 mb12 ml16" title="选择商品" :right="false" :show-line="true"></u-section>
		<!-- <view class="mt4" v-for="(item, index) in commodityList" :key="item.id">
			<u-card :title="item.name" :sub-title="item.time" :thumb="item.image" margin='0rpx'>
				<view class="" slot="body">
					<view class="title-wrap">
						<text class="title u-line-2">商品ID：{{ item.id }}</text>
						<text class="title u-line-2">商品名称：{{ item.name }}</text>
						<text class="title u-line-2">sku：{{ item.sku }}</text>
						<text class="title u-line-2">规格：{{ item.specification }}</text>
						<text class="title u-line-2">单位：{{ item.unit }}</text>
					</view>
				</view>
				<view slot="foot">
					<u-row gutter="16" justify="flex-end">
						<u-col span="3">
							<u-checkbox v-model="item.checked" size="20rpx">选择</u-checkbox>
						</u-col>
						<u-col span="3">
							<u-icon class="mr12" name="plus-circle-fill" size="34" color="#225fec" label="确认" label-color="#225fec" @click="onAddOrder"></u-icon>
						</u-col>
					</u-row>
				</view>
			</u-card>
			
		</view> -->
		
		<view class="page-box">
			<view class="order" v-for="(res, index) in commodityList" :key="res.id">
				<!-- <view class="top">
					<view class="left">
						<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
						<view class="store">{{ res.store }}</view>
						<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
					</view>
					<view class="right">{{ res.deal }}</view>
				</view> -->
				<view class="item">
					<view class="left"><image :src="res.image" mode="aspectFill"></image></view>
					<view class="content">
						<view class="title u-line-2">{{ res.name }}</view>
						<view class="type">商品id:{{res.id}}</view>
						<view class="type">商品规格:{{res.specification}}</view>
						<view class="delivery-time">库存: {{ res.inventory }}{{res.unit}}</view>
					</view>
					<!-- <view class="right">
						<view class="price">
							￥
							<text class="decimal">.sdfsdf</text>
						</view>
						<view class="number">x{{ res.number }}</view>
					</view> -->
				</view>
				<!-- <view class="total">
					共件商品 合计:
					<text class="total-price">
						￥.
						<text class="decimal">333333333333</text>
					</text>
				</view> -->
				<view class="bottom">
					<!-- <view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
					<view class="logistics btn">查看物流</view>
					<view class="exchange btn">卖了换钱</view> -->
					<u-checkbox class="exchange" v-model="res.checked" size="20rpx" shape="circle" active-color="#2fc25b">选择</u-checkbox>
					<view class="evaluate btn" @click="onAddOrder">确认</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				/* 卡片 订单列表 */
				commodityList: []
			}

		},
		onLoad() {
			_this = this;
			_this.getCommodityList()
			uni.removeStorageSync('commodityList')
		},
		methods: {
			getCommodityList() {
				_this._post_form('/api/ykjp/product/product/getProduct', {}, (result) => {
					for (let i = 0; i < result.data.data.length; i++) {
						if (!result.data.data[i].time) {
							result.data.data[i].checked = false
							result.data.data[i].money = '1'
							result.data.data[i].num = '1'
							
							result.data.data[i].time = _this.transformTime(result.data.data[i].updatetime);
						}
					}
					_this.setData({
						'commodityList': result.data.data
					})
				});
			},
			onAddOrder(){
				var v = []
				for (let i = 0; i < _this.commodityList.length; i++) {
					if (_this.commodityList[i].checked) {
						v.push(_this.commodityList[i])
					}
				}
				if (v.length <1) {
					return _this.$refs.uToast.show({
						title: '请选择一个商品',
						type: 'default'
					})
				}
				uni.setStorageSync('commodityList',v);
				
				uni.navigateBack()
			}
		}
	}
</script>


<style scoped lang="scss">
	.title-wrap {
		display: inline-block;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.wrap-backbg {
		// padding: 30rpx;
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
</style>

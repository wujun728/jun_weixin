<template>
	<!-- 添加已录商品 -->
	<view class="wrap">
		<u-section class="mt20 mb12" title="选择商品" :right="false" :show-line="true"></u-section>
		<view class="mt4" v-for="(item, index) in commodityList" :key="item.id">
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

	.wrap {
		padding: 24rpx;
	}

</style>

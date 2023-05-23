<template>
	<view>
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="商品分类"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<text @tap="onNavigationBar">发布</text>
				</view>
			</view>
		</u-navbar>
		<view class="content">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.id" @click="click" @open="open"
			 :options="options">
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.image" />
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.name }}</text>
					</view>
				</view>
			</u-swipe-action>
			<u-modal v-model="show" content="是否删除该商品类型？" :show-cancel-button = "true" @confirm="confirm"></u-modal>
			<u-toast ref="uToast" />
		</view>
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
				url:'addtype'
			})
		},
		methods: {
			onNavigationBar(){
				uni.navigateTo({
					url:'addtype'
				})
			},
			getUnitList() {
				_this._post_form('/api/ykjp/product/type/getType', {}, (result) => {
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
				_this._post_form('/api/ykjp/product/type/deleteType', {
					id:_this.id
				}, (result) => {
					_this.getUnitList()
				});
			},
			onSure(){
				this.showAdd = false
				if (_this.value.length<=0) {
					this.$refs.uToast.show({
						title: '参数有误！',
						type: 'error'
					})
					return
				}
				_this._post_form('/api/ykjp/product/unit/addUnit', {
					name:_this.value
				}, (result) => {
					_this.getUnitList()
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
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
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
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

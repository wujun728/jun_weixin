<template>
	<view>
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="商品单位"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<text @tap="onNavigationBar">发布</text>
				</view>
			</view>
		</u-navbar>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in unitlist" :key="item.id" @click="click" @open="open"
		 :options="options">
			<view class="item u-border-bottom">
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.name }}</text>
				</view>
			</view>
		</u-swipe-action>
		<u-modal v-model="show" content="是否删除该单位？" :show-cancel-button = "true" @confirm="confirm"></u-modal>
		<u-popup v-model="showAdd" mode="center" length="60%">
			<view class="u-popup">
				<view class="text">
					<text >请输入单位</text>
				</view>
				<u-input v-model="value" :type="type" :border="border" />
				<view class="mt20">
					<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="onSure">确认</u-button>
				</view>
			</view>
		</u-popup>
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
				showAdd:false,
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
			this.showAdd = true
		},
		methods: {
			onNavigationBar(){
				this.showAdd = true
			},
			getUnitList() {
				_this._post_form('/api/ykjp/product/unit/getUnitList', {}, (result) => {
					_this.setData({
						'unitlist' : result.data.data
					})
				});
			},
			click(index, index1) {
				_this.show = true;
				_this.id = this.unitlist[index].id;
			},
			open(index) {
				this.unitlist[index].show = true;
				this.unitlist.map((val, idx) => {
					if (index != idx) this.unitlist[idx].show = false;
				})
			},
			confirm(){
				_this._post_form('/api/ykjp/product/unit/deleteUnit', {
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
<style lang="scss" scoped>
	.item {
		display: inherit;
		padding: 20rpx;
	}
	.title {
		text-align: right;
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

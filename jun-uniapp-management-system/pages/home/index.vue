<template>
	<view class="content" v-if="data">
		<u-navbar :is-back="false" back-icon-color="#fff" :background="background" back-text="首页"
			title="首页"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
		</u-navbar>
		<u-swiper :list="data.bannerlist" :effect3d="true" :height="300"></u-swiper>
		<view class="m_top25" v-for="(listitem, index) in data.menus" :key="index" >
			<u-section  :title="listitem.title" :right="false" :show-line="true"></u-section>
			<view class="white m_top5">
				<u-grid :col="3" :border="false">
					<u-grid-item v-for="(item, idx) in listitem.info" :key="idx" @tap="onClick(item.url?item.url:null)">
						<image class="u-grid-item-img" :src="item.src"></image>
						<view class="grid-text">{{item.title}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="m_top25">
			<u-section  title="相关小程序" :right="false" :show-line="true"></u-section>
			<view class="white m_top5">
				<u-grid :col="3" :border="false">
					<u-grid-item  @tap="onClickMp()">
						<image class="u-grid-item-img" src="../../static/images/200.png"></image>
						<view class="grid-text">爱上小工具</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- #endif -->
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
				 list1: [
				                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				                ],
				data:null
			}
		},
		onLoad() {
			_this = this;
			_this.getmenus();
		},
		methods: {
			onClick(url){
				if (url) {
					uni.navigateTo({
						url:url
					})
				}
			},
			getmenus(){
				_this._post_form('api/index/getmenus', {}, (result) => {
					_this.data = result.data
				});
			},
			onClickMp(){
				// #ifndef MP
				return;
				 // #endif
				uni.navigateToMiniProgram({
				  appId: 'wxe604ef58ff7c65b1',
				  path: 'pages/index/index'
				})
			},
			/**
			 * 分享当前页面
			 */
			onShareAppMessage: function() {
				return {
					title: '我发现了一个超好用的进销存管理系统',
					path: "/pages/login/index"
				};
			},
			/**
			 * 分享到朋友圈
			 * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
			 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
			 */
			onShareTimeline() {
				return {
					title: '我发现了一个超好用的进销存管理系统',
					path: "/pages/login/index"
				};
			},
		}
	}
</script>
<style>
	.content {
		padding: 10px 10px;
	}
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	.m_top15 {
		margin-top: 15px;
	}
	.m_top25 {
		margin-top: 25px;
	}
	.m_top5 {
		margin-top: 5px;
	}
	.u-grid-item-img {
		margin: 0 auto;
		display: block;
		padding: 5px 0;
		width: 28px;
		height: 28px;
	}
</style>

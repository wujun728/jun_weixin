<template>
	<view class="about">
		<view class="content">
      <!--#ifndef MP-TOUTIAO-->
			<view class="qrcode">
				<image src="https://erp2.xiaowo6.cn/assets/img/gzh.jpg" @longtap="save"></image>
				<text class="tip">关注公众号</text>
			</view>
      <!--#endif-->
			<view class="desc">
				<text class="code">本产品</text>
				是一个基于 <text class="code">uni-app</text> 开发跨平台应用的<text class="code">高性能进销存工具</text>。
			</view>
<!-- 			<view class="source">
				<view class="title">本示例源码获取方式：</view>
				<view class="source-list">
					<view class="source-cell">
						<text space="nbsp">1. </text>
						<text>下载 HBuilderX，新建 uni-app 项目时选择 <text class="code">uCharts</text> 模板。</text>
					</view>
					<view class="source-cell">
						<text space="nbsp">2. </text><text @click="openLink" class="link">{{sourceLink}}</text>
					</view>
				</view>
			</view> -->
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="version">
			当前版本：{{version}}
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				version: '',
				sourceLink: 'https://www.ucharts.cn'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			return;
			uni.getProvider({
				service: 'share',
				success: (result) => {
					const data = [];
					for (let i = 0; i < result.provider.length; i++) {
						switch (result.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (error) => {
					console.log('获取登录通道失败' + JSON.stringify(error));
				}
			});
		// #endif
		},
		methods: {
			// #ifdef APP-PLUS
			save() {
				uni.showActionSheet({
					itemList: ['保存图片到相册'],
					success: () => {
						plus.gallery.save('../../static/images/qrcode.png', function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						}, function() {
							uni.showToast({
								title: '保存失败，请重试！',
								icon: 'none'
							});
						});
					}
				});
			},
			
			// #endif
			openLink() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.sourceLink);
				// #endif
				// #ifdef H5
				window.open(this.sourceLink);
				// #endif
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #f4f5f6;
	}

	image {
		width: 360upx;
		height: 360upx;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.qrcode .tip {
		margin-top: 20upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f4f5f6;
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}

	.version {
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}

	.source {
		margin-top: 30upx;
		flex-direction: column;
	}

	.source-list {
		flex-direction: column;
	}

	.link {
		color: #007AFF;
	}
</style>

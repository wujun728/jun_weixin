<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? userInfo.avatar:''"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? userInfo.nickname : '您未登录'}}</text>
				<text class="uni-panel-icon uni-icon" v-if="!login">&#xe581;</text>
			</view>
		</view>
		
		<!-- /* 
		 *Copyright© 2016-2021 星游源码 版权所有
		 * 购买地址 https://www.huzhan.com/code/goods403940.html
		 */ -->
		
		<u-cell-group class="m_top20">
			<u-cell-item icon="account-fill" color='#22c1a9' title="帐号管理" @click="gourl('account')"></u-cell-item>
			<u-cell-item icon="chat-fill" color='#f3e5e9' title="新消息通知" @click="gourl('message')"></u-cell-item>
			<u-cell-item icon="question-circle-fill" color='#aaaaff' title="问题反馈" @click="gourl('feedback')"></u-cell-item>
			<u-cell-item icon="zhuanfa" color='#aa557f' title="服务条款及协议" @click="gourl('service')"></u-cell-item>
			<u-cell-item icon="error-circle-fill" color='#dc6a19' title="关于应用" @click="gourl('about')"></u-cell-item>
			<!-- #ifndef MP-WEIXIN -->
			<view v-if="userInfo.username == 'admin'">
				<u-cell-item icon="account-fill" color='#358bc1' title="注册新用户" @click="gourl('../login/register')"></u-cell-item>
			</view>
			<!-- #endif -->
			
		</u-cell-group>
		
		<u-cell-group class="m_top20">
		<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" class="white btn">
				<u-cell-item icon="weixin-fill" color='#189f33' title="在线客服"></u-cell-item>
			</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
			<u-cell-item icon="qq-fill" color='#189f33' title="在线客服" @click="onChat()"></u-cell-item>
			<u-cell-item icon="rmb-circle-fill" color='#9720dc' title="去购买" @click="onClickUrl()"></u-cell-item>
		<!-- #endif -->
		</u-cell-group>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				userInfo: {}
			}
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo');
			if (userinfo) {
				this.login=true;
			}
			this.getUserDetail()
		},
		methods: {
			getUserDetail() {
				var _this = this;
				_this._post_form('api/user/getUserDetail', {}, function(result) {
					_this.setData({
						userInfo:result.data
					})
				});
			},
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			gourl(url){
				if (this.login) {
					uni.navigateTo({
						url: url
					});
				}else{
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			// <!-- /* 
			//  *Copyright© 2016-2021 星游源码 版权所有
			//  * 购买地址 https://www.huzhan.com/code/goods403940.html
			//  */ -->
			onChat(){
				plus.runtime.openURL('mqqwpa://im/chat?chat_type=crm&uin=2903475819',
					function(res) {
						plus.nativeUI.alert("本机没有安装QQ，无法启动");
					});
			},
			onClickUrl(){
				this.openBrowser('https://www.huzhan.com/code/goods403940.html');
			},
			/* 打开外部浏览器 */
			openBrowser(url) {
				// #ifdef MP-WEIXIN
				this.setClipboardData(url)
				return;
				// #endif
			
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				return;
				// #endif
			
				// #ifdef H5
				window.location.href = url;
				return;
				// #endif
			},
			/* 设置系统剪贴板的内容 */
			setClipboardData(str){
				// #ifdef H5
				return;
				// #endif
				uni.setClipboardData({
				    data: str,
				    success: function () {
						uni.showToast({
							title: '已成功复制到剪贴板',
							duration: 2000
						})
				    }
				});
			},
		}
	}
</script>

<style>

	.m_top20{
		margin-top: 20px;
	}
	.center {
		flex-direction: column;
	}

	.logo {
		height: 120px;
		padding: 10px;
		background-color: #2fc25b;
		display: flex;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
		line-height: 75px;
	}
	
	.btn{
		position: initial;
		padding-left: 0px;
		padding-right: 0px;
	}


</style>
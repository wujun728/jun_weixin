<template>
	<view class="wrap">
		<view class="logo">齐兴移动APP</view>
		<div v-if="loginType === 'currentPhone'">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="onClickItem"></u-tabs>
		<view v-if="current === 0">
			<view class="list">
				<view class="list-call">
					<view class="iconfont icon-avatar" style="font-size: 22px;color:#5473e8;"></view>
					<input class="u-input" type="text" v-model="username" maxlength="32" :placeholder="$t('login.placeholderAccount')" value="admin"/>
					
				</view>
				<view class="list-call">
					<view class="iconfont icon-key" style="font-size: 22px;color:#5473e8;"></view>
					<input class="u-input" type="text" v-model="password" maxlength="32" :placeholder="$t('login.placeholderPassword')" :password="!showPassword" value="admin123" />
					<image class="u-icon-right" :src="'/static/Qixing/login/eye_' + (showPassword ? 'open' : 'close') + '.png'" @click="showPass()"></image>
				</view>
				<div style="padding:15rpx 0 0;">
					<view class="register">
						<navigator class="register-link" url="forget" open-type="navigate">{{$t('login.forget')}}</navigator>
						<!-- <navigator class="register-link" url="reg" open-type="navigate">{{$t('login.reg')}}</navigator> -->
					</view>
					<u-checkbox v-model="remember" active-color="#5473e8">{{$t('login.autoLogin')}}</u-checkbox>
				</div>
			</view>
			<view class="button"  @click="submit('1')"><text>登录</text></view>
			<view class="login-bottom-box">
				<u-divider> 更多登录方式 </u-divider>
				<view class="oauth2">
					<u-icon class="u-icon" size="100" color="#36c956" name="weixin-circle-fill" @click="wxLogin"></u-icon>
					<u-icon class="u-icon" size="100" color="#23a0f0" name="qq-circle-fill" @click="qqLogin"></u-icon>
				</view>
				<view class="copyright">
					登录即代表您已阅读并同意<u-link href="#">用户协议</u-link> 与 <u-link href="#">隐私政策</u-link>
				</view>
			</view>
		</view>
		<view v-if="current === 1">
			<view class="list">
				<view class="list-call" >
					<view class="iconfont icon-shouji" style="font-size: 22px;color:#5473e8;"></view>
					<u-field
						v-model="phoneNo"
						label="+86"
						placeholder="请填写手机号"
						style="width: 100%;"
						:border-bottom="false"
					>
					</u-field>
				</view>
				<div style="padding:25rpx 0 0;">
					还没有账号？<navigator class="reg-link" url="reg" open-type="navigate">{{$t('login.reg')}}</navigator>
				</div>
				
			</view>
			<view class="button"  @click="nextStep()"><text>下一步</text></view>
			<view class="login-bottom-box">
				<u-divider> 更多登录方式 </u-divider>
				<view class="oauth2">
					<u-icon class="u-icon" size="100" color="#36c956" name="weixin-circle-fill" @click="wxLogin"></u-icon>
					<u-icon class="u-icon" size="100" color="#23a0f0" name="qq-circle-fill" @click="qqLogin"></u-icon>
				</view>
				<view class="copyright">
					登录即代表您已阅读并同意<u-link href="#">用户协议</u-link> 与 <u-link href="#">隐私政策</u-link>
				</view>
			</view>
			
		</view>
		</div>
		
		<div v-if="loginType !== 'currentPhone'">
		<view class="currentPhone-box">
			<view class="number-text">185****7207</view>
			<view class="other-text">认证服务由中国移动提供。</view>
			<u-button type="primary" @click="submit('3')">本机号码一键登录</u-button>
			<u-button @click="qiehuanLogin()">其他登录方式</u-button>
		</view>
		<view class="login-bottom-box">
			<view class="copyright">
				登录即代表您已阅读并同意<u-link href="#">用户协议</u-link> 与 <u-link href="#">隐私政策</u-link>
			</view>
		</view>
		</div>
		
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://Qixing.vip All rights reserved.
 */
import base64 from '@/common/base64.js';
export default {
	data() {
		return {
			phoneNo:'',
			username: '',
			password: '',
			loginType: 'currentPhone', 
			showPassword: false,
			remember: true,
			isValidCodeLogin: false,
			validCode: '',
			imgValidCodeSrc: null,
			list: [{name: '用户名'}, {name: '手机号'}],
			current: 0,
			activeColor: '#007aff',
		};
	},
	onLoad() {
			// 首页首次登录后跳转
		this.$u.api.index({loginCheck: true}).then(res => {
			if (res.code == '200'){
				uni.reLaunch({
					url: '/pages/sys/msg/index'
				});
			}
		});
	},
	methods: {
		showPass() {
			this.showPassword = !this.showPassword;
		},
		qiehuanLogin(){
			this.loginType = 'other'
		},
		onClickItem(index) {
							this.current = index;
					},
		refreshImgValidCode(e) {
			if (this.vuex_token == '') {
				this.$u.api.index().then(res => {
					this.imgValidCodeSrc = this.vuex_config.baseUrl + '/validCode?__sid='
						+ res.sessionid + '&t=' + new Date().getTime();
				});
			} else {
				this.imgValidCodeSrc = this.vuex_config.baseUrl + '/validCode?__sid='
						+ this.vuex_token + '&t=' + new Date().getTime();
			}
			this.validCode = '';
		},
		nextStep(){
			
			console.log('22222222222');
			 //这里定义校验规则
			 let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
			 //校验手机号规则
		　　　//如果校验不通过会返回false，如果校验通过会返回true
			 if(reg.test(this.phoneNo)){
				console.log('正确格式的手机号');
			 }else{
				 this.$u.toast('请输入正确格式的手机号1！'+this.phoneNo);
				 return;
			 }
			 console.log('11111111111');
				 
			//验证码登录下一步
			uni.showLoading({
								title: '正在获取验证码',
								mask: true
							})
			this.$u.api.sendCode({
				phoneNo: this.phoneNo,
				validCodeType:'2'
			})
			.then(res => {
				if (res.code == '200') {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/sys/login/code?phoneNo='+this.phoneNo
						});
					}, 500);
				}else{
					this.$u.toast(res.msg);
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/sys/login/code?phoneNo='+this.phoneNo
						});
					}, 500);
				}
			});
		},
		submit(loginType) {
			if (this.username.length == 0) {
				this.$u.toast('请输入账号');
				return;
			}
			if (this.password.length == 0) {
				this.$u.toast('请输入密码');
				return;
			}
			this.$u.api.login({
				username: this.username,
				password: this.password,
				validCode: this.validCode,
				loginType: loginType
			})
			.then(res => {
				/* setTimeout(() => {
					uni.reLaunch({
						url: '/pages/sys/msg/index'
					});
				}, 500); */
				if(res.msg){
					this.$u.toast(res.msg);
				}
				if (res.code == '200') {
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/sys/msg/index'
						});
					}, 500);
				}
				if (res.isValidCodeLogin){
					this.isValidCodeLogin = true;
					this.refreshImgValidCode();
				}
			});
		},
		wxLogin(res) {
			this.$u.toast('微信登录');
			this.weixinLogin();
		},
		qqLogin() {
			this.$u.toast('QQ 登录');
			this.weixinLogin();
		},
		
			getUserInfo() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						lang: 'zh_CN',
						desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
						success: (res) => {
							console.log(res, 'resss')
							resolve(res.userInfo)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
					
			getLogin() {
				return new Promise((resolve, reject) => {
					uni.login({
						success(res) {
							console.log(res, 'res')
							resolve(res)
						},
						fail: (err) => {
							console.log(err, 'logoer')
							reject(err)
						}
					})
				})
			},
		 
		   weixinLogin() {
				let that = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
					   //支持微信、qq和微博等
					   if (~res.provider.indexOf('weixin')) {
							console.log(res, 'ress')
							let userInfo = that.getUserInfo();
							let loginRes = that.getLogin();
							Promise.all([userInfo, loginRes]).then((result) =>{
								let userInfo = result[0];
								let loginRes = result[1];
								let access_token = loginRes.authResult.access_token;
								let openid = loginRes.authResult.openid;
								let data = Object.assign(loginRes.authResult, userInfo);
								that.$store.dispatch('Login', {
										type: 'weixin',
										url: that.url,
										data
								}).then(r => {
										if (r == 'ok') {
											uni.hideLoading()
										}
										}).catch(err => {
											uni.hideLoading();
											uni.showToast({
											icon: 'none',
											title: err
										})
									})
								})
		 
								}
							},
				   fail: function(err) {
						uni.hideLoading();
						uni.showToast({
						icon: 'none',
						title: err
						})
					}
			})
		}
		
	}
};
</script>
<style lang="scss">
@import 'index.scss';

.logo {
	width: 80%;
	font-size:64rpx;
	color: #5473e8;
	margin: 80rpx auto 80rpx auto;
}
.list-call-icon{
	color: #ff0000;
}
.currentPhone-box{
	text-align: center;
	padding: 40rpx 80rpx;
	.number-text{
		color: #000000;
		font-size: 60rpx;
	}
	.other-text{
		color: #999999;
		font-size: 26rpx;
		padding: 20rpx 0;
	}
	.u-btn{
		margin: 30rpx auto;
	}
	.u-hairline-border{
	    border: 1px solid #fff;
	}
}

.register {
	display:inline-block;
	color: #5473e8;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	float:right;
	margin-top: 6rpx;
}
.register-link{
	float: right;
	padding: 0 16rpx;
}
.reg-link{
	display: inline-block;
	color: #5473e8;
}
.oauth2 {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 0rpx 100rpx 30rpx;

	image {
		height: 80rpx;
		width: 80rpx;
	}
}
.u-tabs{
	padding: 0 70rpx;
}

</style>

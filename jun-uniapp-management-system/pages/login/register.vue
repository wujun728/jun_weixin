<template>
	<view class="force-login-wrap">
		<image class="logo-bg" src="../../static/images/logo_bg.png" mode="aspectFill"></image>
		<view class="force-login__content y-f">
			<image class="user-avatar" :src="systeminfo?systeminfo.images:''" mode="aspectFill"></image>
			<text class="user-name">{{systeminfo?systeminfo.name:''}}</text>
			<!-- <view class="login-notice">注册新用户</view> -->

			<view class="login-boxs">
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition"
				 label="账 号" prop="phone" >
					<u-input :border="border" placeholder="请输入账号" v-model="username" type="text"> </u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="密码" prop="password">
					<u-input :password-icon="true" :border="border" type="password" v-model="password" placeholder="请输入密码"></u-input>
				</u-form-item>
				
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition"
				 label="邮 箱" prop="phone" >
					<u-input :border="border" placeholder="请输入邮箱" v-model="email" type="text"> </u-input>
				</u-form-item>
					
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition"
				 label="手机" prop="phone" >
					<u-input :border="border" placeholder="请输入手机号" v-model="mobile" type="text"> </u-input>
				</u-form-item>
			</view>
			

			<button class="cu-btn author-btn" @tap="loginUp()">注 册</button>
			<button class="cu-btn close-btn" @tap="onClickBack">暂不注册</button>

			<view class="otherLoginWays">
				<view class="otherWayTextWrapper">
					<view class="otherWayText">{{systeminfo?systeminfo.beian:''}}</view>
				</view>
				<view class="icons">
					<slot name="otherLoginWays_icons">
						<!-- <img class="icon" src="https://dian.360cm.net/assets/img/wx.png" @tap="wxlogin()"> -->
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '', //用户/电话
				password: '', //密码
				email:'',
				mobile:'',
				
				
				labelPosition: 'left',
				border: false,
				systeminfo:null,
			}
		},
		onLoad() {
			var _this = this;
			this.getsysteminfo();
		},
		methods: {
			getsysteminfo(){
				var _that = this
				//这里请求接口
				_that._post_form('api/index/getsysteminfo', {}, (result) => {
						_that.systeminfo = result.data;
				});
			},
			// 点击登录
			loginUp() {
				var _that = this
				if (_that.username.length < 5 ||  _that.username.length > 8) {
					return uni.showToast({
						title: '用户名为5到8位',
						icon: 'none',
						duration: 1000
					});
				}
				if (_that.password.length < 5 ||  _that.password.length > 8) {
					return uni.showToast({
						title: '密码为5到8位',
						icon: 'none',
						duration: 1000
					});
				}
				if (this.$u.test.email(_that.email) && this.$u.test.mobile(_that.mobile)) {
					_that.loginSever(_that.username, _that.password,_that.email,_that.mobile)
				}
			},
			loginSever(account, password,email,mobile) {
				console.log(account, password,email,mobile);
				
				var _that = this
				//这里请求接口
				_that._post_form('api/user/register', {
					username: account,
					password: password,
					email:email,
					mobile:mobile
				}, (result) => {
					//发送反馈
					_that.showError('账号注册成功！',(res)=>{
						_that.onClickBack()
					})
				});
			},
			onClickBack(){
				uni.navigateBack()
			}

		}
	}
</script>

<style lscoped lang="scss">
	page {
		background: linear-gradient(180deg, rgba(239, 196, 128, 1) 0%, rgba(248, 220, 165, 1) 25%, rgba(255, 255, 255, 1) 98%);
	}

	.force-login-wrap {
		position: fixed;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		top: 0;

		.logo-bg {
			width: 640rpx;
			height: 300rpx;
			position: absolute;
		}

		.lanbg {
			position: relative;
			padding: 15px;
			margin-top: 30px;

			.lan-text {
				margin-left: 5px;
				color: #523e1f;
				height: 22px;
				line-height: 22px;
				position: absolute;
			}
		}

		.y-f {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.force-login__content {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			.user-avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 40rpx;
			}

			.user-name {
				font-size: 35rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(132, 87, 8, 1);
				margin-bottom: 30rpx;
			}

			.login-notice {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(200, 150, 61, 1);
				line-height: 44rpx;
				width: 400rpx;
				text-align: center;
				margin-bottom: 80rpx;
			}

			.author-btn {
				width: 630rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
				border-radius: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin-top: 20px;
			}

			.close-btn {
				width: 630rpx;
				height: 80rpx;
				margin-top: 30rpx;
				border-radius: 40rpx;
				border: 2rpx solid rgba(233, 180, 97, 1);
				background: none;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(233, 180, 97, 1);
			}
		}
	}

	.login-boxs {
		width: 100%;
		height: 100%;
	}

	/*********************第三方登录******************/
	.otherLoginWays {
		margin-top: 95px;
		text-align: center;

		.otherWayTextWrapper {
			line-height: 0;
			color: #666666;

			&:before,
			&:after {
				position: absolute;
				background: #cccccc;
				content: "";
				height: 1px;
				width: 30%;
			}

			&:before {
				left: 0;
			}

			&:after {
				right: 0;
			}

			.otherWayText {
				font-size: .8rem;
				color: #bbbbbb;
			}
		}

		.icons {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-top: 1.2em;

			img {
				width: 60upx;
				height: 60upx;
			}
		}
	}

	.login_mobile_22 {
		margin-top: 30px;
	}

	.chkAgree {
		white-space: normal;
		width: auto;
		height: 29upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 28upx;
		line-height: 29upx;
	}

	.login_mobile_22 .login_mobile_24 {
		white-space: normal;
		width: auto;
		height: 29upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 13upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 23upx;
		line-height: 29upx;
	}

	.login_mobile_22 .login_mobile_25 {
		white-space: normal;
		width: auto;
		height: 29upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 4upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #0080ff;
		font-size: 24upx;
		line-height: 29upx;
	}

	.login_mobile_22 .login_mobile_26 {
		white-space: normal;
		width: auto;
		height: 29upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 4upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 22upx;
		line-height: 29upx;
	}

	.login_mobile_22 .login_mobile_27 {
		white-space: normal;
		width: auto;
		height: 29upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 6upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #0080ff;
		font-size: 24upx;
		line-height: 29upx;
	}

	.login_mobile_28 {
		white-space: normal;
		width: 383upx;
		height: 27upx;
		padding: 0upx;
		clear: both;
		margin-top: 5upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 26upx;
		line-height: 27upx;
	}

	.login_mobile_28 .login_mobile_29 {
		white-space: normal;
		width: auto;
		height: 27upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 0upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 22upx;
		line-height: 27upx;
	}

	.login_mobile_28 .login_mobile_30 {
		white-space: normal;
		width: auto;
		height: 27upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 11upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		color: #0080ff;
		font-size: 25upx;
		line-height: 27upx;
	}



	// 注册

	.register {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 22px;
		width: 100%;
		margin-top: 10px;
	}
</style>

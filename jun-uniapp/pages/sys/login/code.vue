<template>
	<view class="wrap" style="padding-top:50rpx;">
		<view class="reg-text">验证手机号</view>
		<view class="remind-text">请输入发送至<em>{{phoneNo}}</em>的6位验证码,有效期10分钟。如未收到,请重新获取验证码</view>
		<u-message-input mode="box"   @finish="finish" :maxlength="6" :breathe="true"></u-message-input>
		<view class="remind-text">
			 <view v-if="!codeDisabled">{{loadTime}}秒后可重新获取验证码<br> </view>
			<!-- <view class="button" :disabled="getCodeDisabled" @click="getCode()"><text>重新获取验证码</text></view> -->
			<u-verification-code :keep-running="true" :seconds="seconds" @end="end" @start="start" ref="uCode"
				@change="codeChange" :startText="startText" :changeText="changeText" :endText="endText">
			</u-verification-code>
			<u-button v-if="codeDisabled" class="button" @tap="getCode">{{tips}}</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phoneNo: '',
				verificationCode:'',
				tips: '',
				seconds: 60,
				refCode: null,
				startText: '重新获取验证码',
				changeText: 'X秒重新获取',
				endText: '重新获取验证码',
				loadTime:60,
				codeDisabled:false,
				timer:''
			};
		},
		onLoad(option) {
			this.phoneNo = option.phoneNo
		},
		created() {
			this.timer = setInterval(this.getTime, 1000)
		},
		watch:{
		},
		methods: {
			getTime () {
			         this.loadTime--
			         if (this.loadTime === 0) {
			           clearInterval(this.timer)
					   this.codeDisabled = true
			         }
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					
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
					
					
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
					this.$u.api.sendCode({
							phoneno: this.phoneNo,
							validCodeType:'2'
						})
						.then(res => {
							if (res.code == '200') {

							} else {
								this.$refs.uCode.reset();
								this.$u.toast(res.msg);
							}
						});

				} else {
					this.$u.toast('请稍后重新获取');
				}
			},
			finish(e){
					this.$u.api.login({
						phoneNo: this.phoneNo,
						validCode: e,
						loginType: '0'
					})
					.then(res => {
						if(res.msg){
							this.$u.toast(res.msg);
						}
						if (res.code == '200') {
							setTimeout(() => {
								uni.reLaunch({
									// url: '/pages/sys/home/index',
									url: '/pages/sys/msg/index',
								});
							}, 500);
						}
					});
			
			}
		}
	};
</script>
<style lang="scss">
	@import 'index.scss';

	.remind-text {
		padding: 30rpx 70rpx;
		color: #666666;

		em {
			font-weight: bold;
			color: #242424;
			font-style: normal;
			margin: 0 5px;
		}
	}
</style>

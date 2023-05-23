<template>
	<view class="container">
		<view class="user-list x-bc" @click="setAvatar">
			<text class="list-name">头像</text>
			<view class="x-f">
				<u-avatar class="avatar" :src="userInfo.avatar" ></u-avatar>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="user-list x-bc">
			<text class="list-name">用户ID</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.id" :disabled="true"/>
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">用户名</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.username" :disabled="true"/>
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">昵称</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.nickname" @blur="setname"/>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="user-list x-bc">
			<text class="list-name">邮箱</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.email" @blur="setemail"/>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="user-list x-bc" >
			<text class="list-name">手机</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.mobile" @blur="setemobile"/>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="user-list x-bc" @click="show = true">
			<text class="list-name">生日</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.birthday" :disabled="true"/>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view>
		
		
		<view class="user-list x-bc" @click="gendershow = true">
			<text class="list-name">性别</text>
			<view class="x-f">
				<input class="list-val" v-model="userInfo.gender?'男':'女'" :disabled="true"/>
				<u-icon class="cuIcon-right" name="arrow-right"></u-icon>
			</view>
		</view><!--  -->
		<button class="login-button" @click="logout">退出登录</button>
		
		<u-calendar v-model="show" mode="date" @change="change"></u-calendar>
		<u-select v-model="gendershow" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				userInfo: {},
				show:false,
				gendershow:false,
				list: [
				{
					value: 0,
					label: '女'
				},
				{
					value: 1,
					label: '男'
				}
			],
			};
		},
		computed: {
		},
		onLoad() {
			_this = this;
			_this.getUserDetail();
		},
		methods: {
			getUserDetail() {
				_this._post_form('api/user/getUserDetail', {}, function(result) {
					_this.setData({
						userInfo:result.data
					})
				});
			},
			// 设置名称
			setname: function(e) {
				let name = e.detail.value;
			
				if (name.length == "") {
					return;
				}
				
				this.setUserInfo({nickname:name})
				
			},
			// 设置手机号码
			setemobile: function(e) {
				let mobile = e.detail.value;
			
				if (mobile.length == "" || !this.$u.test.mobile(mobile)) {
					return;
				}
				this.setUserInfo({mobile:mobile});
			},
			// 设置邮箱
			setemail: function(e) {
				let email = e.detail.value;
			
				if (email.length == "" || !this.$u.test.email(email)) {
					return;
				}
				this.setUserInfo({email:email});
			},
			// 设置简介
			setDynamic: function(e) {
				let _this = this;
				let name = e.detail.value;

				if (name.length == "") {
					return;
				}

				_this._post_form('user.index/getDynamic', {
					dynamic: name
				}, function(result) {
					if (result.code === 1) {

						_this.setData({
							'userInfo.dynamic': name,
						});
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '简介修改成功'
						});
					}
				});
			},
			logout() {
				uni.showLoading({
					title: 'waiting',
					mask: false
				});
				
				uni.removeStorageSync('token');
				uni.removeStorageSync('userinfo');
						
				uni.hideLoading();
				uni.reLaunch({
					url: '../login/index'
				});
			},
			/* 用户修改头像 */
			setAvatar(){
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
						_this.uploadFile(res.tempFilePaths)
				    }
				});
			},
			uploadFile(path){
				let _this = this;
				let url = this.api_root + 'api/Common/upload'
				uni.uploadFile({
					url: url, //仅为示例，非真实的接口地址
					filePath: path[0],
					name: 'file',
					success: (res) => {
						var e = JSON.parse(res.data)
						if (e.code == 1) {
							_this.setUserInfo({avatar:e.data.url})
						}
						
						
					}
				});
			},
			setUserInfo(data){
				let _this = this;
				_this._post_form('api/user/setuserinfo', data, (result) => {
					if (result.code != 0) {
						_this.showError(result.msg, (result) => {
							_this.getUserDetail();
						})
					}
				});
				
			},
			change(e) {
				this.setUserInfo({birthday:e.result});
			},
			confirm(e) {
				let _this = this;
				_this._post_form('api/user/setusergender', {gender:e[0].value}, (result) => {
					_this.showError(result.msg, (result) => {
						_this.getUserDetail();
					})
				});
			}
			
		}
	};
</script>

<style lang="scss">
	// @import "../../../utils/utils.scss";
	.user-list {
		background: #fff;
		height: 100rpx;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 0 20rpx;

		.list-name {
			font-size: 28rpx;
		}

		.avatar {
			width: 67rpx;
			height: 67rpx;
			border-radius: 50%;
			// background: #ccc;
		}

		.cuIcon-right {
			margin-left: 25rpx;
		}

		.list-val {
			color: #999;
			font-size: 28rpxc;
			text-align: right;
		}
	}

	.btn-box {
		margin-top: 60rpx;

		.confirem-btn {
			width: 710rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			font-size: 30rpx;
			color: rgba(#fff, 0.9);
		}
	}
	
	.login-button {
			background: #E3162E;
			color: #FFFFFF;
			border-radius: 44upx;
			margin: 22px;
		}
</style>

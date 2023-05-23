<template>
	<view class="wrap">
		<view class="search">
			<u-search v-model="keywords" @custom="search" @search="search"></u-search>
		</view>
		<scroll-view class="scroll-list msg-list-item" scroll-y="true" >
			<view v-for="(item, index) in list" :key="item.id">
				<view class="msg-time">11:05</view>
				<u-card :title="item.lastItem" :sub-title="item.lastDate" padding="20" margin="0rpx 20rpx" thumb="/static/aidex/images/list-icon.png" @click="navTo(item.navTo)">
					<view class="" slot="body">
						<view class="u-body-item u-flex  u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-2">{{item.lastMsg}}</view>
						</view>
					</view>
					<view class="" slot="foot"><u-icon name="eye" size="34" color="" :label="item.count"></u-icon> <!-- <u-icon name="thumb-up" size="34" color="" label="7"></u-icon> --></view>
				</u-card>
			</view>
			<!-- <view class="msg-time">11月10日 15:32</view>
			<u-card title="用户分享内容到社交媒体或好友" sub-title="11月10日" padding="20" margin="0rpx 20rpx" thumb="/static/aidex/images/list-icon.png" @click="navTo('/pages/sys/msg/form')">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台 ...</view>
					</view>
				</view>
				<view class="" slot="foot"><u-icon name="eye" size="34" color="" label="30"></u-icon> <u-icon name="thumb-up" size="34" color="" label="15"></u-icon></view>
			</u-card>
			<view class="msg-time">11月08日 10:05</view>
			<u-card title="用户分享内容到社交媒体或好友" sub-title="11月08日" padding="20" margin="0rpx 20rpx" thumb="/static/aidex/images/list-icon.png" @click="navTo('/pages/sys/msg/form')">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台 ...</view>
					</view>
				</view>
				<view class="" slot="foot"><u-icon name="eye" size="34" color="" label="30"></u-icon> <u-icon name="thumb-up" size="34" color="" label="15"></u-icon></view>
			</u-card>
			<view class="msg-time">11月08日 09:32</view>
			<u-card title="用户分享内容到社交媒体或好友" sub-title="11月08日" padding="20" margin="0rpx 20rpx" thumb="/static/aidex/images/list-icon.png" @click="navTo('/pages/sys/msg/form')">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台 ...</view>
					</view>
				</view>
				<view class="" slot="foot"><u-icon name="eye" size="34" color="" label="30"></u-icon> <u-icon name="thumb-up" size="34" color="" label="15"></u-icon></view>
			</u-card> -->
			<u-divider>已经到底了</u-divider>
		</scroll-view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
export default {
	data() {
		return {
			status: '',
			keywords: '',
			
			list: [{
					id: 11,
					//code: 'a',
					//name: '通知公告',
					//iconp: 'home-icon icon-color03',
					//icon: 'iconfont icon-tongzhi1',
					count: 177,
					navTo: '/pages/sys/msg/form?id=666',
					lastItem: '用户分享内容到社交媒体或好友',
					lastMsg: '在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台 ...',
					lastDate: '12:35',
					childList: []
				},
				{
						id: 11,
						// code: 'a',
						// name: '通知公告',
						// iconp: 'home-icon icon-color03',
						// icon: 'iconfont icon-tongzhi1',
						count: 133,
						navTo: '/pages/sys/msg/form?id=666',
						lastItem: '用户分享内容到社交媒体或好友',
						lastMsg: '在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台 ...',
						lastDate: '12:35',
						childList: []
					},
			
			],
			
						
		};
	},
	onLoad(option) {
		this.status = option.status;
		console.log('this.status='+this.status);
	},
	methods: {
		navTo(url) {
			let URL = "http://www.baidu.com?name=张三&age=25&sex=男&wife=小红";
			console.log(this.getUrlParams(URL));
			console.log(this.getUrlParams(url).id);
			uni.navigateTo({
				url: url
			});
		},
		search(value) {
			this.$u.toast('搜索内容为：' + value)
		},
		getUrlParams(url) {
		    // 通过 ? 分割获取后面的参数字符串
		    let urlStr = url.split('?')[1]
		    // 创建空对象存储参数
		    let obj = {};
		    // 再通过 & 将每一个参数单独分割出来
		    let paramsArr = urlStr.split('&')
		    for(let i = 0,len = paramsArr.length;i < len;i++){
		        // 再通过 = 将每一个参数分割为 key:value 的形式
		        let arr = paramsArr[i].split('=')
		        obj[arr[0]] = arr[1];
		    }
		    return obj
		},
		
	}
};

</script>
<style lang="scss">
@import '../../../common/uni.css';
page {
	background-color: #f5f5f5;
}
.wrap .search{
	background: #ffffff;
}
.msg-time{
	font-size: 26rpx;
	padding: 10px 0;
	color: #999999;
	text-align: center;
}
.u-card__foot{
	.u-icon{
		margin-right: 10px;
	}
}


</style>

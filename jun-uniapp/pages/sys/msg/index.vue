<template>
	<view class="wrap">
		<view class="search">
			<u-search v-model="keywords" @custom="search" @search="search"></u-search>
		</view>
		<scroll-view class="scroll-list" scroll-y="true">
			<view class="uni-list" v-for="(item, index) in list" :key="item.id">
				<uni-view class="uni-list-cell">
					<view class="uni-media-list" @click="navTo(item.navTo)">
						<view :class="item.iconp">
							<i :class="item.icon"><u-badge type="error" :count="item.count"></u-badge></i>
							<!-- <u-icon :name="item.icon != '' ? item.icon : 'home'" :size="35"></u-icon> -->
						</view>
						<uni-view class="uni-media-list-body">
							<uni-view class="uni-media-list-text-top"><span>{{item.name}}</span><span
									style="font-size: 26rpx;color: #999999;">{{item.lastDate}}</span></uni-view>
							<uni-view class="uni-media-list-text-bottom">
								<uni-text><span>{{item.lastItem}}</span></uni-text>
							</uni-view>
						</uni-view>
					</view>
				</uni-view>
			</view>
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

				keywords: '',

				list: [{
						id: 11,
						code: 'a',
						name: '通知公告',
						iconp: 'home-icon icon-color03',
						icon: 'iconfont icon-tongzhi1',
						count: 1,
						navTo: '/pages/sys/msg/list-item?status=1',
						lastItem: '关于元旦放假的通知',
						lastDate: '12:35',
						childList: []
					},
					{
						id: 12,
						code: 'a',
						name: '新闻动态',
						iconp: 'home-icon icon-color04',
						icon: 'iconfont icon-xinwen',
						count: 3,
						navTo: '/pages/sys/msg/list-item?status=2',
						lastDate: '12:35',
						lastItem: '神十三航天员圆满完成出舱任务',
						childList: []
					},
					{
						id: 13,
						code: 'a',
						name: '日常办公',
						iconp: 'home-icon icon-color06',
						icon: 'iconfont icon-msg-system',
						count: 2,
						navTo: '/pages/sys/msg/examine-item',
						lastDate: '11月07日',
						lastItem: '王XX提交的“请假申请”待你审批',
						childList: []
					},
					{
						id: 14,
						code: 'a',
						name: '网上报销',
						iconp: 'home-icon icon-color12',
						icon: 'iconfont icon-baoxiao',
						count: 1,
						navTo: '/pages/sys/msg/examine-item',
						lastDate: '11月07日',
						lastItem: '吴天祥提交的“差旅费报销”待你审批',
						childList: []
					},
					{
						id: 15,
						code: 'a',
						name: '我的邮件',
						iconp: 'home-icon icon-color04',
						icon: 'iconfont icon-msg-system',
						count: 0,
						navTo: '/pages/sys/msg/list-item',
						lastDate: '11月06日',
						lastItem: '邮件提醒：邮件提醒：15封新邮件未读',
						childList: []
					},

				],


			};
		},
		onLoad() {

		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			search(value) {
				this.$u.toast('搜索内容为：' + value)
			}

		}
	};
</script>
<style lang="scss">
	@import '../../../common/uni.css';

	page {
		background-color: #f5f5f5;
	}

	.wrap .search {
		background: #ffffff;
	}

	.uni-title {
		font-size: 30rpx;
		color: #333333;
		padding: 10px;
		background: #fff;
		border-top: 1px solid #ededed;
		margin-top: 20rpx;
	}

	.uni-media-list {
		padding: 15px 15px;

	}

	.uni-media-list-body {
		height: 42px;
		padding-left: 20rpx;
	}

	.uni-media-list-text-top {
		height: 40rpx;
		overflow: hidden;
		width: 100%;
		line-height: 40rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
	}

	.uni-media-list-text-bottom {
		width: 100%;
		line-height: 24rpx;
		font-size: 26rpx;
		color: #666666;

		span {
			margin-right: 10rpx;
		}
	}
</style>
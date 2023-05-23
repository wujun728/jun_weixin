<template>
	<view class="calendar-box">
		<view class="calendar-top-box">
			<image class="calendar-img" @click="changeSub" src="../../static/calendar-left.png"></image>
			<view class="calendar-top-title">{{formatMonth(todayMonth)}}</view>
			<image class="calendar-img" @click="changeAdd" src="../../static/calendar-right.png"></image>
		</view>
		<view class="calendar-week-box">
			<view class="week-title" v-for="(item,index) in weekList" :key="index">{{item}}</view>
		</view>
		<view class="calendar-center-box">
			<view class="calendar-center-tiem" :style="[index == 0 && oneDayClass,item.bgColor] "
				v-for="(item,index) in monthArr" :key="index" @click="changeMonthIndex(index)">
				{{index + 1}}
				<view class="spot" v-if="monthIndex == index"></view>
			</view>
		</view>
		<view class="calendar-bottom-box">
			<view class="calendar-bottom-item">
				<span class="blue-span"></span>打卡完成
			</view>
			<view class="calendar-bottom-item">
				<span class="purple-span"></span>迟到
			</view>
			<view class="calendar-bottom-item">
				<span class="yellow-span"></span>漏刷
			</view>
			<view class="calendar-bottom-item"> <span class="red-span"></span>未打卡 </view>
		</view>
	</view>
</template>
<script>
	import dayjs from './day.js'
	export default {
		components: {},
		data() {
			return {
				oneDay: 0,
				oneDayClass: '',
				tabIndex: 1,
				weekList: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
				monthArr: [],
				monthIndex: 0,
				todayMonth: dayjs().format("YYYY-MM-DD"), //当前月份
			};
		},
		watch: {

		},
		created(option) {
			this.getDaysArrayByMonth()
			this.$emit('change', {
				value: this.formatMonth()
			});
			this.$emit('checked', {
				value: this.todayMonth
			});

		},
		methods: {
			changeMonthIndex(e) {
				this.monthIndex = e
				this.$emit('checked', {
					value: this.monthArr[e].date
				});

			},
			//切换tab
			changeTab(e) {
				this.tabIndex = e
			},
			//获取获取上个月
			changeSub(e) {
				this.todayMonth = dayjs(this.todayMonth).add(-1, 'month').startOf('month').format('YYYY-MM-DD')
				this.monthIndex = 0
				this.getDaysArrayByMonth()
				this.$emit('change', {
					value: this.formatMonth()
				});
				this.$emit('checked', {
					value: this.monthArr[0].date
				});
			},
			//获取获取下个月
			changeAdd(e) {
				this.todayMonth = dayjs(this.todayMonth).add(1, 'month').startOf('month').format('YYYY-MM-DD')
				this.monthIndex = 0
				this.getDaysArrayByMonth()
				this.$emit('change', {
					value: this.formatMonth()
				});
				this.$emit('checked', {
					value: this.monthArr[0].date
				});
			},
			//月份格式化
			formatMonth() {
				return dayjs(this.todayMonth).format('YYYY年MM月')
			},
			//获取当前月份包含的天数
			getDaysArrayByMonth() {
				//获取当前月份包含的天数
				var daysInMonth = dayjs(this.todayMonth).daysInMonth();
				var start = 1
				var monthArr = []
				//循环获取月份里的日期
				while (daysInMonth >= start) {
					var current = dayjs(this.todayMonth).date(start);
					monthArr.push({
						date: current
					});
					start++;
				}
				monthArr.forEach((item, index) => {
					monthArr[index].date = item.date.format("YYYY-MM-DD")
					monthArr[index].bgColor = this.getDayBgColor(1, 2, monthArr[index].date)
					if (dayjs(monthArr[index].date).format("YYYY-MM-DD") == dayjs().format("YYYY-MM-DD")) this
						.monthIndex = index
					// background: linear-gradient(to bottom, aquamarine 0%, aquamarine 50%, yellow 51%, yellow 100%);
				});
				this.getDaysWeek(monthArr[0].date)
				this.monthArr = monthArr

			},
			//获取当前星期几
			getDaysWeek(e) {
				var oneDay = dayjs(e).day() + 1 || 0
				this.oneDayClass = {
					'grid-column-start': oneDay
				}
			},
			//获取背景色
			getDayBgColor(morning, night, date) {
				//利用早上的签到时间和晚上的签到时间
				//date表示对应日期
				// 后端传给前端打卡规则（按每天的传或者后端直接返回，前端不传），前端做判断
				// 这里应该还缺少早退的颜色，待确定
				var colorList = ['#1fabfe', '#f5a000', '#FF6E6E', '#A07AFF']
				//根据早上，下午的时间。进行颜色对比
				var morningStart = Math.round(Math.random() * 3); //这个只是演示
				var nightStart = Math.round(Math.random() * 3); //这个只是演示
				//是否周六日（0，6为周日周六，则返回灰色）
				var isWeek = dayjs(date).day()
				//表示今天之前或者以后
				var isToday = dayjs().format("YYYY-MM-DD") == date
				if (isToday) return {
					"border": "1rpx solid #20ABFF",
					"color": "#20ABFF"
				}
				//表示未来
				var isFuture = date > dayjs().format("YYYY-MM-DD")
				//周六，周日，大于今天的
				if (isWeek == 0 || isWeek == 6 || isFuture) return {
					"background": "#f1f1f1"
				}
				return {
					"background": `linear-gradient(to bottom, ${colorList[Number(morningStart)]} 0%, ${colorList[Number(morningStart)]} 50%, ${colorList[Number(nightStart)]} 51%, ${colorList[Number(nightStart)]} 100%)`,
					"color": "#FFFFFF"
				}
			}
		}
	};
</script>

<style lang="scss">
	.spot {
		display: flex;
		margin: 8rpx auto 0;
		width: 8rpx;
		height: 8rpx;
		background-color: #20ABFF;
		border-radius: 50%;
	}

	.calendar-box {
		overflow: hidden;
		margin-top: 32rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.04);
		border-radius: 24rpx;

		.calendar-top-box {
			display: flex;
			justify-content: center;
			margin: 16rpx 0;

			.calendar-top-title {
				width: 240rpx;
				text-align: center;
				height: 64rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #20ABFF;
				line-height: 64rpx;
				margin: 0 64rpx;
			}

			.calendar-img {
				height: 32rpx;
				width: 32rpx;
				margin: 16rpx 0;
			}
		}

		.calendar-week-box {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			margin: 0 40rpx;
			grid-gap: 24rpx;

			.week-title {
				width: 64rpx;
				text-align: center;
				height: 42rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #C5C5C5;
				line-height: 42rpx;
			}
		}

		.calendar-center-box {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			margin: 24rpx 40rpx;
			grid-gap: 36rpx;

			.week-title {
				// width: 62px;
				text-align: center;
				height: 42rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #C5C5C5;
				line-height: 42rpx;
			}

			.calendar-center-tiem {
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				line-height: 56rpx;
				text-align: center;

				font-size: 32rpx;
				color: #666666;
			}
		}

		.calendar-bottom-box {
			margin: 32rpx 40rpx;
			display: flex;
			justify-content: space-between;

			.calendar-bottom-item {
				.blue-span {
					display: block;
					width: 20rpx;
					height: 20rpx;
					background-color: #20ABFF;
					border-radius: 50%;
					margin: auto 16rpx auto 0;
				}

				.purple-span {
					display: block;
					width: 20rpx;
					height: 20rpx;
					background-color: #A07AFF;
					border-radius: 50%;
					margin: auto 16rpx auto 0;
				}

				.yellow-span {
					display: block;
					width: 20rpx;
					height: 20rpx;
					background-color: #F5A000;
					border-radius: 50%;
					margin: auto 16rpx auto 0;
				}

				.red-span {
					display: block;
					width: 20rpx;
					height: 20rpx;
					background-color: #FF6E6E;
					border-radius: 50%;
					margin: auto 16rpx auto 0;
				}

				display: flex;
				height: 42rpx;
				font-size: 28rpx;
				color: #535353;
				line-height: 42rpx;

			}
		}
	}
</style>
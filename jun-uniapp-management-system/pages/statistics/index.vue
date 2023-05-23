<template>
	<view class="content" v-if="data">
		<u-navbar :is-back="false" back-icon-color="#fff" :background="background"
			title="统计"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
		</u-navbar>
			
		<view class="color-box" v-if="infodata">
			<view class="color-item bg1" >
				<view class="color-title">
					￥{{ infodata.purchase.totalMoney }}
				</view>
				<view class="color-value">
					采购汇总
				</view>
			</view>
			<view class="color-item bg2">
				<view class="color-title">
					￥{{ infodata.Retprodcut.totalMoney }}
				</view>
				<view class="color-value">
					采购退货汇总
				</view>
			</view>
		</view>
		<view class="color-box" v-if="infodata">
			<view class="color-item bg3">
				<view class="color-title">
					￥{{ infodata.deliveryPro.totalMoney }}
				</view>
				<view class="color-value">
					销售汇总
				</view>
			</view>
			<view class="color-item bg4">
				<view class="color-title">
					￥{{ infodata.sellreturn.totalMoney }}
				</view>
				<view class="color-value">
					销售退货汇总
				</view>
			</view>
		</view>
		
		<view v-if="showlist" class="charts-box u-m-t-30 white">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    :errorShow="false"
		    background="none"
		  />
		</view>
		
			
		<view class="m_top25" v-for="(listitem, index) in data.menus" :key="index" >
			<u-section  :title="listitem.title" :right="false" :show-line="true"></u-section>
			<view class="white m_top5">
				<u-grid :col="3"  :border="false">
					<u-grid-item v-for="(item, idx) in listitem.info" :key="idx" @tap="onClick(item.url?item.url:null)">
						<image class="u-grid-item-img" :src="item.src"></image>
						<view class="grid-text">{{item.title}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

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
				data:null,
				infodata:null,
				showlist:false,
				currentMonthv:[],
				chartData:{
				      "categories": [],
				      "series": [
				          {
				              "name": "采购",
				              "data": [
				                  120,
				                  160,
				                  540,
				                  640,
				                  830,
				                  940
				              ]
				          },
				          {
				              "name": "采购退货",
				              "data": [
				                  10,
				                  20,
				                  30,
				                  40,
				                  20,
				                  10
				              ]
				          },
				          {
				              "name": "销售",
				              "data": [
				                  120,
				                  660,
				                  770,
				                  440,
				                  880,
				                  990
				              ]
				          },
				          {
				              "name": "销售退货",
				              "data": [
				                  10,
				                  20,
				                  30,
				                  40,
				                  50,
				                  60
				              ]
				          }
				      ]
				},
			}
		},
		onLoad() {
			_this = this;
			this.getlast5Month();
			_this.getinfo();
		},
		methods: {
		 getlast5Month(){
			  let month_arr = [];
			  let currentMonthvs = [];
			  let d = new Date();  //这里是测试时设了一个时间 注意这里是 2021年4月1日  实际使用        
										   //的时候， 这里应该是 d = new Date();
			  let currentYear = d.getFullYear();
			  let currentMonth = d.getMonth();
			  let keyMonth = (d.getMonth() + 1) < 10? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);  //js中的 getMonth是月份减1  在这里处理了
			  let key = currentYear + "-" + keyMonth;
			  let tag = 0;   //这个tag是记录 跨年的次数的，后面的代码中 如果进入的跨年处理分支的话， 就把 
							 //tag加1
			  for(let i = 0;i<6;i++){   //前五个月， 所以这里循环了五次
				if(currentMonth - i < 0){        //这里是如果跨年的处理
				  tag++     //这个代码分支走了多少次，就加多少次
				  let newYear = currentYear-1;
				  keyMonth = 13 - tag;   // 为什么是13， 还不是因为 js 月份减一的问题
				  key = newYear + "-" + keyMonth; 
			  	 month_arr.push(keyMonth+ "月")
			  	 currentMonthvs.push(key)
				}else{            //这里是没有跨年的处理
				  keyMonth = (d.getMonth() + 1 - i) < 10? "0" + (d.getMonth() + 1 - i) : (d.getMonth() + 1 -i);
				  key = currentYear + "-" + keyMonth;
			  	 month_arr.push(keyMonth+ "月")
			  	 currentMonthvs.push(key)
				}
			  }
			  this.chartData.categories = month_arr.reverse()
			  this.currentMonthv = currentMonthvs.reverse()
		 
			},
			onClick(url){
				if (url) {
					uni.navigateTo({
						url:url
					})
				}
			},
			getinfo(){
				_this._post_form('api/index/getmenus2', {}, (result) => {
					_this.data = result.data
				});
				
				_this._post_form('api/ykjp/summary/Purchase/index', {}, (result) => {
					_this.infodata = result.data.data
					_this.setcharts()
				});
			},
			
			setcharts(){
				console.log(_this.currentMonthv);
				var data = _this.infodata;
				for(let key  in data){
					if (key == 'purchase') {
						for (let i  in data[key].list) {
							for (let j=0;j<_this.currentMonthv.length;j++) {
								if (_this.$u.timeFormat(data[key].list[i].createtime, 'yyyy-mm') == _this.currentMonthv[j]) {
									_this.chartData.series[0].data[j] += parseInt(data[key].list[i].subtotal)
								}
							}
						}
					}else if(key == 'Retprodcut'){
						for (let i  in data[key].list) {
							for (let j=0;j<_this.currentMonthv.length;j++) {
								if (_this.$u.timeFormat(data[key].list[i].createtime, 'yyyy-mm') == _this.currentMonthv[j]) {
									_this.chartData.series[1].data[j] += parseInt(data[key].list[i].subtotal)
								}
							}
						}
					}else if(key == 'deliveryPro'){
						for (let i  in data[key].list) {
							for (let j=0;j<_this.currentMonthv.length;j++) {
								if (_this.$u.timeFormat(data[key].list[i].createtime, 'yyyy-mm') == _this.currentMonthv[j]) {
									_this.chartData.series[2].data[j] += parseInt(data[key].list[i].subtotal)
								}
							}
						}
					}else if(key == 'sellreturn'){
						for (let i  in data[key].list) {
							for (let j=0;j<_this.currentMonthv.length;j++) {
								if (_this.$u.timeFormat(data[key].list[i].createtime, 'yyyy-mm') == _this.currentMonthv[j]) {
									_this.chartData.series[3].data[j] += parseInt(data[key].list[i].subtotal)
								}
							}
						}
					}
				}
				_this.showlist = true;
				
			}
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
	
	
	.color-box {
		/* padding: 0 15px; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		text-align: center;
		margin-top: 20rpx;
	}
	
	.color-item {
		display: flex;
		flex: 1;
		margin: 0 8rpx;
		flex-direction: column;
		border-radius: 6rpx;
		padding: 12rpx 0;
		height: 75px;
	}
	
	.bg1{
		background: linear-gradient(-125deg, #67c707, #a7f968);
	}
	
	.bg2{
		background: linear-gradient(-125deg, #16a8cc, #1bd0fd);
	}
	
	.bg3{
		background: linear-gradient(-125deg, #e29811, #f1cf71);
	}
	
	.bg4{
		background: linear-gradient(-125deg, #cc16b6, #d496d8);
	}
	
	.color-title {
		font-size: 30px;
		/* line-height: 75px; */
		height: 75px;
	}
	
	.color-value {
		font-size: 24rpx;
	}
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box{
	  width: 100%;
	  height:300px;
	}
</style>

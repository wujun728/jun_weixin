<template>
	<!-- 采购订单 -->
	
	<!-- /* 
	 *Copyright© 2016-2021 星游源码 版权所有
	 * 购买地址 https://www.huzhan.com/code/goods403940.html
	 */ -->
	<view class="wrap1">
		
		<u-tabs-swiper ref="uTabs" :list="tablist" :current="swiperCurrent" @change="tabsChange" :is-scroll="true" :font-size="30"
		 active-color="#feee0b" inactive-color="#fff" bg-color="#2fc25b" swiperWidth="750"></u-tabs-swiper>
		 
		<view class="wrap">
			<view class="mt20">
				<u-section class="mb12" :title="tablist[swiperCurrent].name" :right="false" :show-line="true"></u-section>
			</view>
			<view v-if="orderList.length>0">
				<view class="mt4" v-for="(item, index) in orderList" :key="index" v-if="swiperCurrent==0?true: (swiperCurrent-1)== item.status">
					<u-card :title="'编号：'+ item.code" :sub-title="item.createtime" margin='0rpx' >
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2"><text class="font-weight-bold">供 应 商 ：</text>{{ item.supplier }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">产品总数：</text>{{ item.totalnums }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">制单时间：</text>{{ item.createtime }}</text>
							</view>
						</view>
						<view class="" slot="head">
							<u-row gutter="16" justify="flex-end">
								<u-col span="9">
								<text class="title u-line-2">编号：{{ item.code }}</text>
								</u-col>
								<u-col span="3">
						 <u-tag :text="statusList[item.status].text" mode="light" :type="statusList[item.status].type" shape="circle"/>
						<!-- <u-tag text="一丘之貉" mode="dark" /> -->
								</u-col>
							</u-row>
						</view>
					</u-card>
				</view>
			</view>
		</view>		
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				tablist: [
					{
						name: '全部'
					},
					{
						name: '待审批'
					},
					{
						name: '待退货'
					}, 
					{
						name: '未通过'
					},
					{
						name: '已完成'
					},
				],
				swiperCurrent: 0,
				orderList:[],
				statusList:[
					{
						text:'待审批',
						type:'info'
					},{
						text:'待退货',
						type:'error'
					},{
						text:'未通过',
						type:'warning'
					},{
						text:'退货成功',
						type:'success'
					}
				]
			}

		},
		onShow() {
		},
		onLoad() {
			_this = this;
			_this.getOrderList();
		},
		methods: {
			getOrderList(){
				_this._post_form('/api/ykjp/purchase/retire/index', {}, (result) => {
					for (let i = 0;i<result.data.data.length;i++) {
						result.data.data[i].createtime = _this.transformTime(result.data.data[i].createtime);
					}
					_this.setData({'orderList' : result.data.data})
				});
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
		}
	}
</script>


<style scoped lang="scss">
	.wrap1 {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
</style>

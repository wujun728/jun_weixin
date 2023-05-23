<template>
	<!-- 采购订单 -->
	<view class="wrap1">
		
		<u-tabs-swiper ref="uTabs" :list="tablist" :current="swiperCurrent" @change="tabsChange" :is-scroll="true" :font-size="30"
		 active-color="#feee0b" inactive-color="#fff" bg-color="#2fc25b" swiperWidth="750"></u-tabs-swiper>
		 
		<view class="wrap">
			<u-section class="mt20 mb12" :title="tablist[swiperCurrent].name" :right="false" :show-line="true"></u-section>
			<view v-if="orderList.length>0">
				<view class="mt4" v-for="(item, index) in orderList" :key="index" v-if="swiperCurrent==0?true: (swiperCurrent-1)== item.status">
					<u-card :title="'编号：'+ item.code" :sub-title="item.createtime" :thumb="item.image" margin='0rpx' @click=onClick(item.id)>
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2"><text class="font-weight-bold">供 应 商 ：</text>{{ item.supplier }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">联 系 人 ：</text>{{ item.contact }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">联系电话：</text>{{ item.phone }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">交货方式：</text>{{ typelist[item.type].label }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">产品总数：</text>{{ item.totalNums }}</text>
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
						name: '未审核'
					},
					{
						name: '审核失败'
					}, 
					{
						name: '待入库'
					},
					{
						name: '已完成'
					},
				],
				swiperCurrent: 0,
				orderList:[],
				statusList:[
					{
						text:'未审核',
						type:'info'
					},{
						text:'审核失败',
						type:'error'
					},{
						text:'待入库',
						type:'warning'
					},{
						text:'已完成',
						type:'success'
					}
				],
				typelist: [{
					label: '买家自提',
				}, {
					label: '卖家发货',
				},{
					label: '代发',
				}],
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
				_this._post_form('/api/ykjp/purchase/Order/index', {}, (result) => {
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
			onClick(id){
				uni.navigateTo({
					url:'orderdetail?id=' + id
				})
			}
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

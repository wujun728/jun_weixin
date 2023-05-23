<template>
	<!-- 采购订单 -->
	<view class="wrap">
			<u-card :title="'编号：'+ orderList.code" :sub-title="orderList.createtime"  margin='0rpx' >
				<view class="" slot="body">
					<view class="title-wrap">
						<text class="title u-line-2"><text class="font-weight-bold">供 应 商 ：</text>{{ orderList.supplier }}</text>
						<text class="title u-line-2"><text class="font-weight-bold">联 系 人 ：</text>{{ orderList.contact }}</text>
						<text class="title u-line-2"><text class="font-weight-bold">联系电话：</text>{{ orderList.phone }}
							<text class="phone-fill" @tap="makePhoneCall">(<u-icon name="phone-fill"></u-icon>点击拨打)</text>
						</text>
						<text class="title u-line-2"><text class="font-weight-bold">交货方式：</text>{{ typelist[orderList.type].label }}</text>
						<text class="title u-line-2"><text class="font-weight-bold">产品总数：</text>{{ orderList.totalNums }}</text>
						<text class="title u-line-2"><text class="font-weight-bold">制单时间：</text>{{ orderList.createtime }}</text>
						<text class="title u-line-2 phone-fill"><text class="font-weight-bold ">应付金额：</text>￥{{ orderList.money }}</text>
					</view>
				</view>
				<view class="" slot="head">
					<u-row gutter="16" justify="flex-end">
						<u-col span="9">
						<text class="title u-line-2">编号：{{ orderList.code }}</text>
						</u-col>
						<u-col span="3">
				 <u-tag :text="statusList[orderList.status].text" mode="light" :type="statusList[orderList.status].type" shape="circle"/>
						</u-col>
					</u-row>
				</view>
			</u-card>
			
			
			
			<view class="mt20">
				<u-section class="mb12" title="单据详情" :right="false" :show-line="true"></u-section>
			</view>
			
			<view v-if="orderList.productlist.length>0">
				<view class="mt4" v-for="(item, index) in orderList.productlist" :key="index">
					<u-card :title="item.info.name" :sub-title="'￥' + item.subtotal" :thumb="item.url" margin='0rpx' >
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2"><text class="font-weight-bold">采购单价：</text>{{ item.price }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">采购数量：</text>{{ item.nums }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">单位：</text>{{ item.info.unit }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">现有库存：</text>{{ item.info.inventory }}</text>
								<text class="title u-line-2"><text class="font-weight-bold">备注：</text>{{ item.remarks }}</text>
							</view>
						</view>
					</u-card>
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
				id:null,
			}
		},
		onShow() {
		},
		onLoad(option) {
			_this = this;
			_this.id = option.id
			_this.getOrderList();
		},
		methods: {
			getOrderList(){
				_this._post_form('/api/ykjp/purchase/Order/orderDetail', {
					id:_this.id
				}, (result) => {
					result.data.data.createtime = _this.transformTime(result.data.data.createtime);
					_this.setData({'orderList' : result.data.data})
				});
			},
			makePhoneCall(){
				uni.makePhoneCall({
				    phoneNumber: _this.orderList.phone //仅为示例
				});
			}
		}
	}
</script>


<style scoped lang="scss">
	.phone-fill {
		color: #ff070b;
	}
</style>

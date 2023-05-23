<template>
	<!-- 采购录单 -->
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<!-- <u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
			 :label-position="labelPosition" label="编号" prop="code">
				<u-input :border="border" placeholder="请输入编号" v-model="model.code" type="text"></u-input> -->
				<!-- #ifndef H5 -->
					<!-- <u-button slot="right" type="success" size="mini" @click="onScan">扫条码
						<u-icon name="scan"></u-icon>
					</u-button> -->
				<!-- #endif -->
			<!-- </u-form-item> -->
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="供应商" prop="supplier">
				<u-input :border="border" type="select" :select-open="supplierSheetShow" v-model="model.supplier" placeholder="请选择供应商"
				 @click="supplierSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="edit-pen" label-width="180"
			 :label-position="labelPosition" label="联系人" prop="linkman">
				<u-input :border="border" placeholder="请输入联系人" v-model="model.linkman" type="text" :disabled="true"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="phone" :label-position="labelPosition"
			 label="手机号码" prop="phone" label-width="150">
				<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number" :disabled="true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="地址" prop="address">
				<u-input type="textarea" :border="border" placeholder="供应商地址" v-model="model.address" :disabled="true" />
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="交货日期" prop="delivery_time">
				<u-input :border="border" type="select" :select-open="delivery_timeSheetShow" v-model="model.delivery_time"
				 placeholder="请选择交货日期" @click="delivery_timeSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item label-width="180" :label-position="labelPosition" label="仓库" prop="supplier">
				<u-input :border="border" type="select" :select-open="warehouseSheetShow" v-model="model.currentWarehouseName"
				 placeholder="请选择仓库" @click="warehouseSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item label-width="180" :label-position="labelPosition" label="类型" prop="supplier">
				<u-input :border="border" type="select" :select-open="typelistShow" v-model="typelist[typelistIndex].label"
				 placeholder="请选择类型" @click="typelistShow = true"></u-input>
			</u-form-item>
			<u-form-item label="税率(%)" prop="rate" label-width="150">
				<u-input :border="border" placeholder="请输入税率" v-model="model.rate" type="number"></u-input>
			</u-form-item>
			<view class="mt20">
				<u-section class="mb12" title="录入商品" :right="false" :show-line="true"></u-section>
			</view>
			<view v-if="commodityList.length>0" class="mt20">
				<view class="mt4" v-for="(item, index) in commodityList" :key="item.id">
					<u-card :title="item.name" :sub-title="'￥' + (item.money*item.num).toString()" :thumb="item.image" margin='0rpx'
					 :foot-border-top="false">
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2">商品ID：{{ item.id }}</text>
								<text class="title u-line-2">商品名称：{{ item.name }}</text>
								<text class="title u-line-2">sku：{{ item.sku }}</text>
								<text class="title u-line-2">规格：{{ item.specification }}</text>
								<text class="title u-line-2">单位：{{ item.unit }}</text>
							</view>
							<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="rmb-circle" label-width="180"
							 :label-position="labelPosition" label="单价" prop="money">
								<u-input :border="border" placeholder="请输入单格" v-model="item.money" type="number"></u-input>
							</u-form-item>
							<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
							 :label-position="labelPosition" label="数量" prop="num">
								<u-input :border="border" placeholder="请输入数量" v-model="item.num" type="number"></u-input>
							</u-form-item>
							<u-form-item :label-position="labelPosition" label="说明">
								<u-input type="textarea" :border="border" placeholder="请填写说明" v-model="item.remark" />
							</u-form-item>
						</view>
						<view class="" slot="foot">
							<u-row gutter="16" justify="flex-end">
								<u-col span="3">
									<u-icon name="close-circle-fill" size="34" color="#ec3304" label="删除" label-color="#ec3304" @click="ondelOrder(index)"></u-icon>
								</u-col>
								<u-col span="3">
									<u-icon class="ml8" name="plus-circle-fill" size="34" color="#225fec" label="新增" label-color="#225fec" @click="onAddOrder"></u-icon>
								</u-col>
							</u-row>
						</view>
					</u-card>
				</view>
			</view>
			<view v-else>
				<u-card title="" sub-title="" thumb="" margin='0rpx'>
					<view class="" slot="head">
						<u-icon class="ml8" name="plus-circle-fill" size="34" color="#225fec" label="新增" label-color="#225fec" @click="onAddOrder"></u-icon>
					</view>
				</u-card>
			</view>
			<u-form-item :label-position="labelPosition" label="说明" prop="remark">
				<u-input type="textarea" :border="border" placeholder="请填写说明" v-model="model.remark" />
			</u-form-item>
		</u-form>
		<view class="mt20">
			<u-section class="mb12" :title="'应付金额(价税合计)￥ ' + totalMoney" :right="false" :show-line="false"></u-section>
		</view>
		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		<u-calendar v-model="delivery_timeSheetShow" mode="date" @change="delivery_timeChange" toolTip='交货时间'  max-date="2050-01-01"></u-calendar>
		<u-select mode="single-column" :list="supplierSelectList" v-model="supplierSheetShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="selectWarehouseList" v-model="warehouseSheetShow" @confirm="selectwarehouseConfirm"></u-select>
		<u-select mode="single-column" :list="typelist" v-model="typelistShow" @confirm="selecttypelistConfirm"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				model: {
					code: '', //编号
					supplier: '', //编号
					name: '',
					linkman: '',
					address: '',
					city: '',
					remark: '',
					phone: '',
					telephone: '',
					type: '',
					delivery_time: '', //交货日期
					rate: '16',
					currentWarehouseName: '',
				},
				rules: {
					
					
					// <!-- /* 
					//  *Copyright© 2016-2021 星游源码 版权所有
					//  * 购买地址 https://www.huzhan.com/code/goods403940.html
					//  */ -->
					// code: [{
					// 		required: true,
					// 		message: '请输入编号',
					// 		trigger: 'blur',
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
					// 			return this.$u.test.enOrNum(value);
					// 		},
					// 		message: '必须为英文或者数字',
					// 		// 触发器可以同时用blur和change，二者之间用英文逗号隔开
					// 		trigger: ['change', 'blur'],
					// 	},
					// ],
					rate: [{
						required: true,
						message: '请输入税率',
						trigger: 'blur',
					}, ],
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur',
					}],
					linkman: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur',
					}],
					city: [{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}],
					type: [{
						required: true,
						message: '请选择仓库类型',
						trigger: 'change',
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					telephone: [{
							required: true,
							message: '请输入座机号码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '座机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
				},
				pickerShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				unitList: [],
				unitListShow: false,
				supplierSheetShow: false,
				supplierList: {}, //供应商列表
				supplierSelectList: [], //待选供应商列表
				supplierSelectindex: 0, //选择的供应商索引
				delivery_timeSheetShow: false,
				delivery_timetime: null,
				/* 卡片 订单列表 */
				commodityList: [],
				/* 仓库信息 */
				warehouseSheetShow: false,
				selectWarehouseList: [],
				currentWarehouseIndex: 0,
				/* 类型 */
				typelistShow: false,
				typelist: [{
					label: '买家自提',
					value: 0,
				}, {
					label: '卖家发货',
					value: 1,
				}, {
					label: '代发',
					value: 2,
				}],
				typelistIndex: 0,
			}
		},
		computed: {
			totalMoney() {
				var totalMoney = 0
				for (let i = 0; i < this.commodityList.length; i++) {
					totalMoney += this.commodityList[i].num * this.commodityList[i].money
				}
				totalMoney = totalMoney + totalMoney * _this.model.rate / 100
				return totalMoney;
			}
		},
		onShow() {
			var list = uni.getStorageSync('commodityList');
			if (list) {
				for (let i = 0; i < list.length; i++) {
					_this.commodityList.push(list[i])
				}
			}
			uni.removeStorageSync('commodityList')
		},
		onLoad() {
			_this = this;
			_this.getSupplierList()
			_this.getWarehouseInfo()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getWarehouseInfo() {
				_this._post_form('api/ykjp/information/basisinfo/partition/index', {}, (result) => {
					for (let i = 0; i < result.data.data.length; i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = i;
					}
					_this.setData({
						selectWarehouseList: result.data.data
					})
				});
			},
			getSupplierList() {
				_this._post_form('/api/ykjp/information/basisinfo/supplier/index', {}, (result) => {
					_this.supplierSelectList = [];
					for (let i = 0; i < result.data.data.length; i++) {
						_this.supplierSelectList.push({
							label: result.data.data[i].name,
							value: i,
						})
					}
					_this.setData({
						'supplierList': result.data.data
					})
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid && this.model.currentWarehouseName != '' && this.model.delivery_time != '' && _this.commodityList.length >
						0) {
						for (let i = 0; i < _this.commodityList.length; i++) {
							if (!_this.commodityList[i].money || !_this.commodityList[i].num) {
								return this.$refs.uToast.show({
									title: '验证失败',
									type: 'error'
								})
							}
						}
						_this.sendInfo();
					} else {
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error'
						})
					}
				});
			},
			sendInfo() {
				let data = {};
				// data.code = _this.model.code; //编号
				data.supplier_id = _this.supplierList[_this.supplierSelectindex].id; //供应商id
				data.supplier = _this.supplierList[_this.supplierSelectindex].name; //供应商
				data.contact = _this.model.linkman; //联系人
				data.phone = _this.model.phone; //电话
				data.delivery_time = _this.delivery_timetime/1000; //交货时间
				data.type = _this.typelistIndex; //类型
				data.purman_id = 0;
				data.warehouse_id = _this.selectWarehouseList[_this.currentWarehouseIndex].warehouse_id; //仓库上级id
				data.warehouse_partition_id = _this.selectWarehouseList[_this.currentWarehouseIndex].ID; //仓库id
				let wait_nums = 0;
				let totalMoney, money = 0
				data.product_id = [];
				data.product_price = [];
				data.product_nums = [];
				data.product_remarks = [];
				data.product_unit = [];
				data.product_wait_nums = [];
				data.product_length = _this.commodityList.length;
				for (let i = 0; i < _this.commodityList.length; i++) {
					wait_nums += _this.commodityList[i].num * 1;
					money += _this.commodityList[i].num * _this.commodityList[i].money

					data.product_id.push(_this.commodityList[i].id)
					data.product_price.push(_this.commodityList[i].money)
					data.product_nums.push(_this.commodityList[i].num)
					data.product_remarks.push(_this.commodityList[i].remark)
					data.product_unit.push(_this.commodityList[i].unit)
					data.product_wait_nums.push(_this.commodityList[i].num)
				}
				totalMoney = money + money * _this.model.rate / 100
				data.wait_nums = wait_nums; //未生成录库单数
				data.totalNums = wait_nums; //产品总数
				data.city = _this.supplierList[_this.supplierSelectindex].city;
				data.address = _this.supplierList[_this.supplierSelectindex].address;
				data.rate = _this.model.rate; //税率
				data.money = money; //金额
				data.totalMoney = totalMoney; //加上税务金额
				data.status = 0;
				data.admin_id = 1;
				data.remark = _this.model.remark;
				data.storage_status = 0;
				_this._post_form('/api/ykjp/purchase/Order/add', data, (result) => {
					_this.$refs.uToast.show({
						title: '添加成功',
						type: 'success'
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.city = e.province.label + '/' + e.city.label + '/' + e.area.label;
			},
			// 供应商回调
			selectConfirm(e) {
				e.map((val, index) => {
					this.model.supplier = val.label;
					this.supplierSelectindex = val.value;

					this.model.linkman = this.supplierList[this.supplierSelectindex].contact;
					this.model.phone = this.supplierList[this.supplierSelectindex].phone;
					this.model.address = this.supplierList[this.supplierSelectindex].address;
				})
			},
			/* 选择仓库回调 */
			selectwarehouseConfirm(e) {
				e.map((val, index) => {
					this.model.currentWarehouseName = val.label;
					this.currentWarehouseIndex = val.value;
				})
			},
			/* 选择类型回调 */
			selecttypelistConfirm(e) {
				e.map((val, index) => {
					this.typelistIndex = val.value;
				})
			},
			/* 选择日期回调 */
			delivery_timeChange(e) {
				_this.model.delivery_time = e.result
				_this.delivery_timetime = _this.toTimeData(e.result)
			},
			onAddOrder(e) {
				uni.navigateTo({
					url: '../../pages/purchase/addpurchase'
				})
			},
			ondelOrder(index) {
				_this.commodityList.splice(index, index + 1)
			},
			// 扫条码
			onScan() {
				uni.scanCode({  
					scanType: ['barCode'],  
					success: function (res) {  
						_this.model.code = res.result
					}  
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}
	.title-wrap {
		display: inline-block;
	}
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>

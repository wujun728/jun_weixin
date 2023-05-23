<template>
	<!-- 采购录单 -->
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="客户名称" prop="customer">
				<u-input :border="border" type="select" :select-open="customerSheetShow" v-model="model.customer" placeholder="请选择客户"
				 @click="customerSheetShow = true"></u-input>
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
					<u-card class="ucard" :title="item.name" :sub-title="'￥' + (item.money*item.num).toString()" :thumb="item.image" margin='0rpx'
					 :foot-border-top="false">
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2">库存：{{ item.inventory }}{{ item.unit }}</text>
<!-- #dcead8 -->
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

		<u-calendar max-date="2050-01-01" v-model="delivery_timeSheetShow" mode="date" @change="delivery_timeChange" toolTip='交货时间'></u-calendar>
		<u-select mode="single-column" :list="customerSelectList" v-model="customerSheetShow" @confirm="selectConfirm"></u-select>
		
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
					customer: '',
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

				},
				rules: {
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

				customerSheetShow: false,
				customerList: {}, //供应商列表
				customerSelectList: [], //待选供应商列表
				customerSelectindex: 0, //选择的供应商索引

				delivery_timeSheetShow: false,
				delivery_timetime: null,

				/* 卡片 订单列表 */
				commodityList: [],


				/* 类型 交货方式:1=买家自提,2=卖方发货,3=代发*/
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
				return totalMoney.toFixed(2);
			}
		},
		onShow() {
			var list = uni.getStorageSync('commodityList');
			if (list) {
				for (let i = 0; i < list.length; i++) {
					let t = true;
					for (let j = 0; j < _this.commodityList.length; j++) {
						if (_this.commodityList[j].id == list[i].id) {
							t = false;
							continue;
						}
					}
					if (t) {
						t = true;
						_this.commodityList.push(list[i])
					}
				}
			}

			uni.removeStorageSync('commodityList')

		},
		onLoad() {
			_this = this;
			_this.getcustomerList()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getcustomerList() {
				_this._post_form('/api/ykjp/information/basisinfo/customerinfo/index', {}, (result) => {
					_this.customerSelectList = [];
					for (let i = 0; i < result.data.data.length; i++) {
						_this.customerSelectList.push({
							label: result.data.data[i].name,
							value: i,
						})
					}
					_this.setData({
						'customerList': result.data.data
					})
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid  && this.model.delivery_time != '' && _this.commodityList.length >
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
				data.customer_info_id = _this.customerList[_this.customerSelectindex].id; //客户id
				data.customer_name = _this.customerList[_this.customerSelectindex].name; //客户
				data.linkman = _this.customerList[_this.customerSelectindex].name; //联系人
				data.phone = _this.model.phone; //电话
				data.delivery_time = _this.delivery_timetime; //交货时间
				data.type = _this.typelistIndex + 1; //类型


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
				data.total_nums = wait_nums; //产品总数

				data.city = _this.customerList[_this.customerSelectindex].city;
				data.address = _this.customerList[_this.customerSelectindex].address;
				data.rate = _this.model.rate; //税率

				data.real_money = money; //金额
				data.theory_money = totalMoney.toFixed(2); //加上税务金额
				data.status = 0;
				data.admin_id = 1;
				data.remark = _this.model.remark;
				data.storage_status = 0;
				console.log(data);
				_this._post_form('/api/ykjp/sell/sell/addSell', data, (result) => {
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
					this.model.customer = val.label;
					this.customerSelectindex = val.value;

					this.model.linkman = this.customerList[this.customerSelectindex].contact;
					this.model.phone = this.customerList[this.customerSelectindex].phone;
					this.model.address = this.customerList[this.customerSelectindex].address;
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
				_this.delivery_timetime = _this.toTimeData(e.result)/1000
			},
			onAddOrder(e) {
				uni.navigateTo({
					url: 'addsell'
				})
			},
			ondelOrder(index) {
				_this.commodityList.splice(index, index + 1)
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
	.ucard{
		background-color: #eaffe5;
	}
</style>

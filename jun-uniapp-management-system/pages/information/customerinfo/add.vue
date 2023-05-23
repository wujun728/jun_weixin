<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
			 :label-position="labelPosition" label="客户名称" prop="name">
				<u-input :border="border" placeholder="请输入客户名称" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="edit-pen" label-width="180"
			 :label-position="labelPosition" label="联系人" prop="linkman">
				<u-input :border="border" placeholder="请输入联系人" v-model="model.linkman" type="text"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="phone" :label-position="labelPosition" label="手机号码" prop="phone" label-width="150">
				<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="phone" :label-position="labelPosition" label="座机号码" prop="phone" label-width="150">
				<u-input :border="border" placeholder="请输入公司公司电话" v-model="model.telephone" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地区" prop="city" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.city" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="car" label-width="180"
			 :label-position="labelPosition" label="详细地址" prop="address">
				<u-input :border="border" placeholder="请输入详细地址" v-model="model.address" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="说明" prop="remark">
				<u-input type="textarea" :border="border" placeholder="请填写说明" v-model="model.remark" />
			</u-form-item>
		</u-form>
		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				model: {
					name: '',
					linkman:'',
					address:'',
					city:'',
					remark:'',
					phone:'',
					telephone:'',
					type:'',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur',
						}
					],
					linkman: [{
							required: true,
							message: '请输入联系人',
							trigger: 'blur',
						}
					],
					city: [
						{
							required: true, 
							message: '请选择地区',
							trigger: 'change',
						}
					],
					type: [
						{
							required: true, 
							message: '请选择仓库类型',
							trigger: 'change',
						}
					],
					phone: [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					telephone: [
						{
							required: true, 
							message: '请输入座机号码',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '座机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
				},
				pickerShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				unitList: [],
				unitListShow: false,
				selectList:[{
					label:'自有仓',
					value:'自有仓',
				},{
					label:'合作仓',
					value:'合作仓',
				}],
			}
		},
		onLoad() {
			_this = this;
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						_this._post_form('/api/ykjp/information/basisinfo/customerinfo/add', {
							name:_this.model.name,
							linkman:_this.model.linkman,
							address:_this.model.address,
							city:_this.model.city,
							remark:_this.model.remark,
							phone:_this.model.phone,
							telephone:_this.model.telephone,
						}, (result) => {
							_this.$refs.uToast.show({
								title: '添加成功',
								type: 'success',
								back: true
							})
						});
					}else{
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error'
						})
					}
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.city = e.province.label + '/' + e.city.label + '/' + e.area.label;
			},
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}
</style>

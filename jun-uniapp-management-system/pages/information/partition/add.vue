<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
			 :label-position="labelPosition" label="仓库名称" prop="name">
				<u-input :border="border" placeholder="请输入仓库名称" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="所属仓库" prop="warehouse">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.warehouse" placeholder="请选择所属仓库"
				 @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="描述" prop="remark">
				<u-input type="textarea" :border="border" placeholder="请填写描述" v-model="model.remark" />
			</u-form-item>
		</u-form>
		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="actionSheetShow" @confirm="selectConfirm"></u-select>
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
					remark:'',
					warehouse: '',
					warehouse_id:0,
				},
				rules: {
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur',
						}
					],
					warehouse: [
						{
							required: true, 
							message: '请选择仓库类型',
							trigger: 'change',
						}
					],
				},
				actionSheetShow: false,
				pickerShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				unitList: [],
				unitListShow: false,
				selectList:[],
			}
		},
		onLoad() {
			_this = this;
			_this._post_form('/api/ykjp/information/basisinfo/warehouse/index', {}, (result) => {
				for (let i=0;i<result.data.data.length;i++) {
					result.data.data[i].label = result.data.data[i].name
					result.data.data[i].value = result.data.data[i].ID
				}
				let a = result.data.data;
				_this.setData({'selectList':a})
			});
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						_this._post_form('/api/ykjp/information/basisinfo/partition/add', {
							name:_this.model.name,
							remark:_this.model.remark,
							warehouse_id:_this.model.warehouse_id,
						}, (result) => {
							_this.$refs.uToast.show({
								title: '添加成功',
								type: 'success'
							})
							
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						});
					}else{
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error'
						})
					}
				});
			},
			// 选择商品类型回调
			selectConfirm(e) {
				e.map((val, index) => {
					this.model.warehouse =  val.label;
					this.model.warehouse_id = val.value;
				})
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

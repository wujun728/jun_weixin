<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="商品图片" prop="photo" label-width="150">
				<u-upload width="160" max-count="1" :auto-upload="false" ref="uUpload" @on-choose-complete="onchoosecomplete"
				 @on-remove="onremovechoose"></u-upload>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
			 :label-position="labelPosition" label="商品名称" prop="commodity">
				<u-input :border="border" placeholder="请输入商品名称" v-model="model.commodity" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="商品类型" prop="name">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.name" placeholder="请选择商品类型"
				 @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="edit-pen" label-width="180"
			 :label-position="labelPosition" label="商品规格" prop="specification">
				<u-input :border="border" placeholder="请输入商品规格" v-model="model.specification" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="car" label-width="180"
			 :label-position="labelPosition" label="SKU" prop="sku">
				<u-input :border="border" placeholder="请输入SKU" v-model="model.sku" type="number"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="商品单位" prop="unit">
				<u-input :border="border" type="select" :select-open="unitListShow" v-model="model.unit" placeholder="请选择商品单位"
				 @click="unitListShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="备注" prop="intro">
				<u-input type="textarea" :border="border" placeholder="请填写备注" v-model="model.intro" />
			</u-form-item>
		</u-form>
		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="actionSheetShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="unitList" v-model="unitListShow" @confirm="unitListfirm"></u-select>
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
					commodity: '',
					specification:'',
					product_type_id:0,
					sku:'',
					unit:'',
					intro:'',
					product_unit_id:0,
					prop:[{"title":"","value":""}],
				},
				rules: {
					commodity: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur',
						}
					],
					specification: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur',
						}
					]
				},
				actionSheetShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				selectList: [],
				unitList: [],
				unitListShow: false,
			}
		},
		onLoad() {
			_this = this;
			_this.getUnitList();
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			onremovechoose(index,list){
				this.imageUrl = null;
			},
			onchoosecomplete(list){
				this.imageUrl = list[0].url;
			},
			getUnitList() {
				_this._post_form('/api/ykjp/product/type/getType', {}, (result) => {
					for (let i=0;i<result.data.data.length;i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = result.data.data[i].id
					}
					_this.setData({'selectList':result.data.data})
				});
				_this._post_form('/api/ykjp/product/unit/getUnitList', {}, (result) => {
					for (let i=0;i<result.data.data.length;i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = result.data.data[i].id
					}
					_this.setData({'unitList':result.data.data})
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid && this.imageUrl) {
						this.sendImage();
					}else{
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error'
						})
					}
				});
			},
			sendImage(){
				uni.uploadFile({
					url: _this.api_root + 'api/common/upload', 
					filePath: _this.imageUrl,
					name: 'file',
					success: function(res) {
						var e = JSON.parse(res.data)
						if (e.code == 1) {
						_this.model.prop[0].title = _this.model.name
						_this._post_form('/api/ykjp/product/product/add', {
							name:_this.model.commodity,
							product_type_id:_this.model.product_type_id,
							specification:_this.model.specification,
							sku:_this.model.sku,
							prop:JSON.stringify(_this.model.prop),
							remark:_this.model.intro,
							product_unit_id:_this.model.product_unit_id,
							unit:_this.model.unit,
							image:e.data.url,
						}, (result) => {
							_this.$refs.uToast.show({
								title: '添加成功',
								type: 'success',
								back: true
							})
						});
						}
					},
					complete: function(res) {	
					}
				});
			},
			// 选择商品类型回调
			selectConfirm(e) {
				e.map((val, index) => {
					this.model.name =  val.label;
					this.model.product_type_id = val.value
				})
			},
			unitListfirm(e){
				e.map((val, index) => {
					this.model.unit =  val.label;
					this.model.product_unit_id = val.value
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

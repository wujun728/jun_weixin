<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="分类图片" prop="photo" label-width="150">
				<u-upload width="160" max-count="1" :auto-upload="false" ref="uUpload" @on-choose-complete="onchoosecomplete"
				 @on-remove="onremovechoose"></u-upload>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="180"
			 :label-position="labelPosition" label="上级分类" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.name" placeholder="请选择上级分类"
				 @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="coupon" label-width="180"
			 :label-position="labelPosition" label="分类名称" prop="commodity">
				<u-input :border="border" placeholder="请输入分类名称" v-model="model.commodity" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="edit-pen" label-width="180"
			 :label-position="labelPosition" label="分类属性" prop="mode">
				<u-input :border="border" placeholder="请输入分类属性" v-model="model.mode" type="text"></u-input>
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
					commodity: '',
					mode:'',
					pid:0,
				},
				rules: {
					commodity: [{
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
			getUnitList() {
				_this._post_form('/api/ykjp/product/type/getType', {}, (result) => {
					for (let i=0;i<result.data.data.length;i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = result.data.data[i].id
					}
					_this.setData({'selectList':result.data.data})
				});
			},
			onchoosecomplete(list){
				this.imageUrl = list[0].url;
			},
			onremovechoose(index,list){
				this.imageUrl = null;
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
							_this._post_form('/api/ykjp/product/type/add', {
								pid:_this.model.pid,
								name:_this.model.commodity,
								props:_this.model.mode,
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
					this.model.pid = val.value
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

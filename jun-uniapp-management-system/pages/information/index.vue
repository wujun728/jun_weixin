<template>
	<u-table text-align="left">
		<u-tr class="u-tr">
			<u-th class="u-th">商品名称</u-th>
			<u-th class="u-th">库存</u-th>
			<!-- <u-th class="u-th">规格</u-th> -->
			<u-th class="u-th">仓库</u-th>
			<u-th class="u-th">库区</u-th>
			<u-th class="u-th">更新时间</u-th>
		</u-tr>
		<u-tr class="u-tr" v-for="(item, index) in list" :key="index">
			<u-td class="u-td">{{item.name}}</u-td>
			<u-td class="u-td">{{item.inventory}}</u-td>
			<!-- <u-td class="u-td">{{item.specification}}</u-td> -->
			<u-td class="u-td">{{item.w_name}}</u-td>
			<u-td class="u-td">{{item.p_name}}</u-td>
			<u-td class="u-td">{{$u.timeFormat(item.updatetime, 'yyyy-mm-dd')}}</u-td>
		</u-tr>
	</u-table>
</template>

<script>
	var _this;
	export default{
		data(){
			return{
				list:[],
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			this.getlist()
		},
		methods:{
			getlist(){
				_this._post_form('/api/ykjp/inventory/wp/index', {
				}, (result) => {
					_this.list = result.data.data;
				});
			}
		}
	}
</script>

<style>
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
	@import "utils/_utils.scss";
	/*每个页面公共css */
	page {
		background-color: #f4f5f6;
	}
	.white{
		background-color: #fff;
	}
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}
	.font-weight-bold{
		font-weight: bold;	
	}
</style>

# liu-calendar适用于uni-app项目的精美日历组件
### 本组件兼容小程序、H5
### 介绍：本组件常用语打卡，日历，待办日历事项等业务逻辑中，组件代码清晰，注释全，非常适合自己DIY或学习
###如使用过程中有问题或有一些好的建议，欢迎qq联系：2364518038

### 使用方式（uni_modules版本）
``` html
<liu-calendar @change="getDate" @checked="checkDate"></liu-calendar>
```
``` javascript
export default {
	data() {
		return {}
	},
	methods: {
		//获取选中的月份
		getDate(e){
			console.log('选中的月份：'+e.value)
		},
		//获取选中的日期
		checkDate(e){
			console.log('选中的日期：'+e.value)
		}
	}
}
```
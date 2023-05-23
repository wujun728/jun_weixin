/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
import config from '@/common/config.js';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token', 'vuex_remember', 'vuex_locale','vuex_isAgent'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
// 简化 vuex 操作，文档：https://uviewui.com/components/vuexDetail.html
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {userName: 'Aidex'},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_remember: lifeData.vuex_remember ? lifeData.vuex_remember : '',
		vuex_locale: lifeData.vuex_locale ? lifeData.vuex_locale : '',
		vuex_isAgent: lifeData.vuex_isAgent ? lifeData.vuex_isAgent : '',
		
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_config: config,
		
		// 自定义tabbar数据
		// vuex_tabbar: [{
		// 		iconPath: "/static/uview/example/component.png",
		// 		selectedIconPath: "/static/uview/example/component_select.png",
		// 		text: '组件',
		// 		pagePath: '/pages/example/components'
		// 	},
		// 	{
		// 		iconPath: "/static/uview/example/js.png",
		// 		selectedIconPath: "/static/uview/example/js_select.png",
		// 		text: '工具',
		// 		midButton: true,
		// 		pagePath: '/pages/example/js'
		// 	},
		// 	{
		// 		iconPath: "/static/uview/example/template.png",
		// 		selectedIconPath: "/static/uview/example/template_select.png",
		// 		text: '模板',
		// 		pagePath: '/pages/example/template'
		// 	}
		// ]
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store

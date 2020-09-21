const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    listData: {
      cells: [
        {
          iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_117.jpg?x-oss-process=style/preview_120",
          linkUrl: "address.html",
          text: "收货地址",
          color: "#777777"
        },
        {
          iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_432.jpg?x-oss-process=style/preview_120",
          linkUrl: "my_favorite.html",
          text: "我的收藏",
          color: "#777777"
        },
        {
          iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_434.jpg?x-oss-process=style/preview_120",
          linkUrl: "my_coupons.html",
          text: "优惠券",
          color: "#777777"
        },
        {
          iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_429.jpg?x-oss-process=style/preview_120",
          linkUrl: "",
          id: "1",
          text: "在线客服",
          color: "#777777"
        },
        {
          iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_420.jpg?x-oss-process=style/preview_120",
          linkUrl: "custom_page_my_newlist?pageNage=常见问题",
          text: "常见问题",
          color: "#777777"
        }
      ],
      column: 3,
      showType: 0
    },
  },
  ready: function () {
    let that = this;
    console.log('=====导航=====', this.data.data)
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);


      // wx.navigateTo({
      //   url: '/pages/' + event.currentTarget.dataset.page + '/index'
      // })
    }
  },
})
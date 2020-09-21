//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[
      "../../image/01.jpg",
      "../../image/02.jpg",
      "../../image/03.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    typelist: [
      {
        pic: "notebook",
        id: 1,
        name: "笔记本",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "ts",
        id: 2,
        name: "台式机",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "ws",
        id: 3,
        name: "电脑外设",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "sjpj",
        id: 4,
        name: "手机配件",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "sj",
        id: 5,
        name: "智能手机",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "pcpj",
        id: 6,
        name: "pc配件",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "shuma",
        id: 7,
        name: "数码",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
      {
        pic: "znpd",
        id: 8,
        name: "智能穿戴",
        goods: [
          {
            id: 1,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 2,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 3,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          },
          {
            id: 4,
            title: "雷柏v500 RGB机械键盘",
            pic: "../../image/03.jpg",
            price: 169,
          }
        ]
      },
    ]
  },
  onLoad: function () {
    console.log('onload');
  }
})

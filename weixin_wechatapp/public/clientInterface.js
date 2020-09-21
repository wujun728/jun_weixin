var Client = {
    "title": "三三云服客户端数据接口集合定义",
    "version": "1.0.0",
    "engine": "mockjs",
    "rulebase": "./interfaceRules/",
    "status": "online",
    "client_url": "https://mini.sansancloud.com/chainalliance/shuiguo",
    "project_no": "jianzhan",

    "Client.SuperShopManager.MiniStore.code": {
      "name": "门店支付二维码",
      "id": "Client.SuperShopManager.MiniApp.GetWxAuthPageLink",
      "args": [

      ],
      "url": "/super_shop_manager_get_mini_code.html"
    },
    "Client.Set.SessionLocation": {
        "name": "设置会话用户的地址信息",
        "id": "Set.SessionLocation",
        "method": "all",
        "args": [{
            "name": "longitude",
            "type": "String",
            "remark": "经度"
        },
        {
            "name": "latitude",
            "type": "String",
            "remark": "维度"
        },
        {
            "name": "province",
            "type": "String",
            "remark": "省"
        },
        {
            "name": "city",
            "type": "String",
            "remark": "市"
        },
        {
            "name": "district",
            "type": "String",
            "remark": "区"
        },
        {
            "name": "street",
            "type": "String",
            "remark": "街道"
        },
        {
            "name": "streetNumber",
            "type": "String",
            "remark": "门牌号"
        }

        ],
        "url": "/setLocation.html"

    },
    "Client.Area.SetLocateArea": {
        "name": "设置区域",
        "id": "Client.Area.SetLocateArea",
        "method": "post",
        "args": [


        ],
        "url": "/setLocateArea.html"

    },
    "Client.Area.ListAllArea": {
        "name": "获取所有区域",
        "id": "Client.Area.ListAllArea",
        "method": "get",
        "args": [


        ],
        "url": "/list_all_area.html"

    },
    "Client.Config.SetDeviceWidth": {
        "name": "设置设备宽度",
        "id": "Client.Config.SetDeviceWidth",
        "method": "post",
        "args": [{
            "name": "deviceWidth",
            "type": "double",
            "remark": "设备宽度"
        }

        ],
        "url": "/set_device_width.html"

    },
    "Client.GetPlatformSetting": {
        "name": "获得平台设置",
        "id": "Client.GetPlatformSetting",
        "method": "get",
        "args": [{

        }

        ],
        "url": "/get_platform_setting.html"

    },
    "Client.Get.ProductShopViewListMore": {
        "name": "获得产品列表（店铺视角）",
        "id": "Client.Get.ProductShopViewListMore",
        "method": "get",
        "args": [{
            "name": "categoryId",
            "type": "int",
            "remark": "产品类型ID"
        },
        {
            "name": "page",
            "type": "String",
            "remark": "页数"
        },
        {
            "name": "belongShop",
            "type": "int",
            "remark": "归属店铺ID"
        }

        ],
        "url": "/more_product_shop_view_list.html"

    },

    "Client.Get.ProductListMore": {
        "name": "获得产品列表",
        "id": "Client.Get.ProductListMore",
        "method": "get",
        "args": [{
            "name": "categoryId",
            "type": "int",
            "remark": "产品类型ID"
        },
        {
            "name": "page",
            "type": "String",
            "remark": "页数"
        }, {
            "name": "saleTypeId",
            "type": "String",
            "remark": "销售类型ID"
        },
        {
            "name": "belongShop",
            "type": "int",
            "remark": "归属店铺ID"
        }

        ],
        "url": "/more_product_list.html"

    },

    "Client.Get.SaleProductListMore": {
        "name": "获得产品列表",
        "id": "Client.Get.SaleProductListMore",
        "method": "get",
        "args": [{
            "name": "saleTypeId",
            "type": "int",
            "remark": "销售类型ID"
        },
        {
            "name": "page",
            "type": "String",
            "remark": "页数"
        }
        ],
        "url": "/more_sale_product_list.html"

    },
    "Client.Get.GetDeepSaleTypeItems": {
        "name": "深度遍历获得销售类型子项",
        "id": "Client.Get.GetDeepSaleTypeItems",
        "method": "get",
        "args": [{
            "name": "saleTypeId",
            "type": "int",
            "remark": "销售类型ID"
        }

        ],
        "url": "/get_deep_sale_type_items.html"

    },
    "Client.Search.GetShopProduct": {
        "name": "查看店铺分类",
        "id": "Search.ShopTypes",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        },
        {
            "name": "productName",
            "type": "String",
            "remark": "产品名"
        },
        {
            "name": "shopProductType",
            "type": "int",
            "remark": "店铺分类"
        },
        {
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        }
        ],
        "url": "/search_shop_items_list.html"

    },

    "Client.Lease.CreateLeaseRentOrder": {
        "name": "创建租赁费用订单",
        "id": "Client.Lease.CreateLeaseRentOrder",
        "method": "post",
        "args": [{
            "name": "leaseRecordId",
            "type": "int",
            "remark": "平台用户ID"
        }],
        "url": "/create_lease_rent_order.html"

    },

    "Client.Lease.GetUserLeaseRecord": {
        "name": "用户租赁记录",
        "id": "Client.Lease.UserLeaseRecords",
        "method": "get",
        "args": [{
            "name": "leaseRecordId",
            "type": "int",
            "remark": "平台用户ID"
        }],
        "url": "/get_lease_record_detail.html"

    },
    "Client.User.GetVisitItems": {
        "name": "获取用户访问记录",
        "id": "Client.User.GetVisitItems",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "page"
            }, {
                "name": "visitType",
                "type": "int",
                "remark": "访问类型 1 产品 2 店铺 3 新闻 4 用户"

            }
        ],
        "url": "/get_user_visit_items.html"

    },
    "Client.User.DiaryCenterDetail": {
        "name": "日志中心详情",
        "id": "Client.User.DiaryCenterDetail",
        "method": "get",
        "args": [

            {
                "name": "platformUserId",
                "type": "int",
                "remark": "平台用户ID"
            }
        ],
        "url": "/get_diary_center_detail.html"

    },
    "Client.User.NearUsers": {
        "name": "根据地址位置获得最近用户列表",
        "id": "Client.User.NearUsers",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "分页页码"
            }
        ],
        "url": "/get_near_users.html"

    },
    "Client.Get.NearShopsMore": {
        "name": "获得附近店铺",
        "id": "Client.Get.NearShopsMore",
        "method": "get",
        "args": [{
            "name": "longitude",
            "type": "String",
            "remark": "精度"
        },
        {
            "name": "page",
            "type": "String",
            "remark": "页数"
        },
        {
            "name": "latitude",
            "type": "String",
            "remark": "维度"
        },
        {
            "name": "shopName",
            "type": "String",
            "remark": "店铺名"
        }

        ],
        "url": "/more_near_shops.html"

    },



    "Client.Get.NewsList": {
        "name": "获得新闻列表",
        "id": "Client.Get.NewsList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "String",
                "remark": "页数"
            },

            {
                "name": "newsTypeId",
                "type": "int",
                "remark": "新闻类型ID"
            }
        ],
        "url": "/more_news_list.html"

    },



    "Client.Get.NewsBbsList": {
        "name": "获得BBS帖子列表",
        "id": "Client.Get.NewsBbsList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "String",
                "remark": "页数"
            },

            {
                "name": "newsTypeId",
                "type": "int",
                "remark": "新闻类型ID"
            }
        ],
        "url": "/more_news_bbs_list.html"

    },


    "Client.Get.NewsType": {
        "name": "获取新闻类型",
        "id": "Client.Get.NewsType",
        "method": "get",
        "args": [


            {
                "name": "newsTypeId",
                "type": "int",
                "remark": "新闻类型ID"
            }
        ],
        "url": "/get_news_type.html"

    },
    "Client.Get.UserNewsBbsList": {
        "name": "获得用户BBS帖子列表",
        "id": "Client.Get.UserNewsBbsList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "String",
                "remark": "页数"
            },

            {
                "name": "newsTypeId",
                "type": "int",
                "remark": "新闻类型ID"
            }
        ],
        "url": "/user_news_bbs_list.html"

    },
    "Client.Bbs.NewsDetail": {
        "name": "获得帖子详情",
        "id": "Client.Bbs.NewsDetail",
        "method": "get",
        "args": [


            {
                "name": "newsId",
                "type": "int",
                "remark": "新闻ID"
            }
        ],
        "url": "/get_news_bbs_detail.html"
    },


    "Client.Bbs.NewsBbsComments": {
        "name": "获得新闻评论",
        "id": "Client.Bbs.NewsBbsComments",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            },
            {
                "name": "additionTopic",
                "type": "int",
                "remark": "补充主题"
            },
            {
                "name": "newsId",
                "type": "int",
                "remark": "新闻ID"
            }
        ],
        "url": "/get_news_bbs_comments.html"

    },


    "Client.Bbs.NewsBbsRecomments": {
        "name": "获得评论的再评论",
        "id": "Client.Bbs.NewsBbsRecomments",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            },
            {
                "name": "commentId",
                "type": "int",
                "remark": "回复Id"
            }

        ],
        "url": "/get_news_bbs_recomments.html"

    },

    "Client.Bbs.AddBbsRecomment": {
        "name": "新增回复的评论",
        "id": "Client.Bbs.AddBbsRecomment",
        "method": "post",
        "args": [

            {
                "name": "commentId",
                "type": "int",
                "remark": "评论ID"
            },
            {
                "name": "comment",
                "type": "String",
                "remark": "评论内容"
            }
        ],
        "url": "/add_bbs_recomments.html"

    },
    "Client.Bbs.AddBbsComment": {
        "name": "新增新闻评论",
        "id": "Client.Bbs.AddBbsComment",
        "method": "post",
        "args": [

            {
                "name": "newsId",
                "type": "int",
                "remark": "新闻ID"
            },
            {
                "name": "comment",
                "type": "String",
                "remark": "评论内容"
            }
        ],
        "url": "/add_bbs_comments.html"

    },

    "Client.AfterSale.SetAfterSaleUserFeedback": {
        "name": "用户设置反馈信息",
        "id": "Client.AfterSale.SetAfterSaleUserFeedback",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "售后工单号"
        }, {
            "name": "afterSaleCaseId",
            "type": "int",
            "remark": "caseId"
        }, {
            "name": "afterSalePhaseId",
            "type": "int",
            "remark": "步骤id"
        }, {
            "name": "userPhotos",
            "type": "String",
            "remark": "图像json"
        }, {
            "name": "userInput",
            "type": "String",
            "remark": "用户输入描述"
        }, {
            "name": "userResult",
            "type": "int",
            "remark": "用户选择答案"
        }],
        "url": "/set_after_sale_user_feedback.html"

    },
    "Client.AfterSale.GetAfterSaleBackExpress": {
        "name": "获得售后工单物流",
        "id": "Client.AfterSale.GetAfterSaleBackExpress",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "售后工单号"
        }],
        "url": "/get_after_sale_back_express_detail.html"

    },

    "Client.Bbs.DeleteBbsComment": {
        "name": "新增新闻评论",
        "id": "Client.Bbs.AddBbsComment",
        "method": "post",
        "args": [

            {
                "name": "commentId",
                "type": "int",
                "remark": "新闻评论ID"
            }
        ],
        "url": "/delete_bbs_comments.html"

    },

    "Client.Bbs.DeleteBbsNews": {
        "name": "新增新闻评论",
        "id": "Client.Bbs.DeleteBbsNews",
        "method": "post",
        "args": [

            {
                "name": "newsId",
                "type": "int",
                "remark": "新闻ID"
            }
        ],
        "url": "/delete_bbs_news.html"

    },

    "Client.Bbs.CreateBbsNews": {
        "name": "新增新闻",
        "id": "Client.Bbs.CreateBbsNews",
        "method": "post",
        "args": [

            {
                "name": "title",
                "type": "String",
                "remark": "标题"
            },
            {
                "name": "content",
                "type": "String",
                "remark": "内容"
            },
            {
                "name": "imagePath",
                "type": "String",
                "remark": "封面"
            },
            {
                "name": "description",
                "type": "String",
                "remark": "描述"
            },
            {
                "name": "newsType",
                "type": "int",
                "remark": "新闻类型"
            }
        ],
        "url": "/add_bbs_news.html"

    },

    "Client.Bbs.ChangeBbsNewsName": {
        "name": "新增新闻",
        "id": "Client.Bbs.ChangeBbsNewsName",
        "method": "post",
        "args": [

            {
                "name": "title",
                "type": "String",
                "remark": "标题"
            }

        ],
        "url": "/change_bbs_news_name.html"

    },
    "Client.GetVerifyCode": {
        "name": "获取验证码",
        "id": "Client.GetVerifyCode",
        "method": "post",
        "args": [{
            "name": "telno",
            "type": "String",
            "remark": "手机号码"
        },
        {
            "name": "type",
            "type": "int",
            "remark": "不传输注册时使用 1 找回密码时使用   2绑定手机号码时使用  3 手机验证码登陆时 "
        }
        ],
        "url": "/get_verify_code.html"

    },
    "Client.BindTelno": {
        "name": "绑定电话号码",
        "id": "Client.BindTelno",
        "method": "post",
        "args": [{
            "name": "telno",
            "type": "String",
            "remark": "手机号码"
        },
        {
            "name": "verifyCode",
            "type": "String",
            "remark": "验证码"
        }
        ],
        "url": "/bind_telno.html"

    },

    "Client.User.BindWxOpenId": {
        "name": "绑定微信openid",
        "id": "Client.User.BindWxOpenId",
        "method": "post",
        "args": [{
            "name": "unionId",
            "type": "String",
            "remark": "微信unionid"
        }, {
            "name": "openid",
            "type": "String",
            "remark": "微信openid"
        }, {
            "name": "wxAppLogin",
            "type": "int",
            "remark": "0 微信 1 app  2 pc"
        }],
        "url": "/bind_wx_openid.html"

    },
    "Client.UnBindTelno": {
        "name": "解除绑定电话号码",
        "id": "Client.UnBindTelno",
        "method": "post",
        "args": [

        ],
        "url": "/un_bind_telno.html"

    },
    "Client.User.BindErp": {
        "name": "绑定Erp",
        "id": "Client.User.BindErp",
        "method": "post",
        "args": [{
            "name": "username",
            "type": "String",
            "remark": "erp用户名"
        },
        {
            "name": "password",
            "type": "String",
            "remark": "erp密码"
        }
        ],
        "url": "/bind_erp.html"

    },
    "Client.User.Regist": {
        "name": "用户注册",
        "id": "Client.User.Regist",
        "method": "all",
        "args": [{
            "name": "username",
            "type": "String",
            "remark": "用户名"
        },
        {
            "name": "password",
            "type": "String",
            "remark": "密码"
        },
        {
            "name": "password2",
            "type": "String",
            "remark": "密码2"
        },
        {
            "name": "verifyCode",
            "type": "String",
            "remark": "验证码"
        }
        ],
        "url": "/regist.html"

    },


    "Client.User.Regist2": {
        "name": "用户注册",
        "id": "Client.User.Regist2",
        "method": "all",
        "args": [{
            "name": "username",
            "type": "String",
            "remark": "用户名"
        },
        {
            "name": "password",
            "type": "String",
            "remark": "密码"
        },
        {
            "name": "password2",
            "type": "String",
            "remark": "密码2"
        },
        {
            "name": "nickname",
            "type": "String",
            "remark": "昵称"
        }
        ],
        "url": "/regist2.html"

    },
    "Client.User.ChangePassword": {
        "name": "密码变更",
        "id": "Client.User.ChangePassword",
        "method": "post",
        "args": [{
            "name": "username",
            "type": "String",
            "remark": "用户名"
        },
        {
            "name": "password",
            "type": "String",
            "remark": "密码"
        },
        {
            "name": "password2",
            "type": "String",
            "remark": "密码2"
        },
        {
            "name": "verifyCode",
            "type": "String",
            "remark": "验证码"
        }
        ],
        "url": "/change_password.html"

    },

    "Client.User.ChangePassword2": {
        "name": "密码变更",
        "id": "Client.User.ChangePassword2",
        "method": "post",
        "args": [{
            "name": "oldPassword",
            "type": "String",
            "remark": "旧密码"
        },
        {
            "name": "newPassword",
            "type": "String",
            "remark": "新密码"
        },
        {
            "name": "newPassword2",
            "type": "String",
            "remark": "新密码2"
        }
        ],
        "url": "/change_password2.html"

    },

    "Client.User.ChangeUserInfo": {
        "name": "用户资料变更",
        "id": "Client.User.ChangeUserInfo",
        "method": "post",
        "args": [{
            "name": "headimg",
            "type": "String",
            "remark": "头像"
        },
        {
            "name": "nickname",
            "type": "String",
            "remark": "昵称"
        },
        {
            "name": "telno",
            "type": "String",
            "remark": "电话"
        },
        {
            "name": "userTip",
            "type": "String",
            "remark": "个性签名"
        },
        {
            "name": "sex",
            "type": "int",
            "remark": "性别"
        }
        ],
        "url": "/change_user_info.html"

    },
    "Client.User.Login": {
        "name": "登陆",
        "id": "Client.User.Login",
        "method": "all",
        "args": [

            {
                "name": "loginType",
                "type": "int",
                "remark": "登录类型0 普通  1 微信  2 短信验证码"
            },
            {
                "name": "telno",
                "type": "String",
                "remark": "绑定手机号码"
            }, {
                "name": "verifyCode",
                "type": "String",
                "remark": "验证码"
            },
            {
                "name": "username",
                "type": "String",
                "remark": "用户名"
            },

            {
                "name": "password",
                "type": "String",
                "remark": "密码"
            }
        ],
        "url": "/login.html"

    },

    "Client.User.WxPcCodeLogin": {
        "name": "PC授权码登陆",
        "id": "Client.User.WxPcCodeLogin",
        "method": "post",
        "args": [{
            "name": "code",
            "type": "String",
            "remark": "授权码"
        }],
        "url": "/wx_pc_code_login.html"

    },
    "Client.User.WxAppCodeLogin": {
        "name": "app授权码登陆",
        "id": "Client.User.WxAppCodeLogin",
        "method": "post",
        "args": [

            {
                "name": "code",
                "type": "String",
                "remark": "授权码"
            },
            {
                "name": "refreshToken",
                "type": "String",
                "remark": "刷新授权码"
            }
        ],
        "url": "/wx_app_code_login.html"

    },
    "Client.User.AddressList": {
        "name": "获得地址列表",
        "id": "Client.User.AddressList",
        "method": "get",
        "args": [


        ],
        "url": "/get_login_user_address_list.html"

    },
    "Client.User.SelectAddressList": {
        "name": "获得地址列表",
        "id": "Client.User.SelectAddressList",
        "method": "get",
        "args": [


        ],
        "url": "/select_login_user_address_list.html"

    },
    "Client.User.AddressAdd": {
        "name": "新增地址",
        "id": "Client.User.AddressAdd",
        "method": "all",
        "args": [{
            "name": "contanctName",
            "type": "String",
            "remark": "姓名"
        },
        {
            "name": "telno",
            "type": "String",
            "remark": "电话号码"
        }, {
            "name": "province",
            "type": "String",
            "remark": "省份"
        }, {
            "name": "city",
            "type": "String",
            "remark": "市"
        }, {
            "name": "district",
            "type": "String",
            "remark": "区（县）"
        }, {
            "name": "detail",
            "type": "String",
            "remark": "详细地址）"
        }, {
            "name": "longitude",
            "type": "String",
            "remark": "经度）"
        }, {
            "name": "latitude",
            "type": "String",
            "remark": "维度）"
        }, {
            "name": "defaultAddress",
            "type": "int",
            "remark": "默认地址）"
        }

        ],
        "url": "/add_address.html"

    },

    "Client.User.AddressModify": {
        "name": "修改地址",
        "id": "Client.User.AddressModify",
        "method": "all",
        "args": [{
            "name": "contanctName",
            "type": "String",
            "remark": "姓名"
        },
        {
            "name": "telno",
            "type": "String",
            "remark": "电话号码"
        }, {
            "name": "province",
            "type": "String",
            "remark": "省份"
        }, {
            "name": "city",
            "type": "String",
            "remark": "市"
        }, {
            "name": "district",
            "type": "String",
            "remark": "区（县）"
        }, {
            "name": "detail",
            "type": "String",
            "remark": "详细地址）"
        }, {
            "name": "longitude",
            "type": "String",
            "remark": "经度）"
        }, {
            "name": "latitude",
            "type": "String",
            "remark": "维度）"
        }, {
            "name": "defaultAddress",
            "type": "int",
            "remark": "默认地址）"
        }, {
            "name": "addressId",
            "type": "int",
            "remark": "地址ID"
        }

        ],
        "url": "/edit_address.html"

    },

    "Client.User.AddressDelete": {
        "name": "删除地址",
        "id": "Client.User.AddressDelete",
        "method": "post",
        "args": [{
            "name": "addressId",
            "type": "int",
            "remark": "地址ID"
        }

        ],
        "url": "/delete_address.html"

    },
    "Client.User.AddressSetDefault": {
        "name": "修改地址",
        "id": "Client.User.AddressSetDefault",
        "method": "post",
        "args": [{
            "name": "addressId",
            "type": "int",
            "remark": "地址ID"
        }

        ],
        "url": "/set_default_address.html"

    },


    "Client.User.ChangeCarItemCount": {
        "name": "修改购物车项目数量",
        "id": "Client.User.ChangeCarItemCount",
        "method": "post",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "商品ID"
        },
        {
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        },

        {
            "name": "count",
            "type": "int",
            "remark": "数量"
        },
        {
            "name": "cartesionId",
            "type": "int",
            "remark": "规格集ID"
        },
        {
            "name": "type",
            "type": "String",
            "remark": "类型(add dec change)"
        }

        ],
        "url": "/change_shopping_car_item.html"

    },


    "Client.User.CarItemList": {
        "name": "获得购物车列表",
        "id": "Client.User.CarItemList",
        "method": "get",
        "args": [


        ],
        "url": "/get_shopping_car_list_item.html"

    },



    "Client.User.CarItemdDelete": {
        "name": "从购物车中删除商品",
        "id": "Client.User.CarItemdDelete",
        "method": "post",
        "args": [{
            "name": "shopId",
            "type": "String",
            "remark": "店铺ID"
        },
        {
            "name": "type",
            "type": "String",
            "remark": "类型(all selected shopall)"
        }, {
            "name": "selectedIds",
            "type": "String",
            "remark": "选中ID 以逗号分隔开"
        }


        ],
        "url": "/delete_shopping_car_list_item.html"

    },

    "Client.User.CarItemsCreateOrder": {
        "name": "选中的商品生成订单",
        "id": "Client.User.CarItemsCreateOrder",
        "method": "post",
        "args": [{
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        },
        {
            "name": "selectedIds",
            "type": "String",
            "remark": "选中ID 以逗号分隔开"
        }, {
            "name": "promotionId",
            "type": "String",
            "remark": "活动id"
        }


        ],
        "url": "/shopping_car_list_item_create_order.html"

    },
    "Client.User.ListPromotionsByCarItems": {
        "name": "根据选中的商品获取活动列表",
        "id": "Client.User.ListPromotionsByCarItems",
        "method": "post",
        "args": [{
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        },
        {
            "name": "selectedIds",
            "type": "String",
            "remark": "选中ID 以逗号分隔开"
        }

        ],
        "url": "/list_promotions_by_car_items.html"

    },


    "Client.User.BuyNow": {
        "name": "立即购买商品",
        "id": "Client.User.BuyNow",
        "method": "post",
        "args": [{
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        },
        {
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        }, {
            "name": "orderType",
            "type": "int",
            "remark": "订单类型 0 普通订单 1 服务类订单 3 预售  4充值  5租赁 6租赁消费支付"
        },
        {
            "name": "itemCount",
            "type": "int",
            "remark": "产品数量"
        }
        ],
        "url": "/buy_now.html"

    },

    "Client.User.CreateRechargeOrder": {
        "name": "创建充值订单",
        "id": "Client.User.CreateRechargeOrder",
        "method": "post",
        "args": [

            {
                "name": "payType",
                "type": "int",
                "remark": "支付方式"
            },
            {
                "name": "rechargeAmount",
                "type": "BigDecimal",
                "remark": "充值金额"
            }
        ],
        "url": "/create_recharge_order.html"

    },

    "Client.User.CommitPlatformUserQiyeInfo": {
        "name": "提交平台用户企业信息",
        "id": "Client.User.CommitPlatformUserQiyeInfo",
        "method": "post",
        "args": [

        ],
        "url": "/commit_platform_user_qiye_info.html"

    },


    "Client.User.FollowUsers": {
        "name": "用户关注的用户",
        "id": "Client.User.FollowUsers",
        "method": "get",
        "args": [

            {
                "name": "platformUserId",
                "type": "int",
                "remark": "平台用户ID"
            },

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }
        ],
        "url": "/get_follow_users.html"

    },


    "Client.User.UnFollowUser": {
        "name": "取消关注用户",
        "id": "Client.User.UnFollowUser",
        "method": "post",
        "args": [

            {
                "name": "followPlatformUserId",
                "type": "int",
                "remark": "关注用户ID"
            }
        ],
        "url": "/un_follow_user.html"

    },
    "Client.User.FollowUser": {
        "name": "关注用户",
        "id": "Client.User.FollowUser",
        "method": "post",
        "args": [

            {
                "name": "followPlatformUserId",
                "type": "int",
                "remark": "关注用户ID"
            }
        ],
        "url": "/follow_user.html"

    },
    "Client.User.FensiUsers": {
        "name": "用户粉丝",
        "id": "Client.User.FensiUsers",
        "method": "get",
        "args": [

            {
                "name": "platformUserId",
                "type": "int",
                "remark": "平台用户ID"
            },

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }
        ],
        "url": "/get_fensi_users.html"

    },

    "Client.Brand.GetBrandDetail": {
        "name": "获取品牌详情",
        "id": "Client.Brand.GetBrandDetail",
        "method": "get",
        "args": [

            {
                "name": "brandId",
                "type": "int",
                "remark": "品牌id"
            }
        ],
        "url": "/get_brand_detail.html"

    },

    "Client.Brand.GetBrandList": {
        "name": "获取品牌",
        "id": "Client.Brand.GetBrandList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }, {
                "name": "brandName",
                "type": "String",
                "remark": "品牌名"
            }
        ],
        "url": "/get_brand_list.html"

    },

    "Client.User.Messages": {
        "name": "用户消息",
        "id": "Client.User.Messages",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }
        ],
        "url": "/get_user_messages.html"

    },


    "Client.User.MessageCounters": {
        "name": "用户消息统计记录",
        "id": "Client.User.MessageCounters",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }, {
                "name": "targetType",
                "type": "int",
                "remark": "目标类型"
            }
        ],
        "url": "/get_user_message_counters.html"

    },
    "Client.User.MessageTypes": {
        "name": "用户消息类型",
        "id": "Client.User.MessageTypes",
        "method": "get",
        "args": [


        ],
        "url": "/get_user_message_types.html"

    },
    "Client.Order.GetEditOrderDetail": {
        "name": "获得编辑订单页详细",
        "id": "Client.Order.GetEditOrderDetail",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }, {
            "name": "gotCouponListId",
            "type": "int",
            "remark": "用户领取优惠券id"
        },
        {
            "name": "expressNo",
            "type": "String",
            "remark": "快递策略号 -1 系统自动选择    0 不要策略到店自取"
        }



        ],
        "url": "/get_edit_order_detail.html"

    },
    "Client.Order.ChangeOrderItemCount": {
        "name": "修改订单项数目",
        "id": "Client.Order.ChangeOrderItemCount",
        "method": "post",
        "args": [{
            "name": "count",
            "type": "int",
            "remark": "数目"
        },
        {
            "name": "itemId",
            "type": "int",
            "remark": "订单项ID"
        }

        ],
        "url": "/change_order_item_count.html"

    },
    "Client.Order.CommentOrder": {
        "name": "订单评论（含店铺评论及产品评论）",
        "id": "Client.Order.CommentOrder",
        "method": "post",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "订单号"
            }, {
                "name": "shopId",
                "type": "int",
                "remark": "店铺ID  "
            }, {
                "name": "productId",
                "type": "int",
                "remark": "产品ID  "
            }, {
                "name": "commentContent",
                "type": "String",
                "remark": "评论"
            }, {
                "name": "commentImages",
                "type": "String",
                "remark": "评论图片  "
            }, {
                "name": "niming",
                "type": "int",
                "remark": "匿名  "
            }, {
                "name": "pingfen",
                "type": "int",
                "remark": "评分  "
            }, {
                "name": "shangpinfuhedu",
                "type": "int",
                "remark": "商品符合度  "
            }, {
                "name": "dianjiafuwutaidu",
                "type": "int",
                "remark": "点击服务态度  "
            }, {
                "name": "wuliufahuosudu",
                "type": "int",
                "remark": "物流发货速度  "
            }, {
                "name": "peisongyuanfuwutaidu",
                "type": "int",
                "remark": "配送服务态度"
            }
        ],
        "url": "/comment_order.html"
    },
    "Client.User.ReadMessage": {
        "name": "阅读用户消息",
        "id": "Client.User.ReadMessage",
        "method": "post",
        "args": [{
            "name": "messageId",
            "type": "int",
            "remark": "消息ID"
        }],
        "url": "/read_user_message.html"

    },
    "Client.User.SendUserMessage": {
        "name": "用户向用户发送消息",
        "id": "Client.User.SendUserMessage",
        "method": "post",
        "args": [{
            "name": "content",
            "type": "String",
            "remark": "消息内容"
        }, {
            "name": "targetPlatformUserId",
            "type": "int",
            "remark": "目标用户平台ID"
        }],
        "url": "/send_user_message.html"

    },

    "Client.User.DaidingProduct": {
        "name": "待定产品",
        "id": "Client.User.DaidingProduct",
        "method": "post",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        }],
        "url": "/daiding_product.html"

    },

    "Client.User.CancelDaidingProduct": {
        "name": "取消待定产品",
        "id": "Client.User.CancelDaidingProduct",
        "method": "post",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        }],
        "url": "/cancel_daiding_product.html"

    },

    "Client.User.DaidingProductList": {
        "name": "待定产品列表",
        "id": "Client.User.DaidingProductList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }],
        "url": "/daiding_product_list.html"

    },
    "Client.ShopOrder.OrderShopCommentPagePartial": {
        "name": "获得店铺评论页面",
        "id": "Client.ShopOrder.OrderShopCommentPagePartial",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/get_order_shop_comment_page_partial.html"

    },
    "Client.ShopOrder.OrderProductCommentPagePartial": {
        "name": "获得产品评论页面",
        "id": "Client.ShopOrder.OrderProductCommentPagePartial",
        "method": "get",
        "args": [{
            "name": "orderItemId",
            "type": "int",
            "remark": "订单产品ID"
        }


        ],
        "url": "/get_order_product_comment_page_partial.html"

    },
    "Client.Shop.AccountEarnList": {
        "name": "获得店铺账户收入列表",
        "id": "Client.Shop.AccountEarnList",
        "method": "get",
        "args": [{
            "name": "earnStatus",
            "type": "int",
            "remark": "收入状态（0待实现 1 已实现）"
        }, {
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/get_shop_account_earn_list.html"
    },
    "Client.Shop.AccountEventList": {
        "name": "获得店铺账户事件记录",
        "id": "Client.Shop.AccountEventList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }


        ],
        "url": "/get_shop_account_event_list.html"
    },

    "Client.Shop.AccountInfo": {
        "name": "获得店铺账户信息",
        "id": "Client.Shop.AccountInfo",
        "method": "get",
        "args": [



        ],
        "url": "/get_shop_account_info.html"
    },
    "Client.Order.GetEditOrderDetail": {
        "name": "获得编辑订单页详细",
        "id": "Client.Order.GetEditOrderDetail",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/get_edit_order_detail.html"

    },
    "Client.Order.GetOrderDetail": {
        "name": "获得编辑订单页详细",
        "id": "Client.Order.GetOrderDetail",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }, {
            "name": "gotCouponListId",
            "type": "int",
            "remark": "领取优惠券id"
        }


        ],
        "url": "/get_order_detail.html"

    },

    "Client.Order.SubmitOrder": {
        "name": "提交订单",
        "id": "Client.Order.SubmitOrder",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        },
        {
            "name": "addressId",
            "type": "int",
            "remark": "地址ID"
        },
        {
            "name": "buyerScript",
            "type": "String",
            "remark": "留言"
        },
        {
            "name": "payType",
            "type": "int",
            "remark": "支付类型"
        },
        {
            "name": "jifenDikou",
            "type": "int",
            "remark": "积分抵扣"
        }



        ],
        "url": "/submit_order.html"

    },



    "Client.Order.OrderUnshow": {
        "name": "订单删除",
        "id": "Client.Order.OrderUnshow",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/order_unshow.html"
    },

    "Client.Order.OrderReceived": {
        "name": "订单到货",
        "id": "Client.Order.OrderReceived",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/order_received.html"
    },

    "Client.Order.SetHuikuanImage": {
        "name": "设置汇款截图",
        "id": "Client.Order.SetHuikuanImage",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }, {
            "name": "huikuanImage",
            "type": "String",
            "remark": "汇款截图"
        }],
        "url": "/set_huikuan_image.html"
    },

    "Client.Order.FinishedOrder": {
        "name": "订单结束",
        "id": "Client.Order.FinishedOrder",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/order_finished.html"
    },

    "Client.Order.CancelOrder": {
        "name": "取消订单",
        "id": "Client.Order.CancelOrder",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/cancel_order.html"
    },
    "Client.Order.PressOrder": {
        "name": "催促订单",
        "id": "Client.Order.PressOrder",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/press_order.html"
    },
    "Client.Order.AccountPay": {
        "name": "余额支付",
        "id": "Client.Order.AccountPay",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/order_account_pay.html"

    },

    "Client.Order.JifenPay": {
        "name": "积分支付",
        "id": "Client.Order.JifenPay",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/order_jifen_pay.html"

    },


    "Client.Order.OrderList": {
        "name": "订单列表",
        "id": "Client.Order.OrderList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        },
        {
            "name": "easyStatus",
            "type": "String",
            "remark": "订单状态"
        },
        {
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/get_order_list.html"

    },

    "Client.ShopOrder.OrderList": {
        "name": "订单列表",
        "id": "Client.ShopOrder.OrderList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        },
        {
            "name": "easyStatus",
            "type": "String",
            "remark": "订单状态"
        },
        {
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }


        ],
        "url": "/get_shop_order_list.html"

    },
    "Client.Order.WaitCommentProductList": {
        "name": "待评价订单产品",
        "id": "Client.Order.WaitCommentProductList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }],
        "url": "/get_wait_comment_product_list.html"

    },

    "Client.Order.CommentList": {
        "name": "订单评论列表",
        "id": "Client.Order.CommentList",
        "method": "get",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        }, {
            "name": "shopId",
            "type": "int",
            "remark": "店铺ID"
        }],
        "url": "/get_product_comment_list.html"
    },
    "Client.Order.OrderReceived": {
        "name": "订单到货",
        "id": "Client.Order.OrderReceived",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }],
        "url": "/order_received.html"
    },
    "Client.User.AddToFavorite": {
        "name": "加入收藏",
        "id": "Client.User.AddToFavorite",
        "method": "post",
        "args": [{
            "name": "favoriteType",
            "type": "int",
            "remark": "收藏类型"
        },
        {
            "name": "itemId",
            "type": "int",
            "remark": "收藏对象Id"
        }

        ],
        "url": "/add_to_favorite.html"

    }


    ,


    "Client.User.RemoveFavorite": {
        "name": "取消收藏",
        "id": "Client.User.RemoveFavorite",
        "method": "post",
        "args": [{
            "name": "favoriteType",
            "type": "int",
            "remark": "收藏类型"
        },
        {
            "name": "itemId",
            "type": "int",
            "remark": "取消收藏对象Id"
        }

        ],
        "url": "/remove_favorite.html"

    },

    "Client.User.ListAccountEvent": {
        "name": "获得余额变更记录",
        "id": "Client.User.ListAccountEvent",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/get_user_account_events.html"

    },


    "Client.User.ListJifenEvent": {
        "name": "获得积分变更记录",
        "id": "Client.User.ListJifenEvent",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/get_user_jifen_events.html"

    },
    "Client.Get.Favorite": {
        "name": "获得收藏",
        "id": "Client.Get.Favorite",
        "method": "get",
        "args": [{
            "name": "favoriteType",
            "type": "int",
            "remark": "收藏类型"
        },
        {
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/get_favorite.html"

    },




    "Client.Yyg.BuyNow": {
        "name": "立即购买",
        "id": "Client.Yyg.BuyNow",
        "method": "all",
        "args": [{
            "name": "count",
            "type": "int",
            "remark": "数量"
        },
        {
            "name": " Id",
            "type": "int",
            "remark": "一元购ID"
        }

        ],
        "url": "/yyg_buy_now.html"

    },



    "Client.Yyg.GetAttendYiyuangouList": {
        "name": "获得参与本期一元购记录",
        "id": "Client.Yyg.GetAttendYiyuangouList",
        "method": "all",
        "args": [{
            "name": "yygId",
            "type": "int",
            "remark": "一元购Id  "
        }, {
            "name": "loginUser",
            "type": "int",
            "remark": "记录限制为登陆用户 0 否 1 是  "
        }

        ],
        "url": "/get_attend_yiyuangou_list.html"

    },

    "Client.Yyg.SetAddress": {
        "name": "设置地址",
        "id": "Yyg.SetAddress",
        "method": "post",
        "args": [{
            "name": "addressId",
            "type": "int",
            "remark": "地址ID"
        },
        {
            "name": " yiyuangouId",
            "type": "int",
            "remark": "一元购ID"
        }

        ],
        "url": "/set_yyg_address.html"

    },

    "Client.Yyg.ListMore": {
        "name": "一元购列表",
        "id": "Client.Yyg.ListMore",
        "method": "get",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        },
        {
            "name": "searchPrice",
            "type": "Decimal",
            "remark": "价格"
        },
        {
            "name": "status",
            "type": "int",
            "remark": "状态"
        },
        {
            "name": "yiyuangouType",
            "type": "String",
            "remark": "一元购类型"
        },
        {
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/yyg_list_more.html"

    },



    "Client.Yyg.MyListMore": {
        "name": "我的一元购列表",
        "id": "Client.Yyg.MyListMore",
        "method": "get",
        "args": [

        ],
        "url": "/my_yyg_list_more.html"

    },

    "Client.Fx.GetFxUsers": {
        "name": "分销用户列表",
        "id": "Client.Fx.GetFxUsers",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        },
        {
            "name": "fxLevel",
            "type": "int",
            "remark": "分销级数"
        }
        ],
        "url": "/get_fx_tg_users.html"

    },

    "Client.Fx.GetFxYongjinList": {
        "name": "分销佣金列表",
        "id": "Client.Fx.GetFxYongjinList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }],
        "url": "/get_fx_yongjin_list.html"

    },


    "Client.Fx.GetTixianList": {
        "name": "获取提现记录",
        "id": "Client.Fx.GetTixianList",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }],
        "url": "/get_tixian_list.html"

    },

    "Client.Fx.ReqTixian": {
        "name": "请求提现",
        "id": "Client.Fx.ReqTixian",
        "method": "post",
        "args": [{
            "name": "amount",
            "type": "BigDecimal",
            "remark": "请求提现金额"
        }],
        "url": "/req_tixian.html"

    },


    "Client.Zhongchou.GetZhongchouMission": {
        "name": "获取众筹任务",
        "id": "Client.Zhongchou.GetZhongchouMission",
        "method": "get",
        "args": [{
            "name": "zcTopicId",
            "type": "int",
            "remark": "众筹主题ID"
        },
        {
            "name": "missionUserId",
            "type": "int",
            "remark": "参与任务用户ID"
        }
        ],
        "url": "/get_user_zc_mission.html"

    },

    "Client.Zhongchou.PublishMission": {
        "name": "发布众筹任务",
        "id": "Client.Zhongchou.PublishMission",
        "method": "post",
        "args": [

            {
                "name": "missionId ",
                "type": "int",
                "remark": "任务ID"
            }, {
                "name": "kouhao",
                "type": "String",
                "remark": "口号"
            }, {
                "name": "headimage",
                "type": "String",
                "remark": "头像"
            }, {
                "name": "telno",
                "type": "String",
                "remark": "电话"
            }, {
                "name": "ganyan",
                "type": "String",
                "remark": "感言"
            }
        ],
        "url": "/publish_mission.html"

    },

    "Client.Zhongchou.HelpMission": {
        "name": "发布众筹任务",
        "id": "Client.Zhongchou.HelpMission",
        "method": "post",
        "args": [

            {
                "name": "missionId ",
                "type": "int",
                "remark": "任务ID"
            }
        ],
        "url": "/help_mission.html"

    },
    "Client.UploadImage": {
        "name": "上传文件",
        "id": "Client.UploadImage",
        "method": "post",
        "args": [{
            "name": "imgName",
            "type": "String",
            "remark": "图片名"
        },
        {
            "name": "imgStr",
            "type": "String",
            "remark": "Base64格式图片"
        }
        ],
        "url": "/upload_file.html"

    },

    "Client.Product.GetMeasureCartesion": {
        "name": "获取产品规格集信息",
        "id": "Client.Product.GetMeasureCartesion",
        "method": "get",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        },
        {
            "name": "measureIds",
            "type": "String",
            "remark": "规格集ID"
        }
        ],
        "url": "/get_measure_cartesion.html"

    },


    "Client.Product.ProductTabView": {
        "name": "获取产品类型tab视图",
        "id": "Client.Product.ProductTabView",
        "method": "get",
        "args": [{
            "name": "productTypeId",
            "type": "int",
            "remark": "产品类型ID"
        }],
        "url": "/get_product_tab_view.html"

    },

    "Client.Product.ProductTreeView": {
        "name": "获取产品类型tree视图",
        "id": "Client.Product.ProductTreeView",
        "method": "get",
        "args": [{
            "name": "productTypeId",
            "type": "int",
            "remark": "产品类型ID"
        }],
        "url": "/get_product_tree_list_view.html"

    },
    "Client.DefinedItemOrder.List": {
        "name": "获得用户定义订单",
        "id": "Client.DefinedItemOrder.List",
        "method": "get",
        "args": [{
            "name": "page",
            "type": "int",
            "remark": "页数"
        }

        ],
        "url": "/get_user_defined_item_order.html"
    },

    "Client.DefinedItemOrder.Detail": {
        "name": "获得用户定义订单",
        "id": "Client.DefinedItemOrder.Detail",
        "method": "get",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        }

        ],
        "url": "/get_user_defined_item_order_detail.html"
    },
    "Client.DefinedItemOrder.Req": {
        "name": "用户请求定义订单",
        "id": "Client.DefinedItemOrder.Req",
        "method": "post",
        "args": [{
            "name": "itemName",
            "type": "String",
            "remark": "请求项目名"
        },
        {
            "name": "itemDescription",
            "type": "String",
            "remark": "请求项目描述"
        },
        {
            "name": "itemIcon",
            "type": "String",
            "remark": "请求项目图片"
        },
        {
            "name": "payType",
            "type": "int",
            "remark": "请求平台支付方式"
        },
        {
            "name": "itemPrice",
            "type": "BigDecimal",
            "remark": "请求平台支付金额"
        },
        {
            "name": "relateProductId",
            "type": "int",
            "remark": "请求项目关联产品"
        },
        {
            "name": "relateShopId",
            "type": "int",
            "remark": "请求项目关联店铺"
        }

        ],
        "url": "/req_user_defined_item_order.html"
    },
    "Client.DefinedItemOrder.ChangeOrderPrice": {
        "name": "修改用户定义订单价格",
        "id": "Client.DefinedItemOrder.ChangeOrderPrice",
        "method": "post",
        "args": [{
            "name": "orderNo",
            "type": "String",
            "remark": "订单号"
        },
        {
            "name": "itemPrice",
            "type": "BigDecimal",
            "remark": "订单价格"
        }


        ],
        "url": "/change_user_defined_order_price.html"
    },

    "Client.TargetLike.Like": {
        "name": "点赞",
        "id": "Client.TargetLike.Like",
        "method": "post",
        "args": [{
            "name": "targetType",
            "type": "int",
            "remark": "目标类型"
        },
        {
            "name": "targetId",
            "type": "int",
            "remark": "目标ID"
        }

        ],
        "url": "/target_like.html"
    },


    "Client.TargetLike.Dislike": {
        "name": "取消点赞",
        "id": "Client.TargetLike.Dislike",
        "method": "post",
        "args": [{
            "name": "targetType",
            "type": "int",
            "remark": "目标类型"
        },
        {
            "name": "targetId",
            "type": "int",
            "remark": "目标ID"
        }
        ],
        "url": "/target_dislike.html"
    },


    "Client.ProductDetail.GetProductDetailShopView": {
        "name": "获取产品详情（店铺视图)",
        "id": "Client.ProductDetail.GetProductDetailShopView",
        "method": "get",
        "args": [{
            "name": "productId",
            "type": "int",
            "remark": "产品ID"
        }],
        "url": "/get_product_detail_shop_view.html"
    },



    "Client.ChatRoom.UserChatRooms": {
        "name": "获取用户聊天室",
        "id": "Client.ChatRoom.UserChatRooms",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页面"
            }
        ],
        "url": "/get_user_chat_rooms.html"
    },

    "Client.ChatRoom.CreateOrGetDialogChatRoom": {
        "name": "获取用户对话聊天室",
        "id": "Client.ChatRoom.CreateOrGetDialogChatRoom",
        "method": "post",
        "args": [

            {
                "name": "platformUserIdOne",
                "type": "int",
                "remark": "对话用户ID1"
            },
            {
                "name": "platformUserIdTwo",
                "type": "int",
                "remark": "对话用户ID2"
            }
        ],
        "url": "/create_or_get_dialog_chat_room.html"
    },

    "Client.ChatRoom.ChatRoomMessageRecords": {
        "name": "获取聊天室对话信息",
        "id": "Client.ChatRoom.ChatRoomMessageRecords",
        "method": "get",
        "args": [{
            "name": "roomId",
            "type": "int",
            "remark": "聊天室ID"
        },
        {
            "name": "page",
            "type": "int",
            "remark": "页面"
        }
        ],
        "url": "/get_chat_room_message_records.html"
    },
    "Client.ChatRoom.SendChatRoomMessage": {
        "name": "用户向聊天室发送消息",
        "id": "Client.ChatRoom.SendChatRoomMessage",
        "method": "all",
        "args": [{
            "name": "content",
            "type": "String",
            "remark": "消息内容"
        }, {
            "name": "roomId",
            "type": "int",
            "remark": "房间ID"
        }],
        "url": "/send_chat_room_message.html"

    },
    "Client.User.BackItemList": {
        "name": "获得用户可退货列表",
        "id": "Client.User.BackItemList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            },
            {
                "name": "platformNo",
                "type": "String",
                "remark": "平台号"
            }, {
                "name": "secretCode",
                "type": "String",
                "remark": "口令"
            }

        ],
        "url": "/get_back_item_list.html"
    },
    "Client.User.BackOrderItemPage": {
        "name": "退货页",
        "id": "Client.User.BackOrderItemPage",
        "method": "get",
        "args": [

            {
                "name": "orderItemId",
                "type": "int",
                "remark": "订单项ID"
            },
            {
                "name": "platformNo",
                "type": "String",
                "remark": "平台号"
            }, {
                "name": "secretCode",
                "type": "String",
                "remark": "口令"
            }

        ],
        "url": "/get_back_order_item_page.html"
    },
    "Client.User.SendBackOrderItemReq": {
        "name": "发送退款请求",
        "id": "Client.User.SendBackOrderItemReq",
        "method": "post",
        "args": [

            {
                "name": "orderItemId",
                "type": "int",
                "remark": "订单项ID"
            }, {
                "name": "backReason",
                "type": "String",
                "remark": "退款理由"
            }


        ],
        "url": "/send_back_order_item_req.html"
    },
    "Client.ShopManager.AcceptOrRejectBackOrderItemAmount": {
        "name": "同意或拒绝退款",
        "id": "Client.ShopManager.AcceptOrRejectBackOrderItemAmount",
        "method": "post",
        "args": [{
            "name": "acceptStatus",
            "type": "int",
            "remark": "1 同意  2 拒绝"
        },
        {
            "name": "shopBackAmountId",
            "type": "int",
            "remark": "退款ID"
        }, {
            "name": "rejectReason",
            "type": "String",
            "remark": "拒绝理由"
        },
        {
            "name": "platformNo",
            "type": "String",
            "remark": "平台号"
        }, {
            "name": "secretCode",
            "type": "String",
            "remark": "口令"
        }

        ],
        "url": "/accept_or_reject_back_order_item_amount.html"
    },
    "Client.User.ShopBackAmountList": {
        "name": "获得用户管理店铺退货请求",
        "id": "Client.User.ShopBackAmountList",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }

        ],
        "url": "/get_shop_back_amount_list.html"
    },


    "Client.Coupon.AvailableCoupons": {
        "name": "获取可领取的优惠券列表",
        "id": "Client.Coupon.AvailableCoupons",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            }

        ],
        "url": "/get_available_coupons.html"
    },


    "Client.Coupon.GainCoupon": {
        "name": "领取优惠券",
        "id": "Client.Coupon.GainCoupon",
        "method": "post",
        "args": [

            {
                "name": "couponId",
                "type": "int",
                "remark": "优惠券ID"
            }, {
                "name": "couponSecretCode",
                "type": "String",
                "remark": "优惠券码"
            }, {
                "name": "couponSecretPassword",
                "type": "String",
                "remark": "优惠券密码"
            }

        ],
        "url": "/gain_coupon.html"
    },

    "Client.Coupon.MyCoupons": {
        "name": "我的优惠券",
        "id": "Client.Coupon.MyCoupons",
        "method": "get",
        "args": [

            {
                "name": "page",
                "type": "int",
                "remark": "页数"
            },
            {
                "name": "couponState",
                "type": "int",
                "remark": "优惠券状态"
            }

        ],
        "url": "/get_my_coupons_list.html"
    },
    "Client.ChatRoom.DownloadWxAudio": {
        "name": "下载微信语音",
        "id": "Client.ChatRoom.DownloadWxAudio",
        "method": "post",
        "args": [

            {
                "name": "resWxServerId",
                "type": "int",
                "remark": "资源ID"
            }

        ],
        "url": "/download_wx_res.html"
    },
    "Client.Qiandao.Qiandao": {
        "name": "签到",
        "id": "Client.Qiandao.Qiandao",
        "method": "post",
        "args": [

            {
                "name": "qiandaoType",
                "type": "String",
                "remark": "签到类型"
            }

        ],
        "url": "/qiandao.html"
    },

    "Client.Qiandao.YuQiandao": {
        "name": "预签到",
        "id": "Client.Qiandao.YuQiandao",
        "method": "all",
        "args": [

            {
                "name": "qiandaoType",
                "type": "String",
                "remark": "签到类型"
            },
            {
                "name": "qiandaoCellDateStr",
                "type": "String",
                "remark": "被签到日期"
            }

        ],
        "url": "/yu_qiandao.html"
    },

    "Client.Qiandao.CancelYuQiandao": {
        "name": "取消预签到",
        "id": "Client.Qiandao.CancelYuQiandao",
        "method": "all",
        "args": [

            {
                "name": "qiandaoType",
                "type": "String",
                "remark": "签到类型"
            },
            {
                "name": "qiandaoCellDateStr",
                "type": "String",
                "remark": "被签到日期"
            }

        ],
        "url": "/cancel_yu_qiandao.html"
    },
    "Client.Qiandao.MonthQiandaoData": {
        "name": "获取月份签到数据",
        "id": "Client.Qiandao.MonthQiandaoData",
        "method": "get",
        "args": [

            {
                "name": "qiandaoType",
                "type": "String",
                "remark": "签到类型"
            },
            {
                "name": "year",
                "type": "int",
                "remark": "年份"
            }, {
                "name": "month",
                "type": "int",
                "remark": "月份"
            }

        ],
        "url": "/month_qiandao_data.html"
    },
    "Client.Qiandao.GetQiandaoRecordsList": {
        "name": "获取用户签到数据",
        "id": "Client.Qiandao.GetQiandaoRecordsList",
        "method": "get",
        "args": [

            {
                "name": "qiandaoType",
                "type": "String",
                "remark": "签到类型"
            },
            {
                "name": "platformUserId",
                "type": "int",
                "remark": "平台用户ID"
            },
            {
                "name": "year",
                "type": "int",
                "remark": "年份"
            }, {
                "name": "month",
                "type": "int",
                "remark": "月份"
            }, {
                "name": "day",
                "type": "int",
                "remark": "日"
            }, {
                "name": "week",
                "type": "int",
                "remark": "周"
            }, {
                "name": "recordType",
                "type": "int",
                "remark": "查询记录类型 0年 1月 2 周 3 日"
            }

        ],
        "url": "/get_qiandao_records_list.html"
    },
    "Client.Qiandao.QiandaoComment": {
        "name": "签到评论",
        "id": "Client.Qiandao.QiandaoComment",
        "method": "post",
        "args": [{
            "name": "qiandaoItemId",
            "type": "int",
            "remark": "签到项ID"
        }, {
            "name": "comment",
            "type": "String",
            "remark": "评价"
        }, {
            "name": "pingfen",
            "type": "int",
            "remark": "评分"
        }, {
            "name": "niming",
            "type": "int",
            "remark": "匿名"
        }],
        "url": "/comment_qiandao_item.html"
    },
    "Client.Qiandao.GetQiandaoCommentPage": {
        "name": "获取签到评论页",
        "id": "Client.Qiandao.GetQiandaoCommentPage",
        "method": "get",
        "args": [{
            "name": "year",
            "type": "int",
            "remark": "年份"
        }, {
            "name": "month",
            "type": "int",
            "remark": "月"
        }, {
            "name": "day",
            "type": "int",
            "remark": "日"
        }

        ],
        "url": "/get_qiandao_comment_page.html"
    },

    "Client.Qiandao.GetQiandaoMonthPage": {
        "name": "获取每月签到页面",
        "id": "Client.Qiandao.GetQiandaoMonthPage",
        "method": "get",
        "args": [{
            "name": "year",
            "type": "int",
            "remark": "年份"
        }, {
            "name": "month",
            "type": "int",
            "remark": "月"
        }

        ],
        "url": "/get_qiandao_month_page.html"
    },
    "Client.Qiandao.GetWeekQiandaoPage": {
        "name": "获取每周签到页面",
        "id": "Client.Qiandao.GetWeekQiandaoPage",
        "method": "get",
        "args": [{
            "name": "year",
            "type": "int",
            "remark": "年份"
        }, {
            "name": "week",
            "type": "int",
            "remark": "周"
        }

        ],
        "url": "/get_week_qiandao_page.html"
    },
    "Client.Qiandao.GetWeekQiandaoTongjiPage": {
        "name": "获取每周签到统计页面",
        "id": "Client.Qiandao.GetWeekQiandaoTongjiPage",
        "method": "get",
        "args": [{
            "name": "year",
            "type": "int",
            "remark": "年份"
        }, {
            "name": "week",
            "type": "int",
            "remark": "周"
        }

        ],
        "url": "/get_week_tongji_page.html"
    },
    "Client.User.GuestBook": {
        "name": "用户登记",
        "id": "Client.User.GuestBook",
        "method": "post",
        "args": [

            {
                "name": "name",
                "type": "String",
                "remark": "名字"
            },
            {
                "name": "bookAddress",
                "type": "String",
                "remark": "地址"
            }, {
                "name": "content",
                "type": "String",
                "remark": "内容"
            }, {
                "name": "telno",
                "type": "String",
                "remark": "电话"
            }, {
                "name": "tags",
                "type": "String",
                "remark": "标签"
            }, {
                "name": "bookType",
                "type": "String",
                "remark": "登记类型"
            }

        ],
        "url": "/user_guest_book.html"
    },

    "Client.Weixin.UnifinedOrder": {
        "name": "统一下单",
        "id": "Client.Weixin.UnifinedOrder",
        "method": "post",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "订单号"

            },
            {
                "name": "openid",
                "type": "String",
                "remark": "微信用户openid(app不需要 公众号存放session中的也不需要）"

            },
            {
                "name": "app",
                "type": "int",
                "remark": "是否app 0 否  1 是）"

            }


        ],
        "url": "/unifined_order.html"
    },

    "Client.Weixin.GetQrcode": {
        "name": "获取二维码",
        "id": "Client.Weixin.GetQrcode",
        "method": "all",
        "args": [


        ],
        "url": "/get_qrcode.html"
    },

    "Client.Weixin.GetWxConfig": {
        "name": "获得微信jsapi配置",
        "id": "Client.Weixin.GetWxConfig",
        "method": "all",
        "args": [

            {
                "name": "configUrl",
                "type": "String",
                "remark": "配置URL"

            }


        ],
        "url": "/get_wx_config.html"
    },

    "Client.Alipay.AlipayApp": {
        "name": "支付宝app支付",
        "id": "Client.Alipay.AlipayApp",
        "method": "post",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "订单号"

            }


        ],
        "url": "/alipay_app.html"
    },

    "Client.Alipay.AlipayPage": {
        "name": "支付宝Page支付",
        "id": "Client.Alipay.AlipayPage",
        "method": "post",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "订单号"

            }


        ],
        "url": "/alipay_page.html"
    },
    "Client.AfterSale.DeleteAfterSaleOrder": {
        "name": "删除售后case",
        "id": "Client.AfterSale.DeleteAfterSaleOrder",
        "method": "post",
        "args": [{
            "name": "afterSaleOrderId",
            "type": "int",
            "remark": "售后工单id"
        }],
        "url": "/delete_after_sale_order.html"

    },
    "Client.AfterSale.CreateAfterSaleOrder": {
        "name": "创建售后工单",
        "id": "Client.AfterSale.CreateAfterSaleOrder",
        "method": "all",
        "args": [

            {
                "name": "afterSaleCaseId",
                "type": "int",
                "remark": "售后case id"

            },
            {
                "name": "productCount",
                "type": "int",
                "remark": "产品数量"

            },
            {
                "name": "contactName",
                "type": "String",
                "remark": "联系人"

            },
            {
                "name": "contactProvince",
                "type": "String",
                "remark": "省"

            },
            {
                "name": "contactCity",
                "type": "String",
                "remark": "市"

            },
            {
                "name": "contactArea",
                "type": "String",
                "remark": "县"

            },
            {
                "name": "contactTelno",
                "type": "String",
                "remark": "电话"

            },
            {
                "name": "contactAddress",
                "type": "String",
                "remark": "详细地址"

            }


        ],
        "url": "/create_after_sale_order.html"
    },

    "Client.AfterSale.GetAfterSaleFeedbackPhase": {
        "name": "获取分步编辑信息",
        "id": "Client.AfterSale.GetAfterSaleFeedbackPhase",
        "method": "get",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "售后工单号"
            },
            {
                "name": "afterSaleCaseId",
                "type": "int",
                "remark": "售后caseid"
            },
            {
                "name": "afterSalePhaseId",
                "type": "int",
                "remark": "售后步骤id"
            }

        ],
        "url": "/get_after_sale_feedback_phase.html"
    },

    "Client.AfterSale.SetAfterSaleOrderExpress": {
        "name": "提交售后单物流信息",
        "id": "Client.AfterSale.SetAfterSaleOrderExpress",
        "method": "post",
        "args": [

            {
                "name": "orderNo",
                "type": "String",
                "remark": "工单号"
            },
            {
                "name": "expressCompanyName",
                "type": "String",
                "remark": "物流公司"
            },
            {
                "name": "expressNo",
                "type": "String",
                "remark": "物流单号"

            }
        ],
        "url": "/set_after_sale_order_express.html"

    },
    "Client.AfterSale.SubmitAfterSaleOrder": {
        "name": "提交售后工单",
        "id": "Client.AfterSale.SubmitAfterSaleOrder",
        "method": "post",
        "args": [

            {
                "name": "afterSaleOrderId",
                "type": "int",
                "remark": "工单id"
            }
        ],
        "url": "/submit_after_sale_order.html"

    },

    "Client.AfterSale.GetUserAfterSaleOrders": {
        "name": "用户售后工单",
        "id": "Client.AfterSale.GetUserAfterSaleOrders",
        "method": "get",
        "args": [

            {
                "name": "orderStatus",
                "type": "int",
                "remark": "工单状态"
            }, {
                "name": "page",
                "type": "int",
                "remark": "page"
            }

        ],
        "url": "/get_user_sale_orders.html"

    },

    "Client.AfterSale.GetAfterSaleProductList": {
        "name": "获得售后产品列表",
        "id": "Client.AfterSale.GetAfterSaleProductList",
        "method": "get",
        "args": [{
            "name": "categoryId",
            "type": "int",
            "remark": "产品类型ID"
        },
        {
            "name": "page",
            "type": "String",
            "remark": "页数"
        },
        {
            "name": "belongShop",
            "type": "int",
            "remark": "归属店铺ID"
        }

        ],
        "url": "/get_after_sale_product_list.html"
    }
}



export default Client;

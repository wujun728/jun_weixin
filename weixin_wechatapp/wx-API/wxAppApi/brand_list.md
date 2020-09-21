### 品牌列表 :   pages/brand_list/index

### 使用接口

    获取品牌列表    Client.Brand.GetBrandList ( get_brand_list )
    关注品牌    Client.User.AddToFavorite ( add_to_favorite )
    取消关注    Client.User.RemoveFavorite ( remove_favorite )

### 链接地址

     获取品牌列表 https://mini.sansancloud.com/chainalliance/xianhua/get_brand_list.html
     关注品牌 https://mini.sansancloud.com/chainalliance/xianhua/add_to_favorite.html
     取消关注 https://mini.sansancloud.com/chainalliance/xianhua/remove_favorite.html

##  获取品牌列表    Client.Brand.GetBrandList ( get_brand_list )
###  Client.Brand.GetBrandList 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|brandName|品牌名|否|提供品牌查询
|page|第几页|否|-

### Client.Brand.GetBrandList 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|brandName|商标名|-
|brandNameEn|商标英文名|-
|brandNameShort|商标缩写|-
|brandIcon|商标图片地址|-
|id|商标id|-
|brandDescription|商标描述|-

### Client.Brand.GetBrandList  请求结果:

    {
      "errcode": "0",
      "errMsg": "success",
      "relateObj": {
        "pageSize": 16,
        "curPage": 1,
        "totalSize": 26,
        "result": [
          {
            "jsonRemark": "{
                beanRemark:'商品品牌表',
                brandName:'商标名',
                brandNameEn:'商标英文名，
                brandNameShort:'商标缩写',
                brandIcon:'商标图片地址',
                brandTypeId:'商标分类ID(弃用)',
                brandTypeName:'商标分类名(弃用)',
                platformNo:'平台号',
                brandDescription:'商标描述'
                }",
            "id": 17,
            "brandName": "孙建兴",
            "brandNameEn": "sunjianxing",
            "brandNameShort": "sjx",
            "brandIcon": "http://image1.sansancloud.com/jianzhan/2017_09/24/15/32/10_998.jpg",
            "platformNo": "jianzhan",
            "brandDescription": "孙建兴，男，1952年出生。中国艺术研究院客座研究员、中国陶瓷设计艺术大师、中华传统工艺大师、高级工艺美术师、国家级非物质文化遗产项目建窑代表性传承人、福建省“百千万人才工程”人选、工程硕士、中国古陶瓷学会会员、中国古陶瓷专业委员会常委、陶瓷艺术大师、福建省工艺美术协会理事、省工艺美术学会常务理事、省陶瓷艺术专业委员会常委、南平市收藏家协会副会长、南平市星辰天目陶瓷研究所（南平市建窑陶瓷研究所）艺术总监。1972至1975年德化红旗瓷厂技术员，研究开发高白、建白、黑釉瓷等。1978年毕业于陕西科技大学陶瓷专业。1979年借调福建省轻工业研究所并赴建阳水吉恢复失传800年之久的宋代八大名窑之一建窑建盏。获得省科技进步二等奖（排名第一）、市科技进步一等奖（排名第一）。从事陶瓷艺术创作40年，先后开发出黑釉、黄（红、蓝、金、银）兔毫、异毫、毫变、国宝油滴、金（银、虹彩）油滴、虹彩（金缕、白点）鹧鸪斑、铁锈斑、黄天目、蓼冷汁、灰被、金（银）彩文字、木叶、玳瑁、柿红、虹彩、窑变、曜变天目等系列作品。作品瓷胎似铁，釉色古朴典雅，釉面斑纹自然形成，变幻莫测，绚丽多彩给人以质朴的美感，具有典型的民族风格和浓郁的东方艺术色彩，作品深得业内和海内外收藏家以及艺术爱好者的青睐和好评。作品“仿宋建窑兔毫天目茶碗”、“仿宋建窑油滴天目茶碗”、“油滴天目龙虎茶具”被国家博物馆收藏，“曜变天目茶碗”、“油滴天目茶碗”被中国工艺美术馆收藏，作品分别获国际陶艺学会大会学术交流优秀作品奖，多次获国家级金奖、银奖、铜奖和优秀奖等，获国家专利十余项。在（ISAC）古陶瓷科学技术国际讨论会上发表论文数十篇。2005年受邀参加韩国世界陶瓷双年展—国际柴烧窑演习营并发表论文讲演，2009年在日本东京成功举办个展，其制作的系列建盏作品2010年入选上海世博会福建省馆，制作的10只建盏系列小盏作品参加“一千零一个茶杯”世界巡回展。",
            "platformUserId": 0,
            "guanzhu": 0
          }
        ]
      }
    }

##  关注品牌    Client.User.AddToFavorite ( add_to_favorite )
###  Client.User.AddToFavorite 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|favoriteType|收藏类型|是|-
|itemId|收藏对象Id|是|-

### Client.User.AddToFavorite 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|0|请求成功

### Client.User.AddToFavorite  请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }

 ##  取消关注品牌   Client.User.RemoveFavorite ( remove_favorite )
 ###  Client.User.RemoveFavorite 请求参数

 |名称|说明|是否必要|备注
 |:---:|:---:|:---:|:---:|
 |favoriteType|收藏类型|是|-
 |itemId|收藏对象Id|是|-

 ### Client.User.RemoveFavorite 返回字段说明

 |名称|说明|备注
 |:---:|:---:|:---:|
 |errcode|0|请求成功

 ### Client.User.RemoveFavorite  请求结果:

     {
         "errcode":"0",
         "errMsg":"success",
         "relateObj":""
     }
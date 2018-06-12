const koa = require('koa')
const route = require('koa-route')
const app = new koa()

app.use((ctx, next) => {
    ctx.res.setHeader("access-control-allow-origin","*")
    next()
})

// 医院
app.use(route.post('/hospital/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data":[
                    {
                        "id": 1,
                        "alias": "cyl",
                        "province": "北京",
                        "hospitalName":"北京垂杨柳医院",
                        "hospitalDesc":"desc",
                        // "hospitalContent":"content",
                        "createdAt":1514736000,
                        "updatedAt":1517414400
                    },{
                        "id": 2,
                        "alias": "bjyy",
                        "province": "北京",
                        "hospitalName":"北京医院",
                        "hospitalDesc":"desc",
                        // "hospitalContent":"content",
                        "createdAt":1514736000,
                        "updatedAt":1517414400
                    }
                ]
    }
}))
app.use(route.post('/hospital/detail', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": {
            "id": 1,
            "alias": "cyl",
            "province": "北京",
            "hospitalName":"北京垂杨柳医院",
            "hospitalDesc":"desc",
            "hospitalContent":"content",
            "createdAt":1514736000,
            "updatedAt":1517414400
        }
    }
}))

// 医生
app.use(route.post('/doctor/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": {
            "pageNum": 5,
            "pageSize": 10,
            "total": 52,
            "pages": 6,
            "list":[
                {
                    "id": 1,
                    "doctorName": "李医生",
                    "gendar": "男",
                    "hospitalId":"1",
                    "hospitalName":"北京垂杨柳医院",
                    "departmentId":"2",
                    "departmentName":"骨科",
                    "order":33,
                    "doctorDesc":"desc",
                    "doctorContent":"content",
                    "createdAt":1514736000,
                    "updatedAt":1517414400
                },{
                    "id": 1,
                    "doctorName": "王医生",
                    "gendar": "女",
                    "hospitalId":"1",
                    "hospitalName":"北京垂杨柳医院",
                    "departmentId":"3",
                    "departmentName":"内科",
                    "order":55,
                    "doctorDesc":"desc",
                    "doctorContent":"content",
                    "createdAt":1514736000,
                    "updatedAt":1517414400
                }
            ]
        }
    }
}))
app.use(route.post('/doctor/detail', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": {
            "id": 1,
            "doctorName": "李医生",
            "gendar": "男",
            "hospitalId":"1",
            "hospitalName":"北京垂杨柳医院",
            "departmentId":"2",
            "departmentName":"骨科",
            "order":33,
            "doctorDesc":"desc",
            "doctorContent":"content",
            "createdAt":1514736000,
            "updatedAt":1517414400
        }
    }
}))

// 科室
app.use(route.post('/department/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 1,
                "departmentName": "骨科",
                "hospitalId":"1",
                "hospitalName":"北京垂杨柳医院",
                "order":33,
                "departmentDesc":"desc",
                "departmentContent":"content",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 2,
                "departmentName": "内科",
                "hospitalId":"1",
                "hospitalName":"北京垂杨柳医院",
                "order":35,
                "departmentDesc":"desc",
                "departmentContent":"content",
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))
app.use(route.post('/department/detail', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": {
            "id": 1,
            "departmentName": "骨科",
            "hospitalId":"1",
            "hospitalName":"北京垂杨柳医院",
            "order":33,
            "departmentDesc":"desc",
            "departmentContent":"content",
            "createdAt":1514736000,
            "updatedAt":1517414400
        }
    }
}))

// 功能
app.use(route.post('/feature/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 1,
                "featureName": "推荐",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":null,
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 2,
                "featureName": "智慧医院",
                "status":2,
                "category":"默认",
                "lanOnly":true,
                "isH5":true,
                "h5Url":"/html/xinban1-1/zhihuiyiyuan/",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 3,
                "featureName": "影视",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 4,
                "featureName": "医普宣教",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":true,
                "h5Url":"/html/xinban1-1/yipuxuanjiao/",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 5,
                "featureName": "广播",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 6,
                "featureName": "生活服务",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))

// 医院的功能
app.use(route.post('/hospitalfeature/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 1,
                "featureName": "推荐",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":null,
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 2,
                "featureName": "智慧医院",
                "status":2,
                "category":"默认",
                "lanOnly":true,
                "isH5":true,
                "h5Url":"/html/xinban1-1/zhihuiyiyuan/",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 3,
                "featureName": "影视",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 4,
                "featureName": "医普宣教",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":true,
                "h5Url":"/html/xinban1-1/yipuxuanjiao/",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 5,
                "featureName": "广播",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 6,
                "featureName": "生活服务",
                "status":0,
                "category":"默认",
                "lanOnly":true,
                "isH5":false,
                "h5Url":"",
                "supportVersions":"A|B|C",
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))

// 菜单
app.use(route.post('/menu/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 1,
                "groupId": 15,
                "menuName":"推荐",
                "order": 11,
                "status": 1,
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 2,
                "groupId": 15,
                "menuName":"智慧医院",
                "order": 12,
                "status": 1,
                "createdAt":1514736000,
                "updatedAt":1517414400
            },{
                "id": 3,
                "groupId": 15,
                "menuName":"视频",
                "order": 15,
                "status": 1,
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))

// 推荐(app推荐、智慧医院推荐)
app.use(route.post('/recc/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 11,
                "groupId": 15,
                "reccType":"app推荐",
                "startPoint": "[0,0]",
                "width": 2,
                "height":2,
                "featureId":2,
                "url":""
            },{
                "id": 12,
                "groupId": 15,
                "reccType":"app推荐",
                "startPoint": "[0,2]",
                "width": 1,
                "height":1,
                "featureId":3,
                "url":""
            },{
                "id": 15,
                "groupId": 15,
                "reccType":"app推荐",
                "startPoint": "[1,2]",
                "width": 1,
                "height":1,
                "featureId":4,
                "url":"/html/xinban1-1/zhihuiyiyuan/"
            }
        ]
    }
}))

// 内容
app.use(route.post('/news/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 342,
                "categoryId": 55,
                "categoryName": "健康",
                "title":"中医理论八议之四：中医学是象科学的代表",
                "newsDesc":"中国文化，是人类多元文化中的一元，同样，中国传统科学，也是人类多元科学中的一元。中医学则是中国传统科学中最具代表性的学科。",
                "thumb": "/img/55.jpg",
                "order": 55,
                // "newsContent":"content",
                "createdAt":1514736000,
                "updatedAt":1517414400
            },
            {
                "id": 234,
                "categoryId": 55,
                "categoryName": "健康",
                "title":"中医理论八议之二：中医启示人类 重新审视科学",
                "newsDesc":"中医学是一门古老的学问。中西医之争延续了一百余年，尽管中医多次出现险情，岌岌可危",
                "thumb": "/img/58.jpg",
                "order": 155,
                // "newsContent":"content",
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))
app.use(route.post('/news/detail', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "id": 342,
                "categoryId": 55,
                "categoryName": "健康",
                "title":"中医理论八议之四：中医学是象科学的代表",
                "newsDesc":"中国文化，是人类多元文化中的一元，同样，中国传统科学，也是人类多元科学中的一元。中医学则是中国传统科学中最具代表性的学科。",
                "thumb": "/img/55.jpg",
                "order": 55,
                // "newsContent":"content",
                "createdAt":1514736000,
                "updatedAt":1517414400
            }
        ]
    }
}))

// 主版本列表
app.use(route.post('/version/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "version": "A",
                "versionName": "版本A",
                "featureList": [{"featrueId":1,"featureName":"推荐"},{"featrueId":2,"featureName":"智慧医院"},{"featrueId":3,"featureName":"视频"}]
            },
            {
                "version": "B",
                "versionName": "版本B",
                "featureList": [{"featrueId":1,"featureName":"推荐"},{"featrueId":2,"featureName":"智慧医院"},{"featrueId":3,"featureName":"视频"}]
            },
            {
                "version": "C",
                "versionName": "旗舰版",
                "featureList": [{"featrueId":1,"featureName":"推荐"},{"featrueId":2,"featureName":"智慧医院"},{"featrueId":3,"featureName":"视频"}]
            }

        ]
    }
}))

// 发布版本列表
app.use(route.post('/publish/list', ctx => {
    ctx.response.type = 'json'
    ctx.response.body = {
        "status": 0,
        "data": [
            {
                "publish": "A.1.5.23",
                "createAt": 1514736000,
                "publishdesc": "升级了某某功能..."
            },
            {
                "publish": "A.1.6.01",
                "createAt": 1514738000,
                "publishdesc": "升级了某某功能..."
            },
            {
                "publish": "A.2.0.00",
                "createAt": 1514938000,
                "publishdesc": "升级了某某功能..."
            }

        ]
    }
}))



app.use(
    route.post('*', ctx => {
        ctx.response.type = 'json'
        ctx.response.body = {
            "status": 0,
            "data": {
                "msg": "success"
            }
        }
    })
)






app.listen(8989)
console.log('app listen at 8989')

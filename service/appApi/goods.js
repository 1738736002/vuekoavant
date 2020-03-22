const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
let router = new KoaRouter()
const fs = require('fs')
const mongoose = require('mongoose')
    //商品详情数据保存到数据库的业务逻辑
router.get('/goodsInfomsg', async(ctx) => {
        fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            let saveCount = 0
            const Goods = mongoose.model('Goods')
            data.map((value, index) => {
                let newGoods = new Goods(value)
                newGoods.save().then(() => {
                    saveCount++
                    console.log('成功' + saveCount)
                }).catch(error => {
                    console.log('失败：' + error)
                })
            })
        })
        ctx.body = "开始导入数据"
    })
    //商品大型分类保存到数据库的业务逻辑
router.get('/interAllCategory', async(ctx) => {
        fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            let saveCount = 0
            const Category = mongoose.model('Category')
            data.RECORDS.map((value, index) => {
                const newCategory = new Category(value)
                console.log(value)
                newCategory.save().then(() => {
                    saveCount++
                    console.log('已插入' + saveCount)
                }).catch(error => {
                    console.log("出错了，未插入成功" + error)
                })
            })
        })
        ctx.body = "开始插入"
    })
    //子类商品保存到数据库的业务逻辑
router.get('/interAllCategorySub', async(ctx) => {
        fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            let saveCount = 0
            const CategorySub = mongoose.model('CategorySub')
            data.RECORDS.map((value, index) => {
                console.log(value)
                let newCategorySub = new CategorySub(value)
                newCategorySub.save().then(() => {
                    saveCount++
                    console.log('成功插入' + saveCount)
                }).catch(error => {
                    console.log('插入失败:' + error)
                })
            })
        })
        ctx.body = "开始导入数据"
    })
    //商品详情页数据接口
router.post('/getGoodsInfodata', async(ctx) => {
        try {
            const goodsId = ctx.request.body.goodsId
            const Goods = mongoose.model('Goods')
            let result = await Goods.findOne({ ID: goodsId }).exec()
            ctx.body = { code: 200, message: result }
        } catch (error) {
            ctx.body = { code: 500, message: error }
        }

    })
    //获取大类信息
router.get('/getCategoryList', async(ctx) => {
        try {
            const Category = mongoose.model('Category')
            let result = await Category.find().exec()
            ctx.body = { code: 200, message: result }
        } catch (err) {
            ctx.body = { code: 200, message: err }
        }
    })
    //获取小类别的信息
router.post('/getSmallMsg', async(ctx) => {
        try {
            let getSmallMsgId = ctx.request.body.categoryId
                // let getSmallMsgId = 1
            const CategorySub = mongoose.model('CategorySub')
            let result = await CategorySub.find({ MALL_CATEGORY_ID: getSmallMsgId }).exec()
            ctx.body = { code: 200, message: result }
        } catch (err) {
            ctx.body = { code: 200, message: err }
        }
    })
    //根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID', async(ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId
            // let categorySubId = "2c9f6c946016ea9b016016f79c8e0000"
        let page = ctx.request.body.page
        let num = 10 //每页的个数
        let strat = (page - 1) * num
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({ SUB_ID: categorySubId }).
        skip(strat).limit(num).exec() //skip就是跳过从第几个开始，limit限制一次取多少个
        ctx.body = { code: 200, message: result }
    } catch (err) {
        ctx.body = { code: 200, message: err }
    }
})
module.exports = router
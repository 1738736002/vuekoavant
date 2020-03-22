const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = '首页';
})

router.post('/register', async(ctx) => {
    let User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
        //成功返回code=200，并返回成功信息
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.post('/login', async(ctx) => {
    let loginMsg = ctx.request.body
    console.log(loginMsg)
    let userName = loginMsg.userName
    let password = loginMsg.password
        //导入用户模块
    const User = mongoose.model('User')
        //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({ userName: userName }).exec().then(async result => {
        console.log(result)
        if (result) {
            //如果为true,证明用户名存在，接下来验证密码
            //因为是实例化方法，所以要new出来才能用
            const User = mongoose.model('User')
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then((isMatch) => {
                    //返回比对结果
                    ctx.body = { code: 200, message: isMatch }
                })
                .catch(error => {
                    //出现异常，返回异常
                    console.log(error)
                    ctx.body = { code: 500, message: error }
                })
        } else {
            ctx.body = { code: 200, message: '用户名不存在' }
        }
    }).catch(error => {
        console.log(error)
        ctx.body = { code: 500, message: error }
    })
})
module.exports = router;
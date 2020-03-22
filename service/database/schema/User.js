const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
    //创建我们的用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }

})
userSchema.pre('save', function(next) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err)
                this.password = hash
                next()
            })
        })
    })
    //密码加密加盐对比
userSchema.methods = {
    comparePassword(_password, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (error, isMatch) => {
                if (!error) resolve(isMatch)
                else reject(error)
            })

        })

    }
}

//发布模型
mongoose.model('User', userSchema)
const BASEURL = "http://127.0.0.1:3000/"
const LOCALURL = "http://localhost:3030/"
const URL = {
    getShoppingMallInfo: BASEURL + 'getTest1',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register', ////获取注册
    loginUser: LOCALURL + 'user/login', //!获取登录信息
    getGoodsInfodata: LOCALURL + 'goods/getGoodsInfodata', //获取首页热卖商品详细信息
    getCategoryList: LOCALURL + 'goods/getCategoryList', //获取大类商品信息接口
    getSmallMsg: LOCALURL + 'goods/getSmallMsg', //获取小类商品信息接口
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', //获取小类商品分页信息接口
}

module.exports = URL
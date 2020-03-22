<template>
    <div>
        <div>
            <van-nav-bar 
               title="商品详情"
               left-text="返回"
               left-arrow
               @click-left="leftClick"
            />
        </div>
        <div>
           <img :src="goodsinfo.IMAGE1" alt="" width="100%">
        </div>
        <div class="goodsname">{{goodsinfo.NAME}}</div>
        <div class="goodsprice">￥{{goodsinfo.PRESENT_PRICE | priceFlite}}元</div>
        <div class="goods-tab">
            <van-tabs swipeable sticky>
                <van-tab title="商品详细" >
                   <div class="detail" v-html="goodsinfo.DETAIL"></div>
                   <div class="goods-bottom">
                       <div><van-button @click="addGoodsToCart" size="large" type="danger">加入购物车</van-button></div>
                       <div><van-button size="large" type="primary">直接购买</van-button></div>
                   </div>
                </van-tab>
                <van-tab title="评论">评论</van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/server.config.js'
import {Toast} from 'vant'
import {priced} from '../../filter/priceFilter'
    export default {
        data() {
            return {
                goodsID:'',
                goodsinfo:''
            }
        },
        created(){
            this.goodsID=this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId
            this.getInfo()
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getGoodsInfodata,
                    method:'post',
                    data:{
                        goodsId:this.goodsID,
                    }
                })
                .then(response=>{
                    if(response.data.code===200 && response.data.message){
                        this.goodsinfo=response.data.message
                    }else{
                        Toast('服务器出现故障，无法访问数据')
                    }
                    console.log(this.goodsinfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            leftClick(){
                this.$router.go(-1)
            },
            addGoodsToCart(){
                let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
                let isHave=cartInfo.find(cart=>cart.goodsId==this.goodsID)
                //如果没有
                if(!isHave){
                    let newCartInfo={
                        goodsId:this.goodsinfo.ID,
                        Name:this.goodsinfo.NAME,
                        Price:this.goodsinfo.PRESENT_PRICE,
                        Image:this.goodsinfo.IMAGE1,
                        Count:1
                    }
                    cartInfo.push(newCartInfo)     //添加到购物车
                    localStorage.cartInfo=JSON.stringify(cartInfo)   //保存到本地存储
                    Toast.success('添加成功')
                }else{
                    Toast.success("已添加该商品")
                }
                this.$router.push('/cart')                
            }
        },
        filters:{
            priceFlite(price) {
               return priced(price);
            } 
        }
    }
</script>

<style scoped>
.goodsname{
    background-color: #fff;
}
.goodsprice{
    background-color: #fff;
}
.detail{
    font-size: 0px;
}
.goods-bottom{
    position: fixed;
    bottom: 0px;
    left: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex: 1;
    padding: 5px;
}
</style>
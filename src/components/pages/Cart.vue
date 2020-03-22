<template>
    <div>
        <div><van-nav-bar title="购物车"/></div>
        <div class="cear-car"><van-button @click="cearCart" size="small" type="danger" plain>清空购物车</van-button></div>
        <div class="cart-list">
            <div class="wen-row" v-for="(item, index) in cartInfo" :key="index">
               <div class="wen-image"><img :src="item.Image" width="100%"></div>
               <div class="wen-text">
                   <div class="wen-good-name">{{item.Name}}</div>
                   <div class="wen-control"><van-stepper v-model="item.Count"/></div>
               </div>
               <div class="wen-goods-price">
                     <div>
                            ￥{{item.Price |myprice}}
                    </div>
                    <div>
                        x{{item.Count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.Price*item.Count | myprice}}
                    </div>
               </div>
            </div>
        </div>
        <div class="tollMoney">
            合计：￥{{tollMoney | myprice}}
            <van-button round type="warning" size="small">结算({{tollCount}})</van-button>
        </div>
    </div>
</template>

<script>
import {priced} from '../../filter/priceFilter'
    export default {
        data() {
            return {
                cartInfo:[],    //购物车内的商品
                isEmpty:false   //判断购物者是否为空
            }
        },
        created(){
            this.getCartinfo()
        },
        computed:{
            tollMoney(){
                let allMoney=0
                this.cartInfo.forEach((item,index)=>{
                    allMoney+=item.Price*item.Count
                })
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            },
            tollCount(){
                let allCount=0
                this.cartInfo.forEach((item,index)=>{
                    allCount+=item.Count
                })
                return allCount
            }
        },
        methods: {
            getCartinfo(){
                //判断localStorage里是否有购物车数据
                if(localStorage.cartInfo){
                //如果有数据，我们去除并赋值给cartInfo
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                 //打印到控制台查看效果
                console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo))
                this.isEmpty = this.cartInfo.length>0 ? true : false
            },
            cearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            }
        },
        filters:{
            myprice(price){
                return priced(price)
            }
        }
        
    }
</script>

<style scoped>
.cear-car{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    text-align: right;
    padding: 5px;
    border-bottom:1px solid #E4E7ED;
}
.cart-list{
    background-color: #fff;
}
.wen-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}
.wen-image{
    flex: 6;
}
.wen-text{
    flex: 14;
    padding-left: 10px;
}
.wen-control{
    padding-top: 10px;
}
.wen-good-price{
    flex: 4;
    text-align: right;
    padding: 5px;
}
.allPrice{
    color: red;
}
.tollMoney{
    text-align: right;
    background-color: #fff;
}
</style>
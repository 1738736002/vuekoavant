<template>
    <div class="goods-info" @click="getGoodsId()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import { priced } from "@/filter/priceFilter.js" 
    export default {
        props:["goodsImage","goodsName","goodsPrice","goodsId"],
        data() {
            return {
                
            }
        },
        filters:{
            moneyFilter(price){
                return priced(price)
            }
        },
        methods:{
            getGoodsId(){
                this.$router.push({name:'GoodsInfo',query:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<style scoped>
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
</style>
<template>
    <div>
      <div>
         <van-nav-bar title="商品列表"/>
      </div>
      <div>
         <van-row>
               <van-col span="8">
                  <div id="leftNav">
                    <ul>
                        <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryindex===index}" v-for="(item,index) in categoryInfo" :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                   </div>
               </van-col>
               <van-col span="16">
                   <div>
                       <van-tabs v-model="active" @click="onClickCategorySub">
                           <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                       </van-tabs>
                   </div>
                   <div id="right-list">
                       <van-pull-refresh v-model="refresh" @refresh="onRefresh">
                            <van-list v-model="loadding" :finished="finished" @load="onload">
                                    <div id="list-item" @click="golistinfo(item.ID)" v-for="(item, index) in goodlist" :key="index">
                                        <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImage" /></div>
                                        <div class="list-item-text">
                                            <div>{{item.NAME}}</div>
                                            <div class="">￥{{item.ORI_PRICE | myprice}}元</div>
                                        </div>
                                    </div>
                            </van-list>
                       </van-pull-refresh>
                   </div>
               </van-col>
         </van-row>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/server.config.js'
import { Toast } from 'vant'
import {priced} from '../../filter/priceFilter'
    export default {
        data() {
            return {    
                categoryInfo:[],
                categoryindex:0,
                categorySub:[],
                active:0,
                goodlist:[],    //商品信息
                loadding:false,   //上拉加载
                finished:false,  //shang拉加载是否没有数据了
                refresh:false,    //下拉加载
                page:1,
                categorySubId:'',
                errorImage:'this.src="'+require('@/assets/images/errorimg.png')+'"'
            }
        },
        filters:{
            myprice(price){
                return priced(price)
            }
        },
        methods:{
            getcategory(){
                axios({
                url:url.getCategoryList,
                method:'get',
            }).then(response=>{
                    console.log(response)
                    if(response.data.code===200 && response.data.message){
                        this.categoryInfo=response.data.message
                        this.getcategorysubById(this.categoryInfo[0].ID)
                    }else{
                        Toast('服务器出错！！！')
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //点击获取大类信息
            clickCategory(index,categoryid){
                this.categoryindex=index,
                this.page=1
                this.finished=false
                this.goodlist=[]
                this.getcategorysubById(categoryid)
            },
            //获取子类信息
            getcategorysubById(categoryid){
                axios({
                    url:url.getSmallMsg,
                    method:'post',
                    data:{
                        categoryId:categoryid
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code===200 && response.data.message){
                        this.categorySub=response.data.message
                        this.active=0
                        this.categorySubId=this.categorySub[0].ID
                        this.onload()
                    }else{
                        Toast('服务器出错')
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            //获取分页信息
            getcategorypageById(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{categorySubId:this.categorySubId,page:this.page}
                })
                .then(response=>{
                    console.log(response);
                    if(response.data.code==200 && response.data.message.length){
                        this.page++
                        this.goodlist=this.goodlist.concat(response.data.message)
                    }else{
                        this.finished=true
                    }
                     this.loading=false;
                })
                .catch(error=>{
                    console.log(error);
                })
            },
            //下拉加载
            onload(){   
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getcategorypageById()
                },1000)
            },
            //上拉加载
            onRefresh(){
                setTimeout(()=>{
                    this.refresh=false
                    this.goodlist=[]
                    this.page=1
                    this.onload()
                    this.finished=false
                },500)
            },
            //点击子类获取商品信息
            onClickCategorySub(index){
                //console.log( this.categorySub)
                this.categorySubId= this.categorySub[index].ID
                console.log(this.categorySubId)

                this.goodlist=[]
                this.finished = false
                this.page=1
                this.onload()

            },
            golistinfo(id){
                this.$router.push({name:'GoodsInfo',params:{goodsId:id}})
            }
        },
        mounted() {
            let clientHeight=document.documentElement.clientHeight
            document.getElementById('leftNav').style.height=clientHeight-46-50+"px"
            document.getElementById('right-list').style.height=clientHeight-90-50 +'px'
        },
        created() {
            this.getcategory()
        },
    }
</script>

<style scoped>
#leftNav{
    background-color: #E4E7ED;
}
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background: #FFF;
}
#right-list{
    overflow: scroll;
}
#list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
.list-item-img{
        flex:8;
    }
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>
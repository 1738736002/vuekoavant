<template>
  <div>
    <!--search-->
    <div class="search-bar">
      <van-row class="row-cantianer">
        <van-col span="3"
          ><img :src="inocImg" width="70%" class="locationic"
        /></van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="快搜" />
        </van-col>
        <van-col span="5"><van-button size="mini">搜索</van-button></van-col>
      </van-row>
    </div>
    <!--swiper-->
    <div class="swiper">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(item, index) in bannerPic" :key="index">
          <img :src="item.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--类别导航-->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{ cate.mallCategoryName }}</span>
      </div>
    </div>
    <!--广告-->
    <div>
      <img v-lazy="adbanner" width="100%" />
    </div>
    <!--商品推荐-->
    <div class="recommend">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recmmend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ￥{{ item.price | priceFlite }}(￥{{
                  item.mallPrice | priceFlite
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--楼层效果-->
    <floorComponent
      :floorData="floor1"
      :floorNamed="floorName.floor1"
    ></floorComponent>
    <floorComponent
      :floorData="floor2"
      :floorNamed="floorName.floor2"
    ></floorComponent>
    <floorComponent
      :floorData="floor3"
      :floorNamed="floorName.floor3"
    ></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
           <van-row gutter="20">
              <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                 <goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
              </van-col>         
           </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";
import { priced } from "@/filter/priceFilter.js";
import url from '@/server.config.js'
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "shopping Mall",
      inocImg: require("../../assets/images/location.png"),
      bannerPic: [],
      category: [],
      adbanner: [],
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      hotGoods:[],
    };
  },
  filters: {
    priceFlite(price) {
      return priced(price);
    }
  },
  components: { swiper, swiperSlide, floorComponent,goodsInfo},
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adbanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPic = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods=response.data.data.hotGoods
          console.log(response.data);
        }
      })
      .catch(error => {});
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.locationic {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0rem 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recmmend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods{
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>

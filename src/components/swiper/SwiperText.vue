<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
            <div class="centent">
               国家卫生健康委高级别专家组组长 中国工程院院士 钟南山：我知道有一些国家是做的比较好，有一些国家的认识并不完全是这样子。当然现在这个看法也开始改变，已经越来越引起老百姓的关注，不把它当成是一个流感的看法了，这个我很高兴。我估计是基于在各国都采取积极的措施这样的情况下，是这么一个评估，但是假如说在我们全球里头有一些国家并没有把危害性以及它的传染性看的很重、进行强烈的干预的话，那这个（疫情期）可能还会延长。现在进一步又提到大流行，那是（警戒级别）最高的了，要求各国都要采取措施来预防疾病，同时及时发现它。意大利病死率接近6%了，一下来得太多了，同时产生很多包括医疗资源的问题，病床的问题，医生照顾问题，我们从死亡率看，包括美国、法国、西班牙这些都是2点几、3的样子，美国也很高，2.9几，这个病它很强的传染性。（应）非常强烈的干预，我的建议就是这样，呼吁各个国响应联合国世界卫生组织的呼吁，就是能够有一个国家层面的干预，这样的话假如说各国都能够动员起来，意大利搞起来了，韩国也搞起来了，韩国这两天开始下降，下降的比较明显，要是这样的话，我还是期待有可能实现的6月份（控制住）。
            </div>
        </swiper-slide>

      </swiper>
  </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption:{
                    direction:'vertical',
                    slidesPerView: 'auto',
                    freeMode:true,
                    mousewheel:true
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>

<style scoped>
  .swiper{
      height: 300px;
      overflow: hidden;
  }
  .text{
      font-size: 18px !important;
      text-align: left;
      padding:30px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

  }
</style>
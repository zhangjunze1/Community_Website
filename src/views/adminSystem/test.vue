<template>
  <div class="test">
    <div class="content">
      <div class="card" v-for="(item,index) in list" :key="index">
        <img class="titlepic" :src="item.picsrc" >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="titleinfo">
          <div class="titleinfo-left">
            <img class="avatar" :src="item.avatarsrc">
            <div class="username">{{ item.username }}</div>
          </div>
          <div class="titleinfo-right">
            <div class="time">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      list: [
        {
          picsrc: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics6.baidu.com%2Ffeed%2F0b7b02087bf40ad141cd74ee30b105d5a9ecce3d.jpeg%3Ftoken%3De1b0a818ea278f6b642b11e038131ddb&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1648314000&t=8b2cdb239b0cafdef1f15c84285723ca',
          title: '测试测试测试测试测试测试测试测试测试',
          username: '啊吧啊吧',
          avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
          time: '一天前'
        },
        {
          picsrc: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2Ffaf2b2119313b07e7d6cc4d8f5d7842996dd8c1c.jpeg%3Ftoken%3Ddba4c17bc5faf32c8647bf6d97bf87a7&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1648314000&t=d57771447114b22156a765572d65f68f',
          title: '测试测试测试测试测试测试测试测试测试22222',
          username: '啊吧啊吧阿巴',
          avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
          time: '一月前'
        },
        {
          picsrc: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics5.baidu.com%2Ffeed%2Fa6efce1b9d16fdfa99d8be0b438f995e95ee7bad.jpeg%3Ftoken%3D29e2fd3bb0803cc3d1edca686d2af296&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1648314000&t=a40460c554f1846b3de01ae4408986bd',
          title: '测试测试测试测试测试测试测试测试测试333',
          username: '啊吧啊吧阿巴阿巴',
          avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
          time: '一年前'
        },
        {
          picsrc: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics6.baidu.com%2Ffeed%2F09fa513d269759ee962f2cd548fb561c6d22dfb8.jpeg%3Ftoken%3D009b9382747c7f731ba14062b9957677&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1648314000&t=c9ae5717d6f4b507ff3f776357318307',
          title: '测试测试测试测试测试测试测试测试测试444',
          username: '啊吧啊吧',
          avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
          time: '一天前'
        },
        {
          picsrc: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics6.baidu.com%2Ffeed%2F0b7b02087bf40ad141cd74ee30b105d5a9ecce3d.jpeg%3Ftoken%3De1b0a818ea278f6b642b11e038131ddb&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1648314000&t=8b2cdb239b0cafdef1f15c84285723ca',
          title: '测试测试测试测试测试测试测试测试测试555',
          username: '啊吧啊吧',
          avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
          time: '一天前'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .test{
    width: 100%;
    height: 100%;
    background: #333333;
  }
  .content{
    width: 100%;
  }
  .card{
    display: inline-block;
    width: 46%;
    height: 200px;
    margin: 2%;
    padding: 1%;
  }
  .titlepic{
    width: 98%;
    height: 50%;
  }
  .title{
    color: #ffffff;
    font-size: 14px;
    margin: 2% 0 0 0;
    font-weight: 500;
    height: 20%;
    width: 100%;
    word-wrap:break-word;
    overflow: hidden;
  }
  .titleinfo{
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .titleinfo-left{
    display: flex;
    align-items: center;
  }
  .titleinfo-right{
    display: flex;
    align-items: center;
  }
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 5px;
  }
  .username{
    color: #ffffff;
    font-size: 12px;
  }
  .time{
    color: #c2c2c2;
    font-size: 12px;
  }
</style>

<template>
  <el-footer app padless absolute>
    <div class="footer-wrap">
      <div>&copy; 2021 CATG LAB</div>
    </div>
  </el-footer>
</template>

<script>
</script>

<style scoped>
.footer-wrap{
  position: absolute;
  bottom: 0;
  width: 100%;
}
  .footer-wrap {
    bottom: 0%!important;
    width: 97%;
    line-height: 1;
    position: fixed;
    padding: 0.5% 1.7%;
    color: black;
    margin: auto;
    font-size: 0.296rem;
    text-align: center;
    background: #EEEEEE;
    /*background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);*/
    background-size: 200% 400%;
    animation: Gradient 10s ease infinite;
  }
  .footer-wrap a {
    color: #eee !important;
  }
  @keyframes Gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>

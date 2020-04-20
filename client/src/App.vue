<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
p {
  font-size: 16px;
  color: #7a838b;
  line-height: 28px;
  margin-bottom: 0;
  font-weight: 400;
}
</style>

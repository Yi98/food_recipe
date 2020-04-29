<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
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
* {
  font-family:Helvetica, sans-serif;
}

p {
  font-size: 16px;
  color: #7a838b;
  line-height: 28px;
  margin-bottom: 0;
  font-weight: 400;
}

h3 {
  font-size: 38px;
  font-weight: 400;
  color: #040e27;
  position: relative;
  z-index: 0;
  padding-bottom: 7px;
}

.boxed-btn4 {
  background: #ff4a52;
  color: #fff;
  display: inline-block;
  padding: 13px 39px;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: 0;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-align: center;
  text-transform: capitalize;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
}
</style>

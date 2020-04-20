<template>
<!DOCTYPE html>
<div id="app">
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <body>
      <Header></Header>
      <Index></Index>
      <Footer></Footer>
    </body>
  </html>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Index from './components/Index.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Index
  }
};
</script>

<style>
p {
    font-size: 16px;
    color: #7A838B;
    line-height: 28px;
    margin-bottom: 0;
    font-weight: 400;
}
</style>

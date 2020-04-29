<template>
  <b-container class="text-center">
    <b-row>
      <b-col lg="12">
        <img src="../assets/404.png" />
        <p><router-link :to="{name: 'Index'}">Back to safety</router-link></p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Page Not Found"
};
</script>


<style scoped>
img {
  padding-top: 10vh;
  width: 70%;
}

p {
  padding-bottom: 20vh;
}

@media (max-width: 767px) {
  img {
  padding-top: 20vh;
  width: 100%;
}

p {
  padding-bottom: 25vh;
}
}

</style>
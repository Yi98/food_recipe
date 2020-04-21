<template>
  <div class="destination_banner_wrap overlay">
    <div class="destination_text text-center">
      <h3 id="hero-text" class="pb-4 m-auto">What to cook today ?</h3>
      <b-row class="align-items-center m-auto">
        <b-col lg="2" md="1"></b-col>
        <!-- <div class="col-lg-2 col-md-1"></div> -->
        <b-col lg="8" md="10">
          <b-row>
            <b-col lg="9" md="8" sm="12" class="pt-3">
              <b-form-input
                id="index-search-box"
                v-model="text"
                name="first_name"
                placeholder="Find recipe"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Find Recipe'"
                required
                class="single-input m-auto w-100"
              ></b-form-input>
            </b-col>
            <b-col lg="3" md="4" sm="12" class="pt-3">
              <div class="search_btn">
                <b-button
                  id="search-btn"
                  class="boxed-btn4 w-100"
                  onclick="onIndexSearchRecipe()"
                  style="height: 55px;"
                >Search</b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="2" md="1"></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection"
};
</script>

<style scoped>
.destination_banner_wrap {
  background-image: url(../assets/hero-banner.jpg);
  padding: 190px 0;
  background-size: cover;
  background-position: center center;
}

#index-search-box {
  background-color: rgb(242, 242, 242);
  height: 55px;
  border-radius: 5px;
}

#search-btn {
  box-shadow: none;
  background-color: #ff4a52;
}

.single-input {
  display: block;
  width: 100%;
  line-height: 40px;
  border: none;
  outline: none;
  background: #f9f9ff;
  padding: 0 20px;
}

.destination_banner_wrap.overlay:before {
  opacity: 0.3;
}

.overlay {
  position: relative;
  z-index: 0;
}

.overlay::before {
  position: absolute;
  content: "";
  background-color: #040e27;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.1;
}

.destination_banner_wrap .destination_text p {
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

.destination_banner_wrap .destination_text h3 {
  font-size: 80px;
  line-height: 90px;
  color: #fff;
  margin-bottom: 0;
}

.destination_banner_wrap {
  height: 600px;
}

@media (min-width: 768px) and (max-width: 991px) {
  /* line 80, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_destination.scss */
  .destination_banner_wrap {
    padding: 250px 0;
  }
}

@media (max-width: 767px) {
  .destination_banner_wrap .destination_text h3 {
    font-size: 41px;
    line-height: 50px;
  }

  .destination_banner_wrap {
    height: 570px;
    padding: 130px 0;
  }

  h3#hero-text {
    width: 90%;
  }
}
</style>
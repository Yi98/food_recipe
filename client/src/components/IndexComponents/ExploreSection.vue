<template>
  <div class="popular_destination_area">
    <b-container>
      <b-row>
        <b-col lg="12">
          <div class="section_title">
            <h3>Explore</h3>
            <p>Pick your favourite categories to start with.</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Main course')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img
                src="../../assets/main-course.jpg"
                alt
                style="height: 250px; object-fit: cover; width: 100%"
              />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Main course</p>
            </div>
          </div>
        </b-col>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Side dish')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img src="../../assets/side-dish.jpg" alt class="food-category" />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Side dish</p>
            </div>
          </div>
        </b-col>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Appetizer')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img src="../../assets/appetizer.jpg" alt class="food-category" />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Appetizer</p>
            </div>
          </div>
        </b-col>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Drink')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img src="../../assets/drink.jpg" alt class="food-category" />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Drink</p>
            </div>
          </div>
        </b-col>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Snack')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img src="../../assets/snack.jpg" alt class="food-category" />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Snack</p>
            </div>
          </div>
        </b-col>
        <b-col lg="4" md="6">
          <div
            class="single_destination"
            onclick="onExploreRecipe('Dessert')"
            style="cursor: pointer;"
          >
            <div class="thumb">
              <img src="../../assets/dessert.jpg" alt class="food-category" />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">Dessert</p>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="pt-2 pb-3">
        <b-col lg="12">
          <router-link to="/explore">
            <p style="color: #040E27; text-decoration: underline;">
              <span style="font-size: 18px;">Show more categories</span>
              <b-icon-chevron-right class="pl-1 pt-1 right-icon"></b-icon-chevron-right>
            </p>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Explore Section"
};
</script>

<style scoped>
.popular_destination_area {
  padding-top: 60px;
  padding-bottom: 60px;
}

.food-category {
  height: 250px;
  object-fit: cover;
  width: 100%;
}

.section_title p {
  font-size: 16px;
  color: #7a838b;
  line-height: 28px;
  margin-bottom: 0;
  font-weight: 400;
}

.section_title {
  margin-bottom: 35px;
}

.popular_destination_area .single_destination:before {
  background: -moz-linear-gradient(
    top,
    rgba(4, 14, 39, 0) 0%,
    rgba(4, 14, 39, 0.7) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(4, 14, 39, 0) 0%,
    rgba(4, 14, 39, 0.7) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(4, 14, 39, 0) 0%,
    rgba(4, 14, 39, 0.7) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00040e27', endColorstr='#b3040e27',GradientType=0 );
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
}

.popular_destination_area .single_destination .content p {
  margin-bottom: 0;
  font-size: 22px;
  color: #fff;
  font-weight: 400;
  font-family: "Rubik", sans-serif;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.popular_destination_area .single_destination .content p a {
  display: inline-block;
  background: #ff4a52;
  font-size: 12px;
  border-radius: 30px;
  font-weight: 400;
  padding: 0px 12px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  margin-left: 10px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.popular_destination_area .single_destination {
  position: relative;
  margin-bottom: 30px;
  border-radius: 5px;
  overflow: hidden;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.popular_destination_area .single_destination:hover .content p {
  color: #ff4a52;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.popular_destination_area .single_destination .content {
  position: absolute;
  left: 30px;
  bottom: 30px;
  z-index: 7;
}

.right-icon {
  font-size: 20px;
}

@media (max-width: 767px) {
  .section_title h3 {
    font-size: 30px;
    line-height: 36px;
  }
}
</style>
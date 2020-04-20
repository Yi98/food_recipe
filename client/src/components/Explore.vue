<template>
  <div>
    <div class="where_togo_area py-5 explore_banner_wrap">
      <b-container>
        <b-row class="align-items-center">
          <b-col lg="3" md="5" class="pt-2">
            <div class="form_area">
              <h3 class="mb-0">Pick a category :</h3>
            </div>
          </b-col>
          <b-col lg="9" md="7">
            <b-row>
              <b-col md="12" cols="12" class="pt-2">
                <div class="filter_bordered">
                  <div class="filter_inner">
                    <b-row>
                      <b-col lg="12">
                        <div class="single_select">
                          <b-form-select
                            class="category-select mt-2"
                            v-model="selected"
                            :options="options"
                          ></b-form-select>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="popular_places_area pt-5">
      <b-container>
        <b-row class="pb-5">
          <b-col lg="12">
            <div class="section_title mb_70">
              <h3>
                Explore
                <span id="search-title"></span>
              </h3>
              <p>Discover the hidden gems.</p>
            </div>
          </b-col>
        </b-row>
        <b-row id="explore-result-container"></b-row>

        <b-row id="recipe-placeholder" style="background-color: #fff;">
          <b-col lg="12">
            <b-row>
              <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
                <div class="skeleton-wrapper-body">
                  <div class="skeleton-label"></div>
                  <div class="skeleton-author"></div>
                  <div class="skeleton-content-1"></div>
                  <div class="skeleton-content-2"></div>
                  <div class="skeleton-content-3"></div>
                </div>
              </b-col>
              <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
                <div class="skeleton-wrapper-body">
                  <div class="skeleton-label"></div>
                  <div class="skeleton-author"></div>
                  <div class="skeleton-content-1"></div>
                  <div class="skeleton-content-2"></div>
                  <div class="skeleton-content-3"></div>
                </div>
              </b-col>
              <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
                <div class="skeleton-wrapper-body">
                  <div class="skeleton-label"></div>
                  <div class="skeleton-author"></div>
                  <div class="skeleton-content-1"></div>
                  <div class="skeleton-content-2"></div>
                  <div class="skeleton-content-3"></div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <a
                class="boxed-btn4"
                onclick="loadExploreRecipe(null)"
                style="color: #fff"
              >More Recipes</a>
            </div>
          </b-col>
        </b-row>

      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Explore",
  data() {
    return {
      selected: "Main Course",
      options: [
        { value: "Main Course", text: "Main Course" },
        { value: "Side Dish", text: "Side Dish" },
        { value: "Appetizer", text: "Appetizer" },
        { value: "Drink", text: "Drink" },
        { value: "Snack", text: "Snack" },
        { value: "Dessert", text: "Dessert" }
      ]
    };
  }
};
</script>

<style scoped>
.popular_places_area {
  padding-top: 60px;
  padding-bottom: 60px;
  background: #F7FAFD;
}

.popular_places_area .more_place_btn {
  margin-top: 40px;
}

.category-select {
  cursor: pointer;
}

.explore_banner_wrap {
  background-image: url(../assets/explore-banner.jpg);
  padding: 340px 0;
  background-size: cover;
  background-position: center center;
}

.where_togo_area .form_area h3 {
  font-size: 24px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 0;
}

.skeleton-wrapper {
  background: #fff;
  border: 1px solid;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  margin: 10px 15px;
}

.skeleton-wrapper-inner {
  height: 150px;
  padding: 15px;
  position: relative;
}

.skeleton-wrapper-body div {
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderSkeleton;
  -webkit-animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from(#f6f7f8),
    color-stop(0.2, #edeef1),
    color-stop(0.4, #f6f7f8),
    to(#f6f7f8)
  );
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 300px;
  height: 300px;
  position: relative;
}

.skeleton-wrapper-body {
  -webkit-animation-name: skeletonAnimate;
  background-image: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(deg),
    color-stop(0, red),
    color-stop(0.15, orange),
    color-stop(0.3, yellow),
    color-stop(0.45, green),
    color-stop(0.6, blue),
    color-stop(0.75, indigo),
    color-stop(0.8, violet),
    to(red)
  );
  background-image: -webkit-linear-gradient(
    135deg,
    red 0%,
    orange 15%,
    yellow 30%,
    green 45%,
    blue 60%,
    indigo 75%,
    violet 80%,
    red 100%
  );
  background-repeat: repeat;
  background-size: 50% auto;
}

.skeleton-wrapper-body div {
  position: absolute;
  right: 15px;
  left: 15px;
  top: 15px;
}

div.skeleton-avatar {
  height: 60px;
  width: 60px;
  border-radius: 60px;
  right: auto;
}

div.skeleton-label {
  top: 0;
  height: 230px;
  border-radius: 5px 5px 0px 0px;
}

div.skeleton-author {
  top: 260px;
  height: 25px;
  left: 35px;
  width: 300px;
}

div.skeleton-content-1,
div.skeleton-content-2,
div.skeleton-content-3 {
  left: 35px;
  right: 15px;
  height: 12px;
}

div.skeleton-content-1 {
  top: 300px;
  width: 280px;
}

div.skeleton-content-2 {
  top: 335px;
  width: 90px;
  display: inline;
}

div.skeleton-content-3 {
  top: 335px;
  width: 90px;
  left: 150px;
  display: inline;
}

@-webkit-keyframes placeholderSkeleton {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

@-webkit-keyframes skeletonAnimate {
  from {
    background-position: top left;
  }
  to {
    background-position: top right;
  }
}

div.recipe-placeholder-card {
  height: 24rem;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(#f7fafd, #f7fafd);
  background-clip: content-box, padding-box;
}

@media (max-width: 1200px) and (min-width: 992px) {
  .where_togo_area .form_area h3 {
    font-size: 18px;
  }
}
</style>
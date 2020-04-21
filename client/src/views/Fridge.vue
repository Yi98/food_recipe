<template>
  <div>
    <div class="where_togo_area py-5 search_banner_wrap">
      <b-container>
        <div class="row align-items-center">
          <b-col lg="3" class="py-2">
            <div class="form_area">
              <h3 class="mb-0">What's in your fridge?</h3>
            </div>
          </b-col>
          <b-col lg="9" md="10">
            <b-row>
              <b-col lg="9" md="8" sm="12" cols="12" class="py-2">
                <b-form-input
                  id="add-ingredient-box"
                  v-model="text"
                  name="first_name"
                  placeholder="Add ingredients"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Add ingredients'"
                  required
                  class="single-input m-auto w-100"
                ></b-form-input>
              </b-col>
              <b-col lg="3" md="4" sm="12" cols="12" class="py-2">
                <div class="search_btn">
                  <b-button
                    id="search-btn"
                    class="boxed-btn4 w-100"
                    onclick="onIndexSearchRecipe()"
                    style="height: 55px;"
                  >Add</b-button>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="2" md="1"></b-col>
        </div>
      </b-container>
    </div>

    <div class="popular_places_area pt-3">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="section_title mb_70">
              <b-row>
                <b-col lg="12">
                  <h4 style="display: inline-block" class="pt-3 pb-4 pr-3 m-0">
                    Available ingredients:
                    <span id="search-title"></span>
                  </h4>
                  <div style="display: inline" id="ingredients-chip-group"></div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>

        <b-row id="fridge-result-container"></b-row>
        <div>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </div>

        <b-row>
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <p>End of results</p>
              <!-- <a class="boxed-btn4" onclick="getRecipeByIngredients()" style="color: #fff">More Recipes</a> -->
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import CardPlaceholder from "../components/CardPlaceholder";

export default {
  name: "Fridge",
  components: {
    CardPlaceholder
  }
};
</script>

<style scoped>
#add-ingredient-box {
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

.search_banner_wrap {
  background-image: url(../assets/search-banner.jpg);
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

.popular_places_area {
  padding-top: 60px;
  padding-bottom: 60px;
  background: #f7fafd;
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

@media (max-width: 1200px) and (min-width: 992px) {
  .where_togo_area .form_area h3 {
    font-size: 18px;
  }
}
</style>
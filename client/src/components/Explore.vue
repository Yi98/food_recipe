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

        <div>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </div>

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
import CardPlaceholder from "./CardPlaceholder";

export default {
  name: "Explore",
  components: {
    CardPlaceholder
  },
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
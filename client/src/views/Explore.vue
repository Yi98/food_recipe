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
                            @change="onCategoryChange()"
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

        <div v-if="!hasLoaded">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </div>
        <b-row id="explore-result-container" v-else>
          <RecipeCard v-for="recipe in recipes" v-bind:key="recipe.id" v-bind:recipe="recipe"></RecipeCard>
        </b-row>

        <b-row>
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <a
                @click="onLoadMoreRecipes()"
                class="boxed-btn4"
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
import axios from "axios";
import CardPlaceholder from "../components/CardPlaceholder";
import RecipeCard from "../components/RecipeCard";

export default {
  name: "Explore",
  components: {
    CardPlaceholder,
    RecipeCard
  },
  data() {
    return {
      recipes: [],
      hasLoaded: false,
      offset: 0,
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
  },
  mounted: function() {
    this.onCategoryChange();
  },
  methods: {
    onCategoryChange: function() {
      this.hasLoaded = false;
      this.offset = 0;

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${this.offset}`
        )
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
          console.log(this.recipes);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoadMoreRecipes: function() {
      this.offset += 6;

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${this.offset}`
        )
        .then(response => {
          this.recipes.push(...response.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  background-color: #040e27;
  padding: 340px 0;
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
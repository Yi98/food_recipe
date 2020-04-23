<template>
  <div>
    <div class="where_togo_area py-5 search_banner_wrap">
      <b-container>
        <div class="row align-items-center">
          <b-col lg="3" class="py-2">
            <div class="form_area">
              <h3 class="mb-0">What to cook today?</h3>
            </div>
          </b-col>
          <b-col lg="9" md="10">
            <b-row>
              <b-col lg="9" md="8" sm="12" cols="12" class="py-2">
                <b-form-input
                  id="index-search-box"
                  v-model="searchTitle"
                  type="text"
                  name="first_name"
                  placeholder="Find recipe"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Find Recipe'"
                  required
                  class="single-input m-auto w-100"
                ></b-form-input>
              </b-col>
              <b-col lg="3" md="4" sm="12" cols="12" class="py-2">
                <div class="search_btn">
                  <b-button
                    id="search-btn"
                    class="boxed-btn4 w-100"
                    @click="onSearchRecipe()"
                    style="height: 55px;"
                  >Search</b-button>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="2" md="1"></b-col>
        </div>
      </b-container>
    </div>

    <div class="popular_places_area pt-5">
      <b-container>
        <b-row class="pb-5">
          <b-col lg="12">
            <div class="section_title mb_70">
              <h3>
                Search results: {{ searchTitle }}
                <span id="search-title"></span>
              </h3>
              <p>Browse amazing recipe to cook and stay hunger free.</p>
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

        <b-row v-if="hasLoaded">
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <a class="boxed-btn4" @click="onLoadMoreRecipes()" style="color: #fff">More Recipes</a>
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
  name: "Search",
  components: {
    CardPlaceholder,
    RecipeCard
  },
  data: function() {
    return {
      hasLoaded: false,
      recipes: [],
      searchTitle: "",
      searchOffset: 0
    };
  },
  methods: {
    onSearchRecipe: function() {
      this.searchOffset = 0;
      this.hasLoaded = false;

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.searchTitle}&offset=${this.searchOffset}`
        )
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoadMoreRecipes: function() {
      this.searchOffset += 6;

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.searchTitle}&offset=${this.searchOffset}`
        )
        .then(response => {
          console.log(response);
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

@media (max-width: 767px) {
  .section_title h3 {
    font-size: 30px;
    line-height: 36px;
  }
}

@media (max-width: 1200px) and (min-width: 992px) {
  .where_togo_area .form_area h3 {
    font-size: 18px;
  }
}
</style>
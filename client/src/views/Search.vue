<template>
  <div>
    <div class="popular_places_area pt-2">
      <b-container>
        <div class="row align-items-center pb-4 search-container">
          <b-col lg="12">
            <b-row>
              <b-col lg="10" md="8" sm="12" cols="12" class="py-2">
                <b-form-input
                  id="index-search-box"
                  v-model="searchTitle"
                  type="email"
                  required
                  placeholder="Find recipe"
                ></b-form-input>
              </b-col>
              <b-col lg="2" md="4" sm="12" cols="12" class="py-2">
                <div class="search_btn">
                  <b-button
                    id="search-btn"
                    class="boxed-btn4 w-100 mb-4"
                    @click="onSearchRecipe()"
                    style="height: 50px;"
                  >Search</b-button>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </div>

        <b-row class="empty-container" v-if="isEmpty">
          <b-col lg="12" class="text-center">
            <img src="../assets/empty.png" class="empty-img" />
            <P>Such empty. Search something.</P>
          </b-col>
        </b-row>

        <div v-if="!hasLoaded && !isEmpty">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </div>

        <div v-if="hasLoaded">
          <b-row>
            <b-col lg="12">
              <h3>Search Results: {{ searchTitle }}</h3>
            </b-col>
          </b-row>
          <b-row id="explore-result-container">
            <RecipeCard v-for="recipe in recipes" v-bind:key="recipe.id" v-bind:recipe="recipe"></RecipeCard>
          </b-row>
        </div>

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
      isEmpty: true,
      recipes: [],
      searchTitle: "",
      searchOffset: 0
    };
  },
  methods: {
    onSearchRecipe: function() {
      this.searchOffset = 0;
      this.hasLoaded = false;
      this.isEmpty = false;

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
.empty-container {
  padding: 12vh 0;
}

.empty-img {
  width: 30%;
}

h3 {
  font-size: 1.8rem;
}

#index-search-box {
  height: 50px;
  box-shadow: none;
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

.popular_places_area {
  padding-top: 60px;
  padding-bottom: 100px;
  /* background: #f9fcff; */
  background: #fff;
}

.popular_places_area .more_place_btn {
  margin-top: 40px;
}

.category-select {
  cursor: pointer;
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

  .empty-img {
    width: 60%;
  }

  .empty-container {
    padding: 5vh 0;
  }
}

@media (max-width: 1200px) and (min-width: 992px) {
  .where_togo_area .form_area h3 {
    font-size: 18px;
  }
}
</style>
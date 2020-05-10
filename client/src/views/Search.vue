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
                  v-on:keyup="checkEnterPressed"
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
              <h3>Search Results: {{ searchedTerm }}</h3>
            </b-col>
          </b-row>
          <b-row id="explore-result-container">
            <RecipeCard v-for="recipe in recipes" v-bind:key="recipe.id" v-bind:recipe="recipe"></RecipeCard>
          </b-row>
        </div>

        <b-row v-if="hasLoaded">
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                :hide-goto-end-buttons="true"
                align="center"
                @input="onPageChange()"
              ></b-pagination>
              <!-- <a class="boxed-btn4" @click="onLoadMoreRecipes()" style="color: #fff">More Recipes</a> -->
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
      searchTitle: this.$store.state.currentSearch,
      searchedTerm: null,
      perPage: 1,
      currentPage: 1,
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  methods: {
    onSearchRecipe: function() {
      this.hasLoaded = false;
      this.isEmpty = false;
      this.currentPage = 1;
      this.searchedTerm = this.searchTitle;

      this.$store.commit("updateSearch", { title: this.searchTitle });

      axios
        .get(`${this.domain}/api/recipe/search?q=${this.searchTitle}&offset=0`)
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onPageChange: function() {
      this.hasLoaded = false;

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.searchTitle}&offset=${this
            .currentPage * 6}`
        )
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkEnterPressed: function(e) {
      if (e.keyCode === 13) {
        this.onSearchRecipe();
      }
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #e0dfdf;
  border-color: #ebebeb;
  color: #3a3a3a;
}

.page-link {
  color: #3a3a3a;
}
</style>

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
  padding-bottom: 50px;
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
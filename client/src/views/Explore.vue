<template>
  <div class="popular_places_area pt-3" id="topView">
    <b-container>
      <b-row>
        <b-col lg="3" md="12" class="py-1">
          <h4>Select a category :</h4>
        </b-col>
        <b-col lg="9" md="12">
          <div class="single_select">
            <b-form-select
              @change="onCategoryChange()"
              class="category-select mb-5"
              v-model="selected"
              :options="options"
            ></b-form-select>
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
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              :hide-goto-end-buttons="true"
              align="center"
              @input="onPageChange()"
            ></b-pagination>
            <!-- <a @click="onLoadMoreRecipes()" class="boxed-btn4" style="color: #fff">More Recipes</a> -->
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import VueScrollTo from "vue-scrollto";

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
      selected: this.$store.state.currentCategory,
      options: [
        { value: "Main Course", text: "Main Course" },
        { value: "Side Dish", text: "Side Dish" },
        { value: "Appetizer", text: "Appetizer" },
        { value: "Drink", text: "Drink" },
        { value: "Snack", text: "Snack" },
        { value: "Dessert", text: "Dessert" }
      ],
      perPage: 1,
      currentPage: this.$store.state.categoryPage,
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  mounted: function() {
    this.onCategoryChange(
      this.$store.state.currentCategory,
      this.$store.state.categoryPage
    );
  },
  methods: {
    onCategoryChange: function(category, page = 1) {
      let selected = this.selected;

      this.$store.commit("updateCategory", {
        category: selected,
        page
      });

      this.hasLoaded = false;
      this.currentPage = this.$store.state.categoryPage;
      
      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${(page -
            1) *
            6}`
        )
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

      this.$store.commit("updateCategory", {
        category: this.selected,
        page: this.currentPage
      });

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${(this
            .currentPage -
            1) *
            6}`
        )
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });

      VueScrollTo.scrollTo("#topView", 700, { cancelable: false });
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  }
};
</script>

<style scoped>
.custom-select {
  border: 1px solid #959899;
}

.popular_places_area {
  padding-top: 60px;
  padding-bottom: 60px;
  background: #fff;
}

.popular_places_area .more_place_btn {
  margin-top: 40px;
}

.category-select {
  cursor: pointer;
  box-shadow: none;
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
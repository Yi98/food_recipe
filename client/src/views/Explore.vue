<template>
  <div class="popular_places_area pt-3">
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
      currentPage: 1,
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  mounted: function() {
    this.onCategoryChange();
  },
  methods: {
    onCategoryChange: function() {
      this.hasLoaded = false;
      this.offset = 0;
      this.currentPage = 1;
      let selected = this.selected;
      this.$store.commit("updateCategory", { category: selected });

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${this.offset}`
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

      axios
        .get(
          `${this.domain}/api/recipe/search?q=${this.selected}&offset=${this
            .currentPage * 6}`
        )
        .then(response => {
          this.recipes = response.data.results;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });
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
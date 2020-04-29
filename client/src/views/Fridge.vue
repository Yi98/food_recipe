<template>
  <div class="popular_places_area pt-3">
    <b-container>
      <b-row class="mb-5">
        <b-col lg="12">
          <div class="section_title mb_70">
            <b-row>
              <b-col lg="12">
                <h4 style="display: inline-block" class="pt-3 pb-4 pr-3 m-0">
                  Add your ingredients:
                  <span id="search-title"></span>
                </h4>
                <div style="display: inline">
                  <tags-input
                    placeholder="Add ingredient..."
                    element-id="tags"
                    typeahead-style="dropdown"
                    discard-search-text
                    :limit="10"
                    :hide-input-on-limit="true"
                    :only-existing-tags="true"
                    :existing-tags="autocomplete"
                    :typeahead="true"
                    @change="onKeyIngredient"
                    @tag-added="onAddIngredient"
                    @tag-removed="onRemoveIngredient"
                  ></tags-input>
                </div>
                <!-- <div style="display: inline" id="ingredients-chip-group">
                    <div class="chip mt-2">
                      <span class="ingredient-item">cheese</span>
                      <span class="closebtn" onclick="onRemoveIngredient(this)">&times;</span>
                    </div>
                </div>-->
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>

      <b-row class="empty-container" v-if="isEmpty">
        <b-col lg="12" class="text-center">
          <img src="../assets/empty.png" class="empty-img" />
          <P>Such empty. Add some ingredients.</P>
        </b-col>
      </b-row>

      <div v-if="!hasLoaded && !isEmpty">
        <CardPlaceholder></CardPlaceholder>
        <CardPlaceholder></CardPlaceholder>
      </div>

      <div v-if="hasLoaded">
        <b-row id="fridge-result-container">
          <RecipeCard v-for="recipe in recipes" v-bind:key="recipe.id" v-bind:recipe="recipe"></RecipeCard>
        </b-row>

        <b-row>
          <b-col lg="12">
            <div class="more_place_btn text-center">
              <p>End of results</p>
              <!-- <a
                class="boxed-btn4"
                onclick="getRecipeByIngredients()"
                style="color: #fff"
              >More Recipes</a> -->
            </div>
          </b-col>
        </b-row>
      </div>

    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import VoerroTagsInput from "@voerro/vue-tagsinput";

import CardPlaceholder from "../components/CardPlaceholder";
import RecipeCard from "../components/RecipeCard";

export default {
  name: "Fridge",
  components: {
    CardPlaceholder,
    RecipeCard,
    "tags-input": VoerroTagsInput
  },
  data: function() {
    return {
      offset: 0,
      hasLoaded: false,
      recipes: [],
      existingIngredients: [],
      autocomplete: []
    };
  },
  methods: {
    onKeyIngredient: function(value) {
      if (value.length % 3 != 0) {
        return;
      }

      axios
        .get(`${this.domain}/api/ingredient/autocomplete?query=${value}`)
        .then(response => {
          this.autocomplete = response.data.map(data => {
            return { key: data.name, value: data.name };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onUpdateIngredient: function(action, item) {
      if (action == "add") {
        this.existingIngredients.push(item);
      } else if (action == "remove") {
        this.existingIngredients = this.existingIngredients.filter(
          ingredient => ingredient != item
        );
        if (this.existingIngredients.length == 0) {
          this.hasLoaded = false;
          return;
        }
      }

      const query = this.existingIngredients.join();

      // This will use too much point when removing ingredient
      axios
        .get(
          `${this.domain}/api/recipe/fridge?offset=${this.offset}&ingredients=${query}`
        )
        .then(response => {
          this.recipes = response.data;
          this.hasLoaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onAddIngredient: function(slug) {
      return this.onUpdateIngredient("add", slug.value);
    },
    onRemoveIngredient: function(slug) {
      return this.onUpdateIngredient("remove", slug.value);
    }
  },
  computed: {
    isEmpty: function() {
      return this.existingIngredients.length > 0 ? false : true;
    }
  }
};
</script>

<style>
.empty-container {
  padding: 12vh 0;
}

.empty-img {
  width: 30%;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags-input input {
  flex: 1;
  background: transparent;
  border: none;
}

.tags-input input:focus {
  outline: none;
}

.tags-input input[type="text"] {
  padding-left: 5px;
  color: #495057;
}

.tags-input-wrapper-default {
  padding: 0.5em 0.25em;
  background: #fff;
  border-color: #dbdbdb;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.tags-input-wrapper-default.active {
  outline: 0 none;
}

/* The tag badges & the remove icon */
.tags-input span {
  margin-right: 0.3em;
}

.tags-input-remove {
  cursor: pointer;
  position: absolute;
  display: inline-block;
  right: 0.6em;
  top: 1.1em;
  padding: 0.5em;
  overflow: hidden;
}

.tags-input-remove:focus {
  outline: none;
}

.tags-input-remove:before,
.tags-input-remove:after {
  content: "";
  position: absolute;
  width: 75%;
  left: 0.15em;
  background: #888;
  height: 2px;
  margin-top: -1px;
}

.tags-input-remove:before {
  transform: rotate(45deg);
}
.tags-input-remove:after {
  transform: rotate(-45deg);
}

/* Tag badge styles */
.tags-input-badge {
  position: relative;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-weight: 700;
  font-size: 13px;
  line-height: 40px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tags-input-badge-pill {
  height: 40px;
  margin: 0.5em 0.2em;
  padding: 0 20px;
  padding-right: 25px;
  border-radius: 10em;
}

.tags-input-badge-selected-default {
  color: #212529;
  background-color: #f0f1f2;
}

/* Typeahead */
.typeahead-hide-btn {
  color: #999 !important;
  font-style: italic;
}

/* Typeahead - badges */
.typeahead-badges > span {
  cursor: pointer;
  margin-right: 0.3em;
}

/* Typeahead - dropdown */
.typeahead-dropdown {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  z-index: 1000;
}

.typeahead-dropdown li {
  padding: 0.25em 1em;
  cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
  color: rgb(32, 32, 32);
  background-color: #ffffff;
}

.tags-input-typeahead-item-highlighted-default {
  color: #fff;
  background-color: #007bff;
}
</style>



<style scoped>
.input-group-sm > .form-control:not(textarea),
.input-group-sm > .custom-select {
  height: 50px;
}

.input-group > .form-control {
  font-size: 50px;
}

.chip {
  display: inline-block;
  margin-right: 5px;
  padding: 0 20px;
  height: 40px;
  font-size: 13px;
  line-height: 40px;
  border-radius: 25px;
  background-color: #e7e7e7;
}

.closebtn {
  padding-left: 10px;
  color: #888;
  font-weight: bold;
  float: right;
  font-size: 20px;
  cursor: pointer;
}

.closebtn:hover {
  color: #000;
}

.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}

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

.where_togo_area .form_area h3 {
  font-size: 24px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 0;
}

.popular_places_area {
  padding-top: 60px;
  padding-bottom: 100px;
  /* background: #f9fcff; */
  background-color: #fff;
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
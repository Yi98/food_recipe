<template>
  <b-col lg="4" md="6">
    <router-link :to="'/details?recipeId=' + recipe.id">
      <div class="single_place" style="cursor: pointer;">
        <div hidden class="recipe-id">{{ recipe.id }}</div>
        <div class="thumb">
          <img
            :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-636x393.jpg'"
            :alt="recipe.title"
          />
        </div>
        <div class="place_info">
          <h3 :title="recipe.title">{{ modifiedTitle }}</h3>
          <p :title="recipe.dishTypes">{{ recipe.dishTypes }}</p>
          <div class="d-flex">
            <div class="days">
              <p class="pr-4">
                <b-icon-people-fill class="right-icon"></b-icon-people-fill>
                {{ recipe.servings }} Servings
              </p>
            </div>
            <div class="days">
              <p>
                <b-icon-clock class="right-icon"></b-icon-clock>
                {{ recipe.readyInMinutes }} Minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </b-col>
</template>

<script>
export default {
  name: "RecipeCard",
  props: ["recipe"],
  computed: {
    modifiedTitle: function() {
      if (this.recipe.title.length > 28) {
        return this.recipe.title.substring(0, 28) + "...";
      }
      return this.recipe.title;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.popular_places_area .single_place .thumb img {
  width: 100%;
}

.popular_places_area .single_place {
  /* background: #fff; */
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  margin-bottom: 30px;
}

.popular_places_area .single_place .place_info h3 {
  font-size: 22px;
  font-weight: 400;
  color: #040e27;
  margin-bottom: 0;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
/* 
.popular_places_area .single_place:hover {
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
} */

/* line 79, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_popular_place.scss */
.popular_places_area .single_place:hover .place_info h3 {
  color: #ff4a52;
}

.popular_places_area .single_place .place_info {
  padding: 10px 0px 25px 3px;
}
</style>
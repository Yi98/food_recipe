<template>
  <div>
    <div class="popular_places_area pt-5">
      <b-container>
        <b-row class="pb-5">
          <b-col lg="12">
            <div class="section_title mb_70">
              <h3>
                Featured
                <span id="search-title"></span>
              </h3>
              <p>Top pick for today.</p>
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
import CardPlaceholder from "../components/CardPlaceholder";

export default {
  name: "Featured",
  components: {
    CardPlaceholder
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
</style>
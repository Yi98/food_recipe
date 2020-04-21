<template>
  <div class="destination_details_info pt-3 pb-0">
    <b-container>
      <b-row class="justify-content-center">
        <b-col lg="8" md="9">
          <img
            id="recipeImage"
            src="https://spoonacular.com/recipeImages/723984-636x393.jpg"
            class="w-100 pb-4"
          />
          <h2 id="recipeName">Cabbage Salad with Peanuts</h2>
          <p id="recipeDishTypes" class="pt-2">Salad</p>
          <b-row>
            <b-col lg="3" cols="5" class="pt-3">
              <p>
                <span class="details-icon pr-2"><b-icon-people-fill></b-icon-people-fill></span>
                <span id="recipeServing"></span> servings
              </p>
            </b-col>
            <b-col lg="9" cols="7" class="pt-3">
              <p>
                <span class="details-icon pr-2"><b-icon-clock></b-icon-clock></span>
                <span id="recipeTime"></span> minutes
              </p>
            </b-col>
          </b-row>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Equipments</h3>
            <div class="single_destination">
              <ul id="equipment-container" class="unordered-list">
              </ul>
            </div>
          </div>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Ingredients</h3>
            <div class="single_destination">
              <ul id="ingredient-container" class="unordered-list"></ul>
            </div>
          </div>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Procedure</h3>
            <div id="instruction-container"></div>
          </div>

          <div class="bordered_1px"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Details"
};
</script>

<style scoped>
.bordered_1px {
  border-top: 1px solid #e4e6e8;
  margin-top: 65px;
  padding-bottom: 65px;
}

#recipeImage {
  vertical-align: middle;
  border-style: none;
}

.destination_details_info .destination_info h3 {
  font-size: 24px;
  font-weight: 500;
  color: #001d38;
  margin-bottom: 25px;
}

/* line 142, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_destination.scss */
.destination_details_info .destination_info p {
  margin-bottom: 20px;
}

/* line 145, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_destination.scss */
.destination_details_info .destination_info .single_destination {
  margin-bottom: 22px;
}

/* line 147, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_destination.scss */
.destination_details_info .destination_info .single_destination h4 {
  font-size: 16px;
  font-weight: 500;
}

ul {
  margin: 0px;
  padding: 0px;
}

.unordered-list li {
  position: relative;
  padding-left: 30px;
  line-height: 1.82em !important;
}

.details-icon {
  color: rgb(77, 77, 77);
}

</style>
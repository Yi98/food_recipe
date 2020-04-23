<template>
  <div class="destination_details_info pt-3 pb-0">
    <b-container>
      <b-row class="justify-content-center">
        <b-col lg="8" md="9">
          <img
            id="recipeImage"
            :src="'https://spoonacular.com/recipeImages/' + recipe.id + '-636x393.jpg'"
            class="w-100 pb-4"
          />
          <h2 id="recipeName">{{ recipe.title }}</h2>
          <p id="recipeDishTypes" class="pt-2">{{ dishTypes }}</p>
          <b-row>
            <b-col lg="3" cols="5" class="pt-3">
              <p>
                <span class="details-icon pr-2">
                  <b-icon-people-fill></b-icon-people-fill>
                </span>
                <span id="recipeServing">{{ recipe.servings }}</span> servings
              </p>
            </b-col>
            <b-col lg="9" cols="7" class="pt-3">
              <p>
                <span class="details-icon pr-2">
                  <b-icon-clock></b-icon-clock>
                </span>
                <span id="recipeTime">{{ recipe.readyInMinutes }}</span> minutes
              </p>
            </b-col>
          </b-row>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Equipments</h3>
            <div class="single_destination">
              <ul id="equipment-container" class="unordered-list">
                <li v-for="equipment in formattedEquipments()" v-bind:key="equipment">
                  <span>{{ equipment }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Ingredients</h3>
            <div class="single_destination">
              <ul id="ingredient-container" class="unordered-list">
                <li v-for="ingredient in ingredients" v-bind:key="ingredient">
                  <span>{{ ingredient }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="bordered_1px"></div>

          <div class="destination_info">
            <h3>Procedure</h3>
            <div id="instruction-container">
              <div
                class="single_destination"
                v-for="instruction in instructions"
                v-bind:key="instruction.number"
              >
                <h4>Step {{instruction.number}}</h4>
                <p>{{instruction.step}}</p>
              </div>
            </div>
          </div>

          <div class="bordered_1px"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",
  data: function() {
    return {
      recipe: null,
      equipments: [],
      ingredients: [],
      instructions: []
    };
  },
  created: function() {
    axios
      .get(
        `${this.domain}/api/recipe/information?recipeId=${this.$route.query.recipeId}`
      )
      .then(response => {
        this.recipe = response.data;
        console.log(response);

        this.formatIngredients();
        this.formatEquipmentAndInstruction();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    formatIngredients: function() {
      let currentIngredient = [];
      const ingredientNames = [];
      let ingredientName;
      let ingredient;

      // Scraping equipments
      for (let i = 0; i < this.recipe.extendedIngredients.length; i++) {
        currentIngredient = this.recipe.extendedIngredients[i];

        if (!ingredientNames.includes(currentIngredient.name)) {
          ingredientNames.push(currentIngredient.name);
          ingredientName =
            currentIngredient.name.charAt(0).toUpperCase() +
            currentIngredient.name.slice(1);

          if (currentIngredient.measures.us.unitShort == "") {
            ingredient = `${ingredientName} (${currentIngredient.measures.us.amount})`;
          } else {
            ingredient = `${ingredientName} (${currentIngredient.measures.us.amount} ${currentIngredient.measures.us.unitShort})`;
          }
        }

        if (!this.ingredients.includes(ingredient)) {
          this.ingredients.push(ingredient);
        }
      }
    },
    formatEquipmentAndInstruction: function() {
      // Scraping instructions and equipments
      let currentInstruction;

      for (
        let i = 0;
        i < this.recipe.analyzedInstructions[0].steps.length;
        i++
      ) {
        currentInstruction = this.recipe.analyzedInstructions[0].steps[i];

        this.instructions.push({
          number: i + 1,
          step: this.recipe.analyzedInstructions[0].steps[i].step
        });

        for (let k = 0; k < currentInstruction.equipment.length; k++) {
          if (!this.equipments.includes(currentInstruction.equipment[k].name)) {
            this.equipments.push(currentInstruction.equipment[k].name);
          }
        }
      }
    }
  },
  computed: {
    dishTypes: function() {
      const dishTypes = this.recipe.dishTypes.map(
        dishType => dishType.charAt(0).toUpperCase() + dishType.slice(1)
      );
      return dishTypes.join(", ");
    },
    formattedEquipments: function() {
      const equipments = this.equipments.map(
        dishType => dishType.charAt(0).toUpperCase() + dishType.slice(1)
      );
      return equipments;
    }
  }
};
</script>

<style scoped>
li {
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: none;
}

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

.unordered-list li:before {
  content: "";
  position: absolute;
  border: 2px solid #000;
  background: #fff;
  top: 13px;
  left: 0;
  border-radius: 50%;
}

.details-icon {
  color: rgb(77, 77, 77);
}
</style>
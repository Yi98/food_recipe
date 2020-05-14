<template>
  <div>
    <b-container class="hero-banner">
      <b-row class="hero-row">
        <b-col lg="6" md="12" class="text-center pb-3">
          <img src="../assets/hero-banner.svg" alt="Hero banner" id="hero-image" />
        </b-col>
        <b-col lg="1" md="0"></b-col>
        <b-col lg="5" md="12" class="hero-text-container">
          <b-row class="hero-question-container">
            <b-col lg="12">
              <h1 id="hero-question"></h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <div id="hero-btn-container" class="m-auto">
                <b-button
                  id="search-btn"
                  class="boxed-btn4 w-100"
                  style="height: 55px;"
                  @click="onChangeModalAction('Sign Up')"
                  v-b-modal.acc-modal
                >Explore Now</b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <div class="features-container">
      <b-container>
        <b-row class="py-5">
          <b-col lg="12" class="text-center">
            <h1 class="feature-string">Available Features</h1>
          </b-col>
        </b-row>
        <b-row class="reverse feature-row">
          <b-col lg="1"></b-col>
          <b-col lg="7" md="8" class="feature-left">
            <h2 class="feature-title">Explore more than 350,000 recipes</h2>
            <p class="feature-description">Enormous amount of recipes to explore.</p>
          </b-col>
          <b-col lg="3" md="4" class="text-center">
            <img class="feature-img" src="../assets/search.svg" alt="Hero banner" />
          </b-col>
          <b-col lg="1"></b-col>
        </b-row>
        <b-row class="feature-row">
          <b-col lg="1"></b-col>
          <b-col lg="3" md="4" id="mid-feature-img" class="text-center">
            <img class="feature-img" src="../assets/fridge.svg" alt="Hero banner" />
          </b-col>
          <b-col lg="7" md="8" class="feature-right">
            <h2 class="feature-title">Find recipes based on available ingredients</h2>
            <p
              class="feature-description"
            >No more 'missing ingredients' disappointment when cooking.</p>
          </b-col>
          <b-col lg="1"></b-col>
        </b-row>
        <b-row class="reverse feature-row">
          <b-col lg="1"></b-col>
          <b-col lg="7" md="8" class="feature-left">
            <h2 class="feature-title">Details-oriented recipe</h2>
            <p
              class="feature-description"
            >Equipments? Checked! Ingredients? Checked! Instructions? Checked!</p>
          </b-col>
          <b-col lg="3" md="4" class="text-center">
            <img class="feature-img" src="../assets/organized.svg" alt="Hero banner" />
          </b-col>
          <b-col lg="1"></b-col>
        </b-row>
      </b-container>
    </div>
    <Footer />
  </div>
</template>

<script>
import TypeIt from "typeit";

import Footer from "../components/Footer.vue";

export default {
  components: {
    Footer
  },
  mounted: function() {
    new TypeIt("#hero-question", {
      speed: 90,
      loop: true
    })
      .type("Tired of thinking what to cook?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .type("Want to get rid of existing ingredients?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .type("Enough of messy recipe's instructions?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .go();
  },
  methods: {
    onAccountLink: function(action) {
      this.action = action;
    },
    onChangeModalAction: function(action) {
      this.$store.commit("changeModalAction", { action });
    }
  }
};
</script>

<style>
#mid-feature-img {
  padding-top: 5%;
}

.navbar-toggler {
  outline: none !important;
}
</style>

<style scoped>
.feature-string {
  font-weight: 300;
}

.feature-left {
  padding-right: 10%;
}

.feature-right {
  padding-left: 10%;
}

.feature-img {
  width: 100%;
}

.feature-title {
  font-size: 1.6rem;
  text-align: left;
  padding-top: 75px;
  padding-bottom: 10px;
  color: #ff4a52;
}

.feature-description {
  text-align: left;
  font-size: 1.1rem;
}

.feature-row {
  margin-bottom: 50px;
}

.hero-banner {
  height: 85vh;
}

.hero-row {
  margin-top: 8%;
}

#hero-image {
  width: 100%;
}

#hero-question {
  font-weight: 300;
  font-size: 3.4rem;
}

#search-btn {
  border-radius: 40px;
  background-color: #ff3842;
  margin-top: 20%;
  box-shadow: none;
}

.hero-text-container {
  padding-top: 13%;
  height: 20%;
  text-align: center;
}

.btn-container {
  width: 50%;
}

#hero-btn-container {
  width: 50%;
}

.hero-question-container {
  height: 300px;
}

.features-container {
  background-color: #fcfcfc;
  padding-bottom: 2%;
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  #search-btn {
    margin-top: 0%;
  }
}

/* md-size */
@media (min-width: 768px) and (max-width: 991.98px) {
  #hero-question {
    font-size: 2.5rem;
  }

  #hero-image {
    width: 45%;
  }

  #search-btn {
    margin-top: 0%;
  }

  .hero-text-container {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
    height: 0%;
    text-align: center;
  }

  .hero-question-container {
    padding-left: 5%;
    padding-right: 5%;
    height: 150px;
  }

  .feature-title {
    padding-top: 0;
  }

  #mid-feature-img {
    padding-top: 0;
  }
}

@media (max-width: 767px) {
  #hero-btn-container {
    width: 75%;
  }

  #hero-question {
    font-size: 1.9rem;
  }

  #hero-image {
    width: 65%;
  }

  .hero-question-container {
    padding-left: 5%;
    padding-right: 5%;
    height: 110px;
  }

  .reverse {
    display: flex;
    flex-direction: column-reverse;
  }

  .feature-title {
    font-size: 1.3rem;
    text-align: left;
    padding-top: 20px;
    padding-bottom: 2px;
    margin-bottom: 0;
  }

  .feature-description {
    text-align: left;
    font-size: 1.1rem;
  }

  .feature-img {
    width: 70%;
  }

  .feature-row {
    margin-bottom: 70px;
  }

  .feature-left,
  .feature-right {
    padding-left: 5%;
    padding-right: 5%;
  }

  .features-container {
    padding-bottom: 0;
  }

  #search-btn {
    margin-top: 15%;
  }

  .feature-string {
    font-size: 2rem;
  }

  #mid-feature-img {
    padding-top: 0;
  }
}
</style>
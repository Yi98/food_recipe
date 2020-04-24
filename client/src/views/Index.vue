<template>
  <div>
    <b-container class="hero-banner">
      <b-row class="hero-row">
        <b-col lg="6" class="text-center pb-3">
          <img src="../assets/hero-banner.svg" alt="Hero banner" id="hero-image" />
        </b-col>
        <b-col lg="2"></b-col>
        <b-col lg="4" class="hero-text-container">
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
                  class="boxed-btn4 w-100 mt-5"
                  style="height: 55px;"
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
            <h1>Features</h1>
          </b-col>
        </b-row>
        <b-row class="reverse feature-row">
          <b-col lg="8" class="feature-left">
            <h2 class="feature-title">Explore more than 350,000 recipes</h2>
            <p
              class="feature-description"
            >Hexameal provides thousands and thousands of recipe for you to explore</p>
          </b-col>
          <b-col lg="4" class="text-center">
            <img class="feature-img" src="../assets/search.svg" alt="Hero banner" />
          </b-col>
        </b-row>
        <b-row class="feature-row">
          <b-col lg="4" class="text-center">
            <img class="feature-img" src="../assets/fridge.svg" alt="Hero banner" />
          </b-col>
          <b-col lg="8" class="feature-right">
            <h2 class="feature-title">Find recipes based on available ingredients</h2>
            <p
              class="feature-description"
            >Every recipe has the details such as equipments used, ingredients and instructions. No more missing item during cooking.</p>
          </b-col>
        </b-row>
        <b-row class="reverse feature-row">
          <b-col lg="8" class="feature-left">
            <h2 class="feature-title">Details-oriented recipe</h2>
            <p
              class="feature-description"
            >Every recipe has the details such as equipments used, ingredients and instructions. No more missing item during cooking.</p>
          </b-col>
          <b-col lg="4">
            <img class="feature-img" src="../assets/organized.svg" alt="Hero banner" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import TypeIt from "typeit";

export default {
  components: {},
  mounted: function() {
    new TypeIt("#hero-question", {
      speed: 125,
      loop: true
    })
      .type("Tired of thinking what to cook?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .type("Wanna empty the ingredients in the fridge?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .type("Enough of messy recipe instructions?")
      .pause(1000)
      .delete(null, { speed: 65 })
      .go();
  }
};
</script>

<style scoped>
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
  text-align: justify;
  padding-top: 20px;
}

.feature-description {
  text-align: justify;
  font-size: 1.4rem;
}

.feature-row {
  margin-bottom: 50px;
}

.feature-title {
  padding-top: 75px;
  padding-bottom: 10px;
  color: #ff4a52;
}

.boxed-btn4 {
  background-color: #fa202b;
}

.hero-banner {
  height: 85vh;
}

.hero-row {
  margin-top: 5%;
}

#hero-image {
  width: 100%;
}

#hero-question {
  font-size: 3.3rem;
}

#search-btn {
  border-radius: 40px;
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
  background-color: rgb(247, 247, 247);
}

@media (max-width: 767px) {
  #hero-btn-container {
    width: 75%;
  }

  #hero-question {
    font-size: 2rem;
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
    font-size: 1.4rem;
    text-align: left;
    padding-top: 20px;
    padding-bottom: 5px;
  }

  .feature-description {
    text-align: justify;
    font-size: 1.2rem;
  }

  .feature-img {
    width: 85%;
  }

  .feature-row {
    margin-bottom: 100px;
  }

  .feature-left, .feature-right {
    padding-left: 5%;
    padding-right: 5%;
  }
}
</style>
<template>
  <div>
    <header>
      <div class="header-area">
        <b-navbar id="navigation-bar" toggleable="lg" type="light" variant="light">
          <b-navbar-brand href="#">
            <router-link to="/">
              <img height="45px" src="../assets/logo.png" alt="Hexmeal logo" />
            </router-link>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item v-if="isLoggedIn">
                <router-link class="nav-items" :to="{name: 'Fridge'}">What's in your fridge</router-link>
              </b-nav-item>
              <b-nav-item v-if="isLoggedIn">
                <router-link class="nav-items" :to="{name: 'Search'}">Search Recipes</router-link>
              </b-nav-item>
              <b-nav-item @click="onLogout()" v-if="isLoggedIn">Log out</b-nav-item>
              <b-nav-item
                @click="onChangeModalAction('Log In')"
                v-b-modal.acc-modal
                v-if="!isLoggedIn"
              >Log in</b-nav-item>
              <b-nav-item
                @click="onChangeModalAction('Sign Up')"
                id="signup-btn"
                v-b-modal.acc-modal
                v-if="!isLoggedIn"
              >Sign up</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>

    <AccountModal />
  </div>
</template>

<script>
import AccountModal from "../components/AccountModal";

export default {
  name: "Header",
  data: function() {
    return {
      action: null
    };
  },
  mounted: function() {
    if (sessionStorage.getItem("token")) {
      this.$store.commit("changeState");
    }
  },
  components: {
    AccountModal
  },
  methods: {
    onAccountLink: function(action) {
      this.$store.commit("changeModalAction");
      console.log(action);
      // this.action = action;
    },
    onLogout: function() {
      sessionStorage.clear();
      this.$store.commit("changeState");
      this.$router.push({name: 'Index'});
    },
    onChangeModalAction: function(action) {
      this.$store.commit("changeModalAction", { action });
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style>
a.nav-items {
  color: #000 !important;
  text-decoration: none !important;
}

.nav-link {
  color: #000 !important;
}

.navbar-toggler {
  border: 0;
  outline: 0;
  font-size: 1.5rem;
}

#navigation-bar {
  background-color: transparent !important;
}

a {
  transition: 0.3s !important;
}

a:hover {
  color: #ff4a52 !important;
}

@media (min-width: 992px) {
  #signup-btn a {
    color: #fff !important;
  }

  #signup-btn {
    background: #ff4a52;
    display: inline-block;
    margin-left: 30px;
    margin-right: 20px;
    padding-left: 15px;
    padding-right: 15px;
    font-family: "Rubik", sans-serif;
    border: 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 40px;
    text-align: center;
    text-transform: capitalize;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    cursor: pointer;
  }
}
</style>

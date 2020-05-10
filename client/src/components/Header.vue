<template>
  <div>
    <header>
      <div class="header-area">
        <b-navbar id="navigation-bar" toggleable="lg" type="light" variant="light">
          <b-navbar-brand href="#">
            <router-link to="/" v-on:click.native="currentTab = null">
              <img height="45px" src="../assets/logo.png" alt="Hexmeal logo" />
            </router-link>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown text="Search recipes" right v-if="isLoggedIn">
                <b-dropdown-item href="#">
                  <router-link
                    v-on:click.native="currentTab = 'SearchTab'"
                    v-bind:class="{ active: currentTab == 'SearchTab' }"
                    class="nav-items"
                    :to="{name: 'Search'}"
                  >by title</router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <router-link
                    v-on:click.native="currentTab = 'ExploreTab'"
                    v-bind:class="{ active: currentTab == 'ExploreTab' }"
                    class="nav-items"
                    :to="{name: 'Explore'}"
                  >by categories</router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <router-link
                    v-on:click.native="currentTab = 'FridgeTab'"
                    v-bind:class="{ active: currentTab == 'FridgeTab' }"
                    class="nav-items"
                    :to="{name: 'Fridge'}"
                  >by ingredients</router-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>
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
      action: null,
      currentTab: null
    };
  },
  mounted: function() {
    if (localStorage.getItem("token")) {
      this.$store.commit("changeState");
    }
  },
  components: {
    AccountModal
  },
  methods: {
    onLogout: function() {
      localStorage.clear();
      this.$store.commit("changeState");
      this.$router.push({ name: "Index" });
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
.dropdown-item:hover {
  background-color: #f0f0f0;
}


.active {
  color: #ff4a52 !important;
}

a.nav-items {
  color: #000;
  text-decoration: none;
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
  background-color: #fcfcfc !important;
}

a {
  transition: 0.3s !important;
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

@media all and (max-width: 720px) {
  .navbar-nav .dropdown-menu {
    border: 0;
    background-color: #f8f9fa;
  }

  .dropdown-item {
    padding-left: 10px;
  }
}
</style>

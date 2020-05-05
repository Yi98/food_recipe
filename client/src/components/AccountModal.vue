<template>
  <b-modal
    id="acc-modal"
    ref="acc-modal"
    size="md"
    class="signup-modal"
    :title="modalAction"
    hide-footer
  >
    <div>
      <p class="pl-1" style="color: #000" v-if="showFeedback">{{ feedback }}</p>
      <p
        class="pl-1"
        v-if="showFeedback"
        v-bind:class="{'resend-email': countdownEnd }"
        @click="startCountdown()"
      >
        Resend verification email
        <span v-if="!countdownEnd">({{ countdown }}s)</span>
      </p>

      <b-row class="pt-2">
        <b-col lg="12">
          <div class="input-group mb-2">
            <input
              id="email"
              type="text"
              class="form-control"
              v-model="email"
              placeholder="Email address"
              aria-label="Email address"
              aria-describedby="basic-addon1"
              style="height: 50px"
            />
          </div>
          <!-- <p>Password</p> -->
          <div class="input-group mb-2" style="position: relative;">
            <input
              id="password"
              :type="inputType"
              class="form-control"
              v-model="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              style="height: 50px"
            />
            <b-icon-eye class="reveal-icon" v-if="hidePassword" @click="onTogglePassword()"></b-icon-eye>
            <b-icon-eye-slash class="reveal-icon" v-else @click="onTogglePassword()"></b-icon-eye-slash>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12">
          <button
            id="account-btn"
            @click="onContinueAccount()"
            type="button"
            class="boxed-btn4 w-100 platforms-btn my-2"
            style="height: 50px; color: white;"
            data-dismiss="modal"
          >
            {{ buttonText }}
            <pulse-loader
              v-if="buttonText == 'Loading'"
              style="display: inline;"
              :color="'#fff'"
              :size="'4px'"
            ></pulse-loader>
          </button>
        </b-col>
      </b-row>
      <!-- <b-row class="my-4">
      <b-col lg="12" class="text-center">OR</b-col>-->
      <!-- </b-row> -->
      <!-- <b-row class="mt-2">
        <b-col lg="12">
          <button
            type="button"
            class="btn w-100 text-left platforms-btn"
            style="height: 50px;"
            data-dismiss="modal"
          >
            <b-row>
              <b-col lg="2" cols="2" class="text-right">
                <img src="../assets/facebook.png" alt="Facebook logo" width="20px" heigh="20px" />
              </b-col>
              <b-col lg="10" cols="10" class="text-left">Continue with Facebook</b-col>
            </b-row>
          </button>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12">
          <button type="button" class="btn w-100 platforms-btn" data-dismiss="modal">
            <b-row>
              <b-col lg="2" cols="2" class="text-right">
                <img src="../assets/google.png" alt="Google logo" width="20px" heigh="20px" />
              </b-col>
              <b-col
                lg="10"
                cols="10"
                class="text-left"
                @done="onContinueGoogle()"
              >Continue with Google</b-col>
            </b-row>
          </button>
        </b-col>
      </b-row>-->
      <b-row class="mt-4">
        <b-col lg="12">
          <p id="login-text" v-if="!showForgotPassword">
            Already have an account?
            <a
              @click="onChangeModalAction('Log In')"
              class="account-link"
            >Log in</a>
          </p>
          <p id="forgot-ps-text" v-if="showForgotPassword">
            <a href="/" class="account-link">Forgot password?</a>
          </p>
          <p id="signup-text" class="pb-3 pt-3" v-if="showForgotPassword">
            Don't have an account?
            <a
              @click="onChangeModalAction('Sign Up')"
              class="account-link"
            >Sign Up</a>
          </p>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>


<script>
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "AccountModal",
  components: {
    PulseLoader
  },
  props: ["passedAction"],
  data: function() {
    return {
      hidePassword: true,
      showFeedback: false,
      countdownEnd: false,
      feedback: "",
      inputType: "password",
      buttonText: "Continue",
      countdown: 30,
      email: null,
      password: null
    };
  },
  methods: {
    onContinueAccount: function() {
      let url;

      this.buttonText = "Loading";

      // fix here
      if (this.modalAction == "Log In") {
        url = `${this.domain}/api/auth/login`;
      } else if (this.modalAction == "Sign Up") {
        url = `${this.domain}/api/auth/signup`;
      }

      const bodyData = new FormData();
      bodyData.append("email", this.email);
      bodyData.append("password", this.password);

      axios({
        method: "POST",
        url: url,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: bodyData
      })
        .then(response => {
          this.feedback = response.data.message;
          this.showFeedback = true;
          this.buttonText = "Continue";

          this.startCountdown();

          if (response.data.success && this.modalAction == "Log In") {
            this.email = "";
            this.password = "";
            this.showFeedback = false;
            this.$refs["acc-modal"].hide();
            this.$store.commit("changeState");

            localStorage.setItem("token", response.data.token);

            if (this.$route.path != "/search") {
              this.$router.push("/search");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onTogglePassword: function() {
      this.hidePassword = !this.hidePassword;

      if (this.inputType == "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    onChangeModalAction: function(action) {
      this.$store.commit("changeModalAction", { action });
    },
    startCountdown: function() {
      const bodyData = new FormData();
      bodyData.append("email", this.email);

      axios({
        method: "POST",
        url: `${this.domain}/api/auth/resend`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: bodyData
      })
        .then(response => {
          this.feedback = response.data.message;
          this.showFeedback = true;
        })
        .catch(err => console.log(err));

      this.countdown = 30;
      this.countdownEnd = false;

      setInterval(() => {
        if (this.countdown > 1) {
          this.countdown -= 1;
        } else {
          this.countdownEnd = true;
        }
      }, 1000);
    }
  },
  computed: {
    modalAction: function() {
      return this.$store.state.modalAction;
    },
    showForgotPassword: function() {
      if (this.$store.state.modalAction == "Log In") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>


.form-control {
  box-shadow: none !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}

.form-control:focus {
  border-color: rgb(143, 143, 143) !important;
}

.resend-email {
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}

.reveal-icon {
  position: absolute;
  right: 0;
  top: 13px;
  margin-right: 20px;
  font-size: 25px;
  cursor: pointer;
  z-index: 10;
}

.platforms-btn {
  height: 50px;
  background-color: rgb(226, 226, 226);
}

#acc-modal {
  width: 100%;
  margin-top: 10% !important;
}

.modal-header {
  border-radius: 100px 100px 0 0 !important;
}

.account-link {
  text-decoration: underline !important;
  color: rgb(17, 17, 17) !important;
  cursor: pointer !important;
}

.account-link:active {
  text-decoration: underline !important;
  color: rgb(17, 17, 17) !important;
  cursor: pointer !important;
}

.modal-body {
  height: auto;
  min-height: 100%;
  border-radius: 10px;
}

.modal-title {
  margin: auto;
  margin-left: 45%;
}

@media all and (max-width: 720px) {
  .modal-content {
    border-radius: 16px 16px 0 0 !important;
    border: 0 !important;
  }

  #acc-modal {
    width: 100% !important;
    height: 100% !important;
    margin: auto !important;
    margin-top: 5vh !important;
    padding: 0 !important;
  }

  .modal-title {
    margin-left: 39%;
  }

  .modal-body {
    height: 90vh;
    /* min-height: 100%; */
    border-radius: 10px;
  }

  .modal-dialog {
    margin: 0 !important;
  }

  button:focus {
    outline: none !important;
  }

  #signup-text {
    padding-bottom: 20% !important;
  }
}
</style>
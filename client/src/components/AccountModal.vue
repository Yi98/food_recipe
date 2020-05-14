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
        v-if="showResendEmail"
        v-bind:class="{'resend-email': countdownEnd, 'disable-resend-email': !countdownEnd }"
        @click="startCountdown(); resendEmail();"
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
      <b-row class="my-4">
        <b-col lg="12" class="text-center">OR</b-col>
      </b-row>
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
      </b-row>-->
      <b-row class="mt-2">
        <b-col lg="12">
          <button type="button" class="btn w-100" data-dismiss="modal">
            <b-row style="position: relative">
              <GoogleLogin
                class="platforms-btn w-100"
                :params="params"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
              >Continue with Google</GoogleLogin>

              <img
                src="../assets/google.png"
                alt="Google logo"
                class="platforms-img"
                width="20px"
                heigh="20px"
              />
            </b-row>
          </button>
        </b-col>
      </b-row>
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
import GoogleLogin from "vue-google-login";

export default {
  name: "AccountModal",
  components: {
    PulseLoader,
    GoogleLogin
  },
  props: ["passedAction"],
  data: function() {
    return {
      email: null,
      password: null,
      hidePassword: true,
      showFeedback: false,
      countdownEnd: false,
      showResendEmail: false,
      googleLogin: false,
      feedback: "",
      inputType: "password",
      buttonText: "Continue",
      countdown: 30,
      params: {
        // local
        // client_id: "566123955602-sj1h6l56i3eeo1e5r71lfqvkvtadues4.apps.googleusercontent.com"

        // hexameal
        client_id: "566123955602-k5ukg7a98frvgutujbb1l2m6olksjf43.apps.googleusercontent.com"
      }
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
          this.showResendEmail = response.data.resendEmail;

          if (this.showResendEmail) {
            this.startCountdown();
          }

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
      this.countdown = 30;
      this.countdownEnd = false;

      const timer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown -= 1;
        } else {
          this.countdownEnd = true;
          clearInterval(timer);
        }
      }, 1000);
    },
    resendEmail: function() {
      const bodyData = new FormData();
      bodyData.append("email", this.email);

      this.startCountdown();

      axios({
        method: "POST",
        url: `${this.domain}/api/auth/resend`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: bodyData
      })
        .then(response => {
          this.feedback = response.data.message;
          this.showFeedback = true;
          this.showResendEmail = response.data.resendEmail;
        })
        .catch(err => console.log(err));
    },
    onSuccess(googleUser) {
      // console.log(googleUser);

      const email = googleUser.getBasicProfile().yu;

      const bodyData = new FormData();
      bodyData.append("email", email);

      axios({
        method: "POST",
        url: `${this.domain}/api/auth/google`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: bodyData
      })
        .then(response => {
          if (response.data.success) {
            this.googleLogin = true;
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
    onFailure(err) {
      console.log(err);
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
.platforms-img {
  position: absolute;
  top: 14px;
  left: 100px;
}

.modal-content {
  border-radius: 6px !important;
  border: 0 !important;
}

.form-control {
  box-shadow: none !important;
  /* border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 0 !important; */
}

.form-control:focus {
  border-color: rgb(143, 143, 143) !important;
}

.resend-email {
  color: rgb(9, 124, 231);
  text-decoration: underline;
  cursor: pointer;
  pointer-events: auto;
}

.disable-resend-email {
  pointer-events: none;
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
  background-color: rgb(243, 243, 243);
  border-radius: 0.25rem;
  border: 0;
}

#acc-modal {
  width: 100%;
  margin-top: 7% !important;
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
  margin-left: 42%;
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

  .platforms-img {
    position: absolute;
    top: 14px;
    left: 30px;
  }
}
</style>
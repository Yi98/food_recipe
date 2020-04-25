<template>
  <b-modal
    id="acc-modal"
    ref="acc-modal"
    size="md"
    class="signup-modal"
    style="overflow-y: hidden;"
    :title="passedAction"
    hide-footer
  >
    <div>
      <p class="pl-1" style="color: #000" v-if="showFeedback">{{ feedback }}</p>

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
            class="boxed-btn4 w-100 platforms-btn"
            style="height: 50px; color: white;"
            data-dismiss="modal"
          >Continue</button>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col lg="12" class="text-center">OR</b-col>
      </b-row>
      <b-row class="mt-2">
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
                <img src="../assets//google.png" alt="Google logo" width="20px" heigh="20px" />
              </b-col>
              <div class="col-lg-10 col-10 text-left">Continue with Google</div>
            </b-row>
          </button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col lg="12">
          <p id="login-text">
            Already have an account?
            <a @click="passedAction='Log In'" class="account-link">Log in</a>
          </p>
          <p id="forgot-ps-text" class="pb-3">
            <a href="/" class="account-link">Forgot password?</a>
          </p>
          <p id="signup-text" class="pb-3">
            Don't have an account?
            <a @click="passedAction='Sign Up'" class="account-link">Sign Up</a>
          </p>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>


<script>
import axios from "axios";

export default {
  name: "AccountModal",
  props: ["passedAction"],
  mounted: function() {
    this.action = this.passedAction;
  },
  data: function() {
    return {
      // action: this.passedAction,
      action: "Sign up",
      hidePassword: true,
      showFeedback: false,
      feedback: "",
      inputType: "password",
      email: null,
      password: null
    };
  },
  methods: {
    onContinueAccount: function() {
      let url;

      // fix here
      if (this.passedAction == "Log In") {
        url = `${this.domain}/api/auth/login`;
      } else if (this.passedAction == "Sign Up") {
        url = `${this.domain}/api/auth/signup`;
      }

      var bodyData = new FormData();
      bodyData.append("email", this.email);
      bodyData.append("password", this.password);

      axios({
        method: "POST",
        url: url,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: bodyData
      })
        .then(response => {
          console.log(response);
          this.feedback = response.data.message;
          this.showFeedback = true;

          if (response.data.success && this.passedAction == "Log In") {
            this.email = "";
            this.password = "";
            this.showFeedback = false;
            this.$refs["acc-modal"].hide();
            this.$store.commit('changeState');

            sessionStorage.setItem("token", response.data.token);

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
    }
  }
};
</script>

<style>
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
  margin-top: 5% !important;
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
  overflow-y: auto;
}

.modal-title {
  margin: auto;
  margin-left: 42%;
}

@media all and (max-width: 720px) {
  #acc-modal {
    width: 100% !important;
    height: 100% !important;
    margin: auto !important;
    margin-top: 12% !important;
    padding: 0 !important;
  }

  .modal-title {
    margin-left: 38%;
  }

  .modal-body {
    height: 100%;
    min-height: 100%;
    border-radius: 10px;
    overflow-y: auto;
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
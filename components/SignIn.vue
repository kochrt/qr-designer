<template>
  <div class="flex flex-col items-center justify-center my-8">
    <span class="py-8">{{ displayMessage }}</span>
    <div class="flex flex-row justify-center py-8">
      <a class="py-2 px-3 qrNewLink rounded-full" href="/">
        <h6 class="m-0">
          <span style="color: rgb(199 21 133 / 70%)">sw</span
          ><span style="color: rgb(153 50 204 / 70%)">.ink</span>
        </h6>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    redirectUrl: String,
  },
  data() {
    return {
      displayMessage: "Signing you in...",
      error: false,
    };
  },
  async mounted() {
    if (!process.browser) {
      return;
    }
    if (!this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
      this.goHome();
    }
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
      return;
    }
    if (this.$fire.auth.currentUser) {
      const credential =
        this.$fireModule.auth.EmailAuthProvider.credentialWithLink(
          email,
          window.location.href
        );
      try {
        const userCred = await this.$fire.auth.currentUser.linkWithCredential(
          credential
        );
      } catch (err) {
        alert(err);
        this.error = true;
      }
    } else {
      try {
        const user = await this.$fire.auth.signInWithEmailLink(
          email,
          window.location.href
        );
      } catch (err) {
        alert(err);
        this.error = true;
      }
    }

    localStorage.removeItem("emailForSignIn");
    // window.location.href = window.location.origin;
    this.displayMessage = this.error
      ? "There was an error trying to sign you in. You may need to try again."
      : "You're signed in! You can close this tab.";
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>

.qrNewLink {
  box-shadow: 0px 3px 20px 1px #8584a72e;
  border-radius: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #d3d3d3;
}
</style>
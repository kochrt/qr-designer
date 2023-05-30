<template>
  <form @submit.prevent="submit" class="flex">
    <div class="ml-auto flex items-center group">
      <input
        v-if="emailStatus !== 'sent'"
        v-model="emailAddress"
        ref="emailInput"
        type="email"
        placeholder="Email address"
        class="
          px-2
          text-black
          mr-2
          w-full
          py-0
          appearance-none
          border-none
          bg-transparent
          group-hover:bg-white
          focus:bg-white
          transition
        "
      />
      <button
        :disabled="
          !emailAddress || emailStatus === 'sending' || emailStatus === 'sent'
        "
        :class="emailStatus === 'sent' ? 'h-6' : 'h-full'"
        class="
          flex flex-row
          items-center
          whitespace-nowrap
          disabled:text-gray-400 disabled:bg-indigo-900 disabled:cursor-default
          bg-indigo-800
          px-2
          items-center
          hover:bg-indigo-700
          transition-all
          duration-100
          text-gray-200
          hover:text-gray-50
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      emailAddress: null as string | null,
      emailStatus: "not sent",
    };
  },
  computed: {
    buttonText() {
      if (this.emailStatus === "not sent") {
        return "Send link";
      }
      if (this.emailStatus === "sending") {
        return "Sending...";
      }
      if (this.emailStatus === "sent") {
        return "Sent. Check your inbox.";
      }
    },
  },
  mounted() {
    (this.$refs.emailInput as HTMLInputElement).focus();
  },
  methods: {
    async submit() {
      if (this.emailStatus === "sending" || !this.emailAddress) {
        return;
      }
      this.emailStatus = "sending";
      const enteredEmail = this.emailAddress;
      const actionCodeSettings = {
        url: window.location.origin + "/signin",
        handleCodeInApp: true,
      };
      try {
        await this.$fire.auth.sendSignInLinkToEmail(
          enteredEmail,
          actionCodeSettings
        );
        this.emailStatus = "sent";
        localStorage.setItem("emailForSignIn", enteredEmail);
      } catch (err) {
        alert("Error sending signin email: " + err);
      }
    },
  },
});
</script>

<style>
</style>
<template>
  <button
    class="
      transition
      py-1
      px-2
      flex flex-row
      items-center
      text-purple-800
      bg-purple-50
      border border-purple-800
      hover:bg-purple-800 hover:text-white
      disabled:bg-purple-50 disabled:text-purple-400
    "
    :disabled="loading || !!tempButtonText"
    @click="share"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mr-1 md:hidden"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="loading"
      class="animate-spin md:mr-1 h-3 w-3 mb-px"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <svg
      v-else
      class="w-4 h-4 md:mr-1"
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
      ></path>
    </svg>
    <span class="hidden md:block">{{ buttonText }}</span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["stage"],
  data() {
    return {
      loading: false,
      copiedImageLink: "",
      tempButtonText: "",
    };
  },
  computed: {
    buttonText(): string {
      if (this.tempButtonText) {
        return this.tempButtonText;
      }
      return this.loading ? "Getting link..." : "Copy image link";
    },
  },
  methods: {
    stageImageAsBlob(): Blob {
      const imageUrl = this.stage.toDataURL({ pixelRatio: 3 });
      const splitDataURI = imageUrl.split(",");
      const byteString =
        splitDataURI[0].indexOf("base64") >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },
    async share() {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.stageImageAsBlob());

      const link = `HTTPS://GITHUB.COM/KOCHRT`;
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        this.copiedImageLink = link;
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = link;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy"); // Security exception may be thrown by some browsers.
          this.copiedImageLink = link;
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }
      }
      this.tempButtonText = "Copied to clipboard";
      setTimeout(() => {
        this.tempButtonText = "";
      }, 10000);
      this.loading = false;
    },
  },
});
</script>

<style>
</style>
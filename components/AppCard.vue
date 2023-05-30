<script lang="ts">
import { debounce } from "throttle-debounce";
import ExplanatoryCheckbox from "./ExplanatoryCheckbox.vue";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  props: ["app", "state", "id"],
  components: { ExplanatoryCheckbox },
  data() {
    return {
      appAuthorName: "",
      gettingLink: false,
      appDescription: "",
      showOptions: false,
      loadImmediately: false,
      adding: false,
      removing: false,
      debouncedUpdateAppDescription: () => {},
      debouncedUpdateLoadImmediately: () => {},
    };
  },
  mounted() {
    const vm = this;
    vm.$fire.firestore
      .doc(`users/${vm.app.author}/apps/author`)
      .get()
      .then(function (results) {
        vm.appAuthorName = results.exists ? results.data()!.name : "";
      });
  },
  watch: {
    state(val, oldVal) {
      const vm = this;
      vm.adding = false;
      vm.removing = false;
      if (val === "added") {
        vm.$fire.firestore
          .doc(`tags/${vm.swinkId}/apps/${vm.id}`)
          .get()
          .then((snap) => {
            if (!snap.exists) {
              return;
            }
            const data = snap.data()!;
            vm.appDescription = data.description || "";
            vm.loadImmediately = !!data.loadImmediately;
          });
      }
    },
    appDescription(val, oldVal) {
      if (val != undefined) {
        this.debouncedUpdateAppDescription();
      }
    },
    loadImmediately(val, oldVal) {
      if (val != undefined) {
        this.debouncedUpdateLoadImmediately();
      }
    },
  },
  computed: {
    ...mapState({
      swinkId: (state: any) => state.swink.swink.metadata.id,
      isData: (state: any) => !state.swink.swink.tag.redirect,
    }),
    appAuthorNameHtml(): string {
      if (this.appAuthorName === "swink") {
        return `<span style="color: mediumvioletred">sw</span><span style="color: darkorchid">ink</span>`;
      } else {
        return this.appAuthorName;
      }
    },
    addButtonText(): string {
      if (this.adding) {
        return "Adding...";
      }
      return "Add to Swink";
    },
    removeButtonText(): string {
      if (this.removing) {
        return "Removing...";
      }
      return "Remove";
    },
    buttonText(): string {
      const vm = this;
      if (this.adding) {
        return "Adding...";
      }
      if (this.removing) {
        return "Removing...";
      }
      if (vm.state === "added") {
        return "Remove";
      } else if (vm.state === "unadded") {
        return "Add to Swink";
      }
      return "Add to Swink";
    },
    link(): string {
      return this.app.setupLink.replace("${swinkId}", this.swinkId);
    },
  },
  created() {
    const vm = this;
    vm.debouncedUpdateAppDescription = debounce(1000, () => {
      vm.$fire.firestore.doc(`tags/${vm.swinkId}/swinkApps/${vm.id}`).update({
        description: vm.appDescription,
      });
    });
  },
  methods: {
    add() {
      const vm = this;
      vm.adding = true;
      this.$emit("add-remove", this.id);
    },
    remove() {
      const vm = this;
      vm.removing = true;
      this.$emit("add-remove", this.id);
    },
    async setup() {
      const vm = this;
      vm.gettingLink = true;
      const generateAppLink = vm.$fire.functions.httpsCallable(
        "generateAppSetupLink"
      );
      const { data } = await generateAppLink({
        qrId: vm.swinkId,
        appId: vm.id,
      });
      vm.gettingLink = false;
      const link = document.createElement("a");
      link.href = data;
      link.target = "_blank";
      link.click();
    },
  },
});
</script>

<template>
  <div
    class="transition transition-all p-4 mb-2 rounded border hover:bg-gray-100"
    :class="
      state === 'added'
        ? 'bg-blue-50 bg-opacity-50 border-blue-100'
        : 'border-transparent appCard'
    "
  >
    <div class="flex items-baseline">
      <div style="overflow: hidden">
        <h6 class="appTitle font-medium">{{ app.name }}</h6>
      </div>
      <div class="flex ml-auto items-center">
        <button
          v-if="state === 'unadded'"
          v-on:click="add"
          class="
            flex flex-row
            rounded
            p-1
            text-blue-800
            transition transition-all
            hover:bg-blue-100
            text-xs
            disabled:text-gray-500
            items-center
            disabled:bg-gray-100
          "
          :disabled="adding || removing || !isData"
        >
          <svg
            v-if="adding || removing"
            class="animate-spin h-3 w-3 ml-1 mr-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="hidden md:block">{{ addButtonText }}</span>
        </button>
        <button
          v-else
          class="
            rounded
            p-1
            text-red-800
            transition transition-all
            hover:text-red-600
            text-xs
            disabled:text-gray-500 disabled:bg-gray-100
            flex flex-row
            items-center
            mr-1
          "
          v-on:click="remove"
          :disabled="adding || removing || !isData"
        >
          <svg
            v-if="adding || removing"
            class="animate-spin h-3 w-3 ml-1 mr-2"
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
              d="M18 12H6"
            />
          </svg>
          <span class="hidden md:block">{{ removeButtonText }}</span>
        </button>
        <button
          v-if="
            state === 'added' &&
            app.setupLink &&
            app.setupLink.indexOf('${token}') !== -1
          "
          v-on:click="setup"
          class="flex items-center ml-2"
          :disabled="gettingLink"
        >
          {{ gettingLink ? "Getting link..." : "Setup / Manage" }}
          <i class="fas fa-external-link-alt ml-1" style="font-size: 85%"></i>
        </button>
        <!-- <a
          :href="link"
          target="_blank"
          v-if="
            state === 'added' &&
            app.setupLink &&
            app.setupLink.indexOf('${token}') === -1
          "
          class="
            -my-px
            text-gray-600
            p-1
            rounded
            hover:text-gray-900
            disabled:text-gray-400
            transition transition-all
            text-xs
            ml-1
            flex flex-row
            items-center
          "
          :disabled="!isData"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="hidden md:block">Admin</span>
        </a> -->
      </div>
    </div>
    <small v-if="appAuthorName"
      >By: <span v-html="appAuthorNameHtml"></span
    ></small>
    <p class="mb-0 text-sm">{{ app.description }}</p>
    <!-- <div class="pt-2">
      <button
        class="
          p-1
          hover:bg-gray-200
          transition
          rounded
          disabled:text-gray-500 disabled:bg-white
        "
        :v-if="state === 'added'"
        v-on:click="showOptions = !showOptions"
      >
        Options<i
          class="fas ml-2"
          :class="!showOptions ? 'fa-chevron-down' : 'fa-chevron-up'"
          aria-hidden="true"
          style="font-size: 80%"
        ></i>
      </button>
    </div>
    <div v-show="showOptions" class="row pt-2">
      <div class="flex flex-col mt-1">
        <p class="text-sm text-gray-700">App Description</p>
        <p class="text-sm text-gray-500">
          What users will see as the description for this app
        </p>
      </div>
      <div class="input-group">
        <input type="text" class="w-full p-1 mt-1" v-model="appDescription" />
      </div>
      <div class="col-12 pt-2">
        <explanatory-checkbox v-model="loadImmediately">
          <strong
            slot="title"
            :class="{
              'text-gray-700': !loadImmediately,
              'text-gray-900': loadImmediately,
            }"
            >Load immediately</strong
          >
          <div slot="description">
            <p class="mb-0 text-gray-700">
              Don't require users to click to open the app - it will start
              opened.
            </p>
          </div>
        </explanatory-checkbox>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.btn-sm {
  padding: 0.05rem 0.5rem;
}
.appTitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0;
}
.added {
  /* border: 1px solid #90eca5;
  background-color: #fafffa; */
  background-color: rgb(247 251 255);
  border: 1px solid rgb(151 201 255);
  box-shadow: none;
}
</style>
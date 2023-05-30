<script lang="ts">
import AppSettingsButton from "./AppSettingsButton.vue";
import Vue from "vue";
import TransitionExpand from "../TransitionExpand.vue";
import AppTopArea from "./AppTopArea.vue";

export default Vue.extend({
  components: { AppSettingsButton, TransitionExpand, AppTopArea },
  props: [
    "app",
    "refresh",
    "profiles",
    "url",
    "origin",
    "swinkId",
    "fullscreen",
    "eventBus",
  ],
  data() {
    return {
      appCollapsed: false,
      topAreaCollapsed: true,
      appHeight: "",
      loading: true,
      grants: [
        {
          name: "phone",
          displayName: "Phone number",
          icon: "fa-phone",
          active: true,
          available: false,
        },
        {
          name: "email",
          displayName: "Email",
          icon: "fa-at",
          active: false,
          available: false,
        },
        {
          name: "name",
          displayName: "Name",
          icon: "fa-id-badge",
          active: true,
          available: false,
        },
      ],
    };
  },
  mounted() {
    const bus = this.eventBus as Vue;
    bus.$on("token", (token: string) => {
      this.postAppToken(token);
    });
    bus.$on("height", (height: string) => {
      this.appHeight = height;
    });
  },
  watch: {
    refresh(val, oldVal) {
      this.reload();
    },
    swinkId(val, oldVal) {
      this.reload();
    },
    appCollapsed(val, oldVal) {
      if (!val) {
        this.topAreaCollapsed = true;
      }
    },
  },
  methods: {
    loaded() {
      this.loading = false;
    },
    reload(): boolean {
      if (this.$refs.iframe) {
        (this.$refs.iframe as HTMLIFrameElement).src = (
          this.$refs.iframe as HTMLIFrameElement
        ).src;
        return true;
      }
      return false;
    },
    toggleTopArea() {
      this.topAreaCollapsed = !this.topAreaCollapsed;
      if (!this.topAreaCollapsed) {
        this.appCollapsed = true;
      }
    },
    expandCollapse() {
      this.appCollapsed = !this.appCollapsed;
    },
    postAppToken(token: string) {
      Vue.nextTick(() => {
        (this.$refs.iframe as HTMLIFrameElement).contentWindow?.postMessage(
          {
            type: "appToken",
            token,
          },
          this.origin
        );
      });
    },
  },
  computed: {
    height(): number {
      return this.appHeight || this.app.desiredHeight;
    },
    description(): string {
      return (
        this.app.publicDescription ||
        this.app.suggestedPublicDescription ||
        null
      );
    },
    randomColorClass(): string {
      const colors = ["primary", "info", "warning", "danger", "success"];
      return colors[Math.floor(Math.random() * colors.length)];
    },
  },
});
</script>

<template>
  <div
    class="
      border-l border-r
      card
      mb-3
      flex flex-col
      bg-white
      border-blue-100 border-b
    "
    :class="appCollapsed ? '' : 'border-' + randomColorClass"
  >
    <transition-expand>
      <app-top-area
        v-if="!topAreaCollapsed"
        :grants="grants"
        :appName="app.name"
      />
    </transition-expand>
    <div
      class="
        flex flex-row
        border-t border-blue-100
        alpha-50
        sticky
        top-0
        p-3
        z-10
        bg-white bg-opacity-50
        backdrop-filter backdrop-blur-sm
      "
      v-on:click.prevent="expandCollapse"
      style="cursor: pointer"
      id="appHeader"
    >
      <div class="flex flex-col">
        <h1 class="text-sm">{{ app.name }}</h1>
        <small :class="'text-secondary'">{{
          app.authorInfo.appAuthorName
        }}</small>
      </div>
      <div class="flex flex-row ml-auto" style="align-items: center">
        <!-- <app-settings-button
          class="mr-2"
          :grants="grants"
          @click="toggleTopArea"
          :colorClass="randomColorClass"
          :showingGrants="!topAreaCollapsed"
        /> -->
        <svg
          v-if="appCollapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div v-if="appCollapsed && description" class="p-3">
      <p class="text-secondary mb-0">{{ description }}</p>
    </div>
    <transition-expand>
      <div class="" v-if="!appCollapsed">
        <iframe
          id="appFrame"
          :class="{ loadingShimmer: loading }"
          ref="iframe"
          @load="loaded"
          :src="url"
          frameborder="0"
          sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          scrolling="no"
          :style="`height: ${height}px; width: 100%; display: block;`"
        />
      </div>
    </transition-expand>
  </div>
</template>

<style scoped>
.appCard {
  box-shadow: 0px 3px 11px 1px #8584a72e;
  transition: border 0.3s cubic-bezier(0.46, 0.03, 0.52, 0.96);
}
.loadingShimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #ffffff 4%, #f6f7f8 25%, #ffffff 36%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
<template>
  <div>
    <app
      v-for="app in apps"
      :ref="app.appId"
      :key="app.appId"
      :app="app"
      :swinkId="swinkId"
      :url="url(app)"
      :origin="origin(app)"
      :fullscreen="app.id === fullscreenAppId"
      :eventBus="eventBuses[app.appId]"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["apps", "swinkId"],
  data() {
    return {
      fullscreenAppId: "",
      origins: {} as { [appId: string]: string },
      eventBuses: {} as { [appId: string]: Vue },
      appHeight: {} as { [appId: string]: string },
    };
  },
  created() {
    for (let appId of this.appIds) {
      this.eventBuses[appId] = new Vue();
    }
  },
  mounted() {
    if (this.apps.length === 1 && this.apps[0].loadImmediately) {
      this.fullscreenApp(this.apps[0]);
    }
    this.listenForWindowEvents();
  },
  computed: {
    appIds(): string[] {
      return this.apps.map((a: any) => a.appId);
    },
  },
  methods: {
    origin(app: any): string {
      if (this.origins[app.appId]) {
        return this.origins[app.appId];
      }
      const origin = `${this.$store.state.protocol}${app.authorInfo.name}.${this.$store.state.webapps}`;
      this.origins[app.appId] = origin;
      return origin;
    },
    child(appId: string): Vue {
      return this.$refs[appId] as Vue;
    },
    url(app: any): string {
      return `${this.origin(app)}/${app.appId}`;
    },
    fullscreenApp(app: any) {
      this.fullscreenAppId = app.id;
    },
    async listener(event: MessageEvent<any>) {
      const vm = this;
      // If this message isn't intended for one of our apps, ignore
      if (!Object.values(vm.origins).includes(event.origin)) {
        return;
      }
      const message = event.data;
      if (typeof message === "string" || !message.appId) {
        return;
      }
      for (const appId of vm.appIds) {
        if (message.appId !== appId) {
          continue;
        }
        if (message.type === `appToken`) {
          event.stopImmediatePropagation();

          // We put it in an array so it triggers the watcher in the child. A raw string apparently doesn't
          // trigger the watcher
        } else if (message.type === `height`) {
          event.stopImmediatePropagation();
          this.eventBuses[appId].$emit("height", message.params.height);
        }
      }
    },
    stopListeningForEvents() {
      window.removeEventListener("message", this.listener);
    },
    listenForWindowEvents() {
      window.addEventListener("message", this.listener, false);
    },
  },
});
</script>

<style>
</style>
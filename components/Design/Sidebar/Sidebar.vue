<template>
  <div
    class="
      order-2
      md:order-1 md:mr-4
      flex flex-col
      md:-ml-2
      overflow-y-auto
      flex-grow
      -ml-px
      mt-8
      md:mt-0
    "
  >
    <scroll-shadow class="flex-grow" ref="scrollShadow">
      <design-tab
        class="pt-2"
        @check-shadow="checkShadow"
        v-show="isDesign"
      ></design-tab>
    </scroll-shadow>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DefaultTransition from "~/components/DefaultTransition.vue";
import ScrollShadow from "~/components/ScrollShadow.vue";
import CanvasOptions from "./CanvasOptions.vue";
import DesignTab from "./Tabs/Design/DesignTab.vue";
import LinkTab from "./Tabs/LinkTab.vue";
import QROptionsGroup from "./Tabs/Design/QROptions/QROptionsGroup.vue";
import DataTab from "./Tabs/DataTab.vue";
// import DataSwink from "~/components/Docs/DataSwink.vue";
import { mapState } from "vuex";
import AppsTab from "./Tabs/AppsTab.vue";

export default Vue.extend({
  components: {
    QROptionsGroup,
    CanvasOptions,
    ScrollShadow,
    DesignTab,
    DefaultTransition,
    LinkTab,
    DataTab,
    // DataSwink,
    AppsTab,
  },
  data() {
    return {
      designSelected: true,
      currentTab: "design",
    };
  },
  watch: {
    currentTab() {
      this.checkShadow();
    },
  },
  computed: {
    isDesign(): boolean {
      return this.currentTab === "design";
    },
    isLink(): boolean {
      return this.currentTab === "link";
    },
    isData(): boolean {
      return this.currentTab === "data";
    },
    isApps(): boolean {
      return this.currentTab === "apps";
    },
    ...mapState({
      isRedirect: (state: any) => state.swink?.swink?.tag?.redirect,
      swinkId: (state: any) => state.swink?.swink?.tag?.id,
    }),
  },
  methods: {
    checkShadow() {
      // @ts-ignore
      setTimeout(() => this.$refs.scrollShadow.toggleShadow(), 350);
    },
  },
});
</script>

<style>
</style>
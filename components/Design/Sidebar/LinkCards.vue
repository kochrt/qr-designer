<template>
  <scroll-shadow class="mb-2">
    <div class="flex flex-row items-center linkCards my-1 mr-2">
      <div class="w-2 flex-shrink-0"></div>
      <link-card
        v-for="link in links"
        :key="link.link"
        :link="link.link"
        :title="link.title"
        :icon="link.icon"
      />
      <div class="w-2 flex-shrink-0"></div>
    </div>
  </scroll-shadow>
</template>

<script lang="ts">
import Vue from "vue";
import ScrollShadow from "~/components/ScrollShadow.vue";
import LinkCard from "./LinkCard.vue";

export default Vue.extend({
  data() {
    return {
      links: [
        {
          link: "#how",
          title: "How the designer works",
          icon: `<svg class="w-4 h-4 mr-2" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path><path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>`,
        },
        {
          link: "#examples",
          title: "Examples",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg>`,
        },
        {
          link: "#goodDesign",
          title: "What makes a good design",
          icon: `<svg class="w-4 h-4 mr-2" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path><path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>`,
        },
        {
          link: "#faq",
          title: "FAQ",
          icon: `<svg class="w-4 h-4 mr-2" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>`,
        },
      ],
    };
  },
  components: { LinkCard, ScrollShadow },
});
</script>

<style>
.linkCards::-webkit-scrollbar {
  display: none;
}
</style>
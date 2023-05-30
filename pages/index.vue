<template>
  <div>
    <Header
      :showMake="false"
      :breadCrumbs="breadCrumbs"
      class="py-4 md:px-8 px-4 m-auto"
      style="max-width: 1200px"
    />
    <client-only>
      <design />
      <template #placeholder><loading-placeholder /></template>
    </client-only>
  </div>
</template>

<script>
import Header from "~/components/Header/Header.vue";
import Design from "~/components/Design/Design.vue";
import Footer from "~/components/Footer.vue";
import LoadingPlaceholder from "~/components/Design/LoadingPlaceholder.vue";

export default {
  components: { Design, Header, Footer, LoadingPlaceholder },
  head() {
    return {
      bodyAttrs: {
        class: "bg-gray-50",
      },
      title: "Create a swink - swink",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          name: "og:image",
          property: "og:image",
          content: `${this.$config.apiPath}/v0/swink`,
        },
      ],
    };
  },
  data() {
    return {
      breadCrumbs: [
        {
          name: "create",
          link: "/create",
        },
      ],
    };
  },
};
</script>

<style>
</style>
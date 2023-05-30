<script>
import Grants from "./Grants.vue";
import Profiles from "./Profiles.vue";
import ScrollSnap from "~/components/ScrollSnap.vue";

export default {
  components: {
    Grants,
    ScrollSnap,
    Profiles,
  },
  props: ["grants", "appName"],
  data() {
    return {
      topAreaLeftOrRight: "left",
      scrollTo: "left",
    };
  },
  watch: {
    topAreaLeftOrRight(val, oldVal) {
      this.scrollTo = "";
    },
  },
};
</script>

<template>
  <div class="bg-gray-100 border-t">
    <div>
      <grants
        v-model="grants"
        @create-profile="scrollTo = 'right'"
        :appName="appName"
      />
    </div>
  </div>
</template>

<style>
.underline {
  height: 2px;
  border-radius: 1px;
  transition: background-color 0.3s;
  background-color: transparent;
}
.underline-showing {
  background-color: white;
}
</style>
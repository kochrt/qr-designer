<script>
import { debounce } from "throttle-debounce";
import Vue from "vue";

export default {
  props: ["state"],
  data() {
    return {
      status: this.state,
      transition: "instant",
    };
  },
  watch: {
    state(val, oldVal) {
      // 'done' means we are done animating, and go back to
      // showing nothing. So if we're done, set ourselves back up
      // to be ready for the incoming state by setting the transition
      // to instant.
      if (this.status === "done") {
        // Set our transition back to be instant
        this.transition = "instant";
      }

      this.status = val;

      // We'll wait a little bit and then dismiss
      if (this.status === "saved") {
        // dismiss() is what sets up back to be 'done' eventually.
        this.dismiss();
      }
    },
  },
  created() {
    this.dismiss = debounce(20000, function () {
      this.transition = "fade-out";
      Vue.nextTick(() => {
        this.status = "done";
      });
    });
  },
};
</script>

<template>
  <div>
    <div style="position: relative" v-if="status === 'loading'">
      <div
        data-v-3be30238=""
        role="status"
        class="spinner-border ml-1 text-muted"
        style="
          width: 0.7rem;
          height: 0.7rem;
          border-width: 0.15rem;
          position: absolute;
          top: 0.3rem;
          left: 0.2rem;
        "
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <transition :name="transition">
      <div v-if="status === 'saved'" style="position: relative">
        <i
          class="fas fa-check text-primary"
          aria-hidden="true"
          style="
            font-size: x-small;
            position: absolute;
            top: 0.3rem;
            left: 0.3rem;
          "
        >
        </i>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-out-leave-active {
  transition: opacity 5s;
}
.fade-out-leave {
  opacity: 1;
}
.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
}
</style>
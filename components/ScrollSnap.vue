<template>
  <div
    class="scroll-snap-container"
    ref="scrollSnapContainer"
    @scroll.passive="scrolled"
    :class="{ fullscreen: fullscreen, horizontal: horizontal }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScrollSnap",
  props: {
    value: {
      type: String,
      default: "left",
    },
    scrollTo: {
      type: String,
      default: "left",
    },
    fullscreen: {
      type: Boolean,
      default: false,
      required: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  watch: {
    scrollTo(val, oldVal) {
      if (val === "left" || val === "right") {
        const container = this.$refs.scrollSnapContainer;
        container.scrollTo(
          container.scrollLeft +
            container.scrollWidth * (val === "left" ? -1 : 1),
          0
        );
      }
    },
  },
  methods: {
    scrolled(e) {
      const containerRect = e.target.getBoundingClientRect();
      const firstChildRect = e.target.children[0].getBoundingClientRect();
      // const secondChildRect = e.target.children[1].getBoundingClientRect()
      const amountShowing =
        firstChildRect.width - (containerRect.left - firstChildRect.left);
      const percentShowing = amountShowing / firstChildRect.width;
      const leftOrRight = percentShowing > 0.5 ? "left" : "right";
      if (leftOrRight !== this.value) {
        this.$emit("input", leftOrRight);
      }
    },
  },
};
</script>

<style>
.scroll-snap-container {
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
  --webkit-overflow-scrolling: touch;
  scroll-snap-points-y: repeat(100%);
  scroll-snap-destination: 0 0;
  scroll-snap-type: y mandatory;
  scroll-snap-type: mandatory;
  scroll-behavior: smooth;
}
.scroll-snap-container.horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-snap-points-x: repeat(100%);
  scroll-snap-type: x mandatory;
}
.scroll-snap-container.fullscreen {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  min-width: 100%;
  min-height: 100%;
}
.scroll-snap-container.fullscreen.horizontal {
  flex-direction: row;
}
.scroll-snap-container > * {
  flex: 1 0 100%;
  scroll-snap-align: start;
}
.scroll-snap-container.fullscreen > .item {
  min-height: 100%;
  flex: 1;
}
.scroll-snap-container.horizontal > .item {
  scroll-snap-align: center;
}
.scroll-snap-container.fullscreen.horizontal > .item {
  scroll-snap-align: center;
  min-width: 100%;
  flex: 1;
}
</style>
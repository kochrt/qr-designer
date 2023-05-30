<template>
  <div :class="$style.wrap">
    <div
      :class="$style['scroll-container']"
      :style="{ width, height }"
      ref="scrollContainer"
      @scroll.passive="toggleShadow"
    >
      <slot />
      <span
        :class="[$style['shadow-top'], shadow.top && $style['is-active']]"
      />
      <span
        :class="[$style['shadow-right'], shadow.right && $style['is-active']]"
      />
      <span
        :class="[$style['shadow-bottom'], shadow.bottom && $style['is-active']]"
      />
      <span
        :class="[$style['shadow-left'], shadow.left && $style['is-active']]"
      />
    </div>
  </div>
</template>

<script>
function newResizeObserver(callback) {
  // Skip this feature for browsers which
  // do not support ResizeObserver.
  // https://caniuse.com/#search=resizeobserver
  if (typeof ResizeObserver === "undefined") return;

  return new ResizeObserver((e) => e.map(callback));
}

export default {
  name: "ScrollShadow",
  data() {
    return {
      width: undefined,
      height: undefined,
      shadow: {
        top: false,
        right: false,
        bottom: false,
        left: false,
      },
    };
  },
  mounted() {
    // Check if shadows are necessary after the element is resized.
    const scrollContainerObserver = newResizeObserver(this.toggleShadow);
    if (scrollContainerObserver) {
      scrollContainerObserver.observe(this.$refs.scrollContainer);
      // Cleanup when the component is destroyed.
      this.$once("hook:destroyed", () => scrollContainerObserver.disconnect());
    }

    // Recalculate the container dimensions when the wrapper is resized.
    const wrapObserver = newResizeObserver(this.calcDimensions);
    if (wrapObserver) {
      wrapObserver.observe(this.$el);
      // Cleanup when the component is destroyed.
      this.$once("hook:destroyed", () => wrapObserver.disconnect());
    }
  },
  methods: {
    async calcDimensions() {
      // Reset dimensions for correctly recalculating parent dimensions.
      this.width = undefined;
      this.height = undefined;
      await this.$nextTick();

      this.width = `${this.$el.clientWidth}px`;
      this.height = `${this.$el.clientHeight}px`;
    },
    // Check if shadows are needed.
    toggleShadow() {
      const hasHorizontalScrollbar =
        this.$refs.scrollContainer.clientWidth <
        this.$refs.scrollContainer.scrollWidth;
      const hasVerticalScrollbar =
        this.$refs.scrollContainer.clientHeight <
        this.$refs.scrollContainer.scrollHeight;

      const scrolledFromLeft =
        this.$refs.scrollContainer.offsetWidth +
        this.$refs.scrollContainer.scrollLeft;
      const scrolledFromTop =
        this.$refs.scrollContainer.offsetHeight +
        this.$refs.scrollContainer.scrollTop;

      const scrolledToTop = this.$refs.scrollContainer.scrollTop === 0;
      const scrolledToRight =
        scrolledFromLeft >= this.$refs.scrollContainer.scrollWidth;
      const scrolledToBottom =
        scrolledFromTop >= this.$refs.scrollContainer.scrollHeight;
      const scrolledToLeft = this.$refs.scrollContainer.scrollLeft === 0;

      this.shadow.top = hasVerticalScrollbar && !scrolledToTop;
      this.shadow.right = hasHorizontalScrollbar && !scrolledToRight;
      this.shadow.bottom = hasVerticalScrollbar && !scrolledToBottom;
      this.shadow.left = hasHorizontalScrollbar && !scrolledToLeft;
    },
  },
};
</script>

<style lang="scss" module>
.wrap {
  overflow: hidden;
  position: relative;
}

.scroll-container {
  overflow: auto;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.shadow-top,
.shadow-right,
.shadow-bottom,
.shadow-left {
  position: absolute;
  border-radius: 6em;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 11;
}

.shadow-top,
.shadow-bottom {
  right: 0;
  left: 0;
  height: 0.8em;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  background-image: linear-gradient(
    rgba(rgb(110, 102, 218), 0.05) 0%,
    rgba(#fff, 0) 100%
  );
  z-index: 11;
}

.shadow-top {
  top: 0;
}

.shadow-bottom {
  bottom: 0;
  transform: rotate(180deg);
}

.shadow-right,
.shadow-left {
  top: 0;
  bottom: 0;
  width: 0.2em;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-image: linear-gradient(
    90deg,
    rgba(rgb(110, 102, 218), 0.1) 0%,
    rgba(#fff, 0) 100%
  );
  z-index: 11;
}

.shadow-right {
  right: 0;
  transform: rotate(180deg);
}

.shadow-left {
  left: 0;
}

.is-active {
  opacity: 1;
}
</style>
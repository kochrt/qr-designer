<template>
  <div>
    <div
      @click="toggleCollapsed"
      class="
        p-2
        transition
        cursor-pointer
        flex flex-row
        items-center
        bg-gray-50
        sticky
        top-0
        z-10
        border-b
        transition
      "
      :class="{
        'hover:bg-indigo-50': type === 'swink',
        'hover:bg-purple-50': type === 'design',
        'border-transparent': collapsed,
        'border-gray-100': !collapsed,
      }"
    >
      <slot name="headerIcon"></slot>
      <h4
        class="font-medium"
        :class="{ 'text-gray-900': collapsed, 'text-gray-700': !collapsed }"
      >
        {{ title }}
      </h4>
      <div class="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 transition transform"
          :class="collapsed ? 'rotate-90' : 'rotate-180'"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <transition-expand>
      <div v-if="useVIf && !collapsed">
        <slot></slot>
      </div>
      <div v-else-if="!useVIf" v-show="!collapsed">
        <slot></slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import TransitionExpand from "~/components/TransitionExpand.vue";
export default {
  components: { TransitionExpand },
  props: ["title", "defaultCollapsed", "type", "useVIf"],
  data() {
    return {
      collapsed: !!this.defaultCollapsed,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit("check-shadow");
    },
  },
};
</script>

<style>
</style>
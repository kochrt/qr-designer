<script>
import * as timeago from "timeago.js";

export default {
  props: {
    tag: Object,
    name: String,
    expiresSoon: {
      type: Boolean,
      default: false,
    },
    showManage: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    isDeleting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleting: this.isDeleting,
      duplicating: false,
    };
  },
  computed: {
    createdDate() {
      return timeago.format(this.tag.set.toDate());
    },
  },
  methods: {
    imageUrl(image) {
      return `${this.$config.apiPath}/v0/swink/${this.tag.id}/images/${image}`;
    },
    alertDelete() {
      if (confirm("Delete this QR Code? This cannot be undone.")) {
        this.deleteCode();
      }
    },
    async deleteCode() {
      const vm = this;
      vm.deleting = true;
    },
    async duplicate() {
      const vm = this;
      vm.duplicating = true;
    },
  },
};
</script>

<template>
  <div class="mb-4 p-4 card card-big border-none bg-white rounded">
    <div class="flex items-center">
      <a
        class="mr-2 btn btn-light rounded py-1 iconIndicator flex-shrink-0"
        :class="tag.redirect ? 'text-primary' : 'text-warning'"
        :href="`/create/${tag.id}`"
      >
        <i class="fas" :class="tag.redirect ? 'fa-link' : 'fa-bolt'"></i
      ></a>
      <h5 class="tagName m-0">
        <a
          class="tagNameLink text-gray-800 hover:underline"
          :href="`/${tag.id}`"
          >{{ name || tag.name || tag.url || tag.id }}</a
        >
      </h5>
      <div class="buttons ml-auto flex">
        <a
          class="
            mr-3
            text-gray-800
            flex
            items-center
            text-sm
            disabled:text-gray-400
            transition
          "
          :href="!!deleting ? '/' : `/create/${tag.id}`"
          :disabled="!!deleting"
          style="text-decoration: none"
        >
          <span class="sm:inline-block hidden mr-2">Edit</span
          ><i class="fas fa-edit"></i
        ></a>
        <button
          class="mr-3 text-dark btn btn-link disabled:text-gray-400 transition"
          v-on:click="duplicate"
          :disabled="duplicating || deleting"
        >
          <span class="mr-1 sm:inline-block hidden">{{
            duplicating ? "Duplicating..." : "Duplicate"
          }}</span>
          <i class="fas fa-clone" aria-hidden="true"></i>
        </button>
        <button
          v-if="showDelete"
          class="
            mr-3
            text-dark
            btn btn-link
            group
            disabled:text-gray-400
            transition
          "
          v-on:click="alertDelete"
          :disabled="!!deleting"
          style="text-decoration: none"
        >
          <span class="mr-1 sm:inline-block hidden">{{
            deleting ? "Deleting..." : "Delete"
          }}</span>
          <i class="far fa-trash-alt text-red-700 group-hover:text-red-500"></i>
        </button>
      </div>
    </div>
    <div class="flex" style="color: #aeb0b3">
      <div style="width: 26px" class="mr-2"></div>
      <small>{{ createdDate }}</small>
      <small class="mx-2">|</small>
      <a
        :href="`/${tag.id}/stats`"
        style="line-height: normal"
        class="text-secondary"
      >
        <small>
          <i class="far fa-eye mr-1"></i>
          {{ tag.viewCount }}
        </small>
        <small>
          <i class="fas fa-chart-line ml-1"></i>
        </small>
      </a>
    </div>
    <div
      v-if="tag.images && tag.images.length > 0"
      class="
        card-horizontal
        flex-row
        align-items-start
        scrolling-wrapper-flexbox
        pt-2
      "
    >
      <a
        v-for="image in tag.images"
        :key="image"
        class="image-holder flex"
        :href="`/create/${tag.id}`"
      >
        <img
          loading="lazy"
          class="mr-3 rounded thumbnail"
          :src="imageUrl(image)"
          onerror="this.style.display = 'none';"
          style="object-fit: contain"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.card-big {
  box-shadow: 0px 4px 5px 0px rgb(133 132 167 / 10%);
  border: none;
}
.buttons {
  flex-shrink: 0;
}

.tagName,
.tagNameLink {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-row {
  align-items: center;
}

.iconIndicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
}

.gold {
  /* color: gold; */
  border: 1px solid gold;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  --webkit-overflow-scrolling: touch;
}
.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
.thumbnail {
  max-height: 14rem;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["tag", "swinkId"],
  computed: {
    apiBaseUrl(): string {
      return `${this.$config.apiPath}/v0`;
    },
    hasImages(): boolean {
      return !this.tag.hideImages && this.tag.images && this.tag.images.length;
    },
    onlyImages(): boolean {
      return this.hasImages && !this.tag.message && !this.hasContactFields;
    },
    hasContactFields(): boolean {
      return (
        this.tag.email || this.tag.instagram || this.tag.phone || this.tag.venmo
      );
    },
  },
});
</script>

<template>
  <div class="card pb-3 mb-3 bg-white p-2 border">
    <div
      v-if="hasImages"
      class="card-horizontal align-items-start scrolling-wrapper-flexbox"
      :class="{
        'flex-col items-center': onlyImages,
        'flex-row pl-3': !onlyImages,
      }"
    >
      <a
        v-for="(image, index) in tag.images"
        :key="image"
        class="image-holder flex pt-3"
        :href="`${apiBaseUrl}/swink/${swinkId}/images/${image}`"
      >
        <img
          class="rounded thumbnail"
          :class="{
            'mr-3': !onlyImages,
            'mb-3': onlyImages && index !== tag.images.length - 1,
          }"
          :style="
            onlyImages
              ? 'object-fit: contain'
              : 'object-fit: contain; max-height: 18rem;'
          "
          :src="`${apiBaseUrl}/swink/${swinkId}/images/${image}`"
          onerror="this.style.display = 'none';"
        />
      </a>
    </div>
    <div class="pb-0 px-3" :class="{ 'pt-3': hasImages, 'pt-1': !hasImages }">
      <div v-if="tag.url" class="text-blue-800">
        <h5 class="text-2xl">
          <a :href="tag.url" class="font-medium" style="font-family: Poppins">{{
            tag.name
          }}</a>
        </h5>
        <h6 class="">
          <a :href="tag.url" class="underline">{{ tag.url }}</a>
        </h6>
      </div>
      <h5 v-else class="text-xl">{{ tag.name }}</h5>
    </div>
    <p
      v-if="tag.message"
      class="px-3 pt-2 mb-0 text-gray-900"
      style="white-space: pre-line; font-family: Poppins"
    >{{ tag.message }}</p>
    <div
      v-if="tag.email || tag.instagram || tag.phone || tag.venmo"
      class="scrolling-wrapper-flexbox pt-2 pl-3"
    >
      <div class="btn-group btn-group-sm pr-2" v-if="tag.phone">
        <a
          class="btn btn-outline-primary buttonLightBorder"
          :href="'tel:' + tag.phone"
          >{{ tag.phone }}</a
        >
      </div>
      <div v-if="tag.venmoUrl" class="btn-group btn-group-sm pr-2">
        <button class="btn btn-light buttonLightBorder">$</button>
        <a
          class="btn btn-outline-success buttonLightBorder"
          :href="tag.venmoUrl + '&txn=charge'"
          >Request</a
        >
        <a
          class="btn btn-outline-primary buttonLightBorder"
          :href="tag.venmoUrl + '&txn=pay'"
          >Pay</a
        >
      </div>
      <div v-else-if="tag.venmo" class="btn-group btn-group-sm pr-2">
        <button class="btn btn-light buttonLightBorder">$</button>
        <button class="btn btn-light buttonLightBorder">
          {{ tag.venmo }}
        </button>
      </div>
      <div v-if="tag.email" class="btn-group btn-group-sm pr-2">
        <button class="btn btn-light buttonLightBorder">@</button>
        <button class="btn btn-outline-primary buttonLightBorder">
          {{ tag.email }}
        </button>
      </div>
      <div v-if="tag.instagram" class="btn-group btn-group-sm pr-2">
        <button class="btn btn-light buttonLightBorder flex items-center">
          <img src="/assets/ig.svg" style="height: 0.875rem" />
        </button>
        <a
          class="btn btn-outline-primary buttonLightBorder"
          :href="`https://www.instagram.com/${tag.instagram}`"
          >{{ tag.instagram }}</a
        >
      </div>
    </div>
  </div>
</template>

<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  --webkit-overflow-scrolling: touch;
}
.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
.buttonLightBorder {
  border-color: #dadada;
}
</style>
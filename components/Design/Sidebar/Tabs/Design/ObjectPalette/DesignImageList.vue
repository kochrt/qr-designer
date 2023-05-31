<template>
  <div>
    <div class="overflow-auto flex flex-row">
      <div class="flex flex-col max-w-1/2 items-center mr-1">
        <glyph-image
          v-for="glyph in glyphListLeft"
          :key="glyph"
          :glyph="glyph"
        />
      </div>
      <div class="flex flex-col max-w-1/2 items-center">
        <glyph-image
          v-for="glyph in glyphListRight"
          :key="glyph"
          :glyph="glyph"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TransitionExpand from "~/components/TransitionExpand.vue";
import Vue from "vue";
import GlyphImage from "./GlyphImage.vue";

export default Vue.extend({
  components: {
    GlyphImage,
    TransitionExpand
  },
  props: ["imageAdded"],
  data() {
    return {
      glyphListLeft: [] as string[],
      glyphListRight: [] as string[]
    };
  },
  watch: {
    imageAdded(val) {
      const reader = new FileReader();
      reader.addEventListener("load", event => {
        if (this.glyphListLeft.length <= this.glyphListRight.length) {
          // @ts-ignore
          this.glyphListLeft.push(event.target?.result);
        } else {
          // @ts-ignore
          this.glyphListRight.push(event.target?.result);
        }
      });
      reader.readAsDataURL(val.raw);
    }
  }
});
</script>

<style></style>

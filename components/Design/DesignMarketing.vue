<template>
  <div>
    <div
      class="w-full px-4 md:px-8 mt-24 flex flex-col m-auto"
      style="max-width: 1200px"
    >
      <div class="md:w-1/2">
        <h2 class="font-bold text-gray-300 text-5xl poppins" id="how">
          How the designer works
        </h2>
        <div class="my-4 text-light">
          <p>
            Most QR codes take advantage of error correction to put cute icons
            in the middle. Swink QRs incorporate whatever imagery is put into
            the QR area as part of the QR code itself, which means that they can
            actually be more accurate and more scannable than other QR codes.
            It's not infallible, but when done correctly can make for some
            creative, scannable designs.
          </p>
        </div>
      </div>
    </div>
    <div
      class="
        w-full
        px-4
        md:px-8
        mt-24
        flex flex-col
        bgstripe
        relative
        overflow-hidden
      "
    >
      <div class="m-auto flex flex-col" style="max-width: 1200px">
        <div class="ml-auto md:w-1/2 mt-8">
          <h2 class="font-bold text-purple-300 text-5xl poppins" id="examples">
            Gallery
          </h2>
          <div class="my-4 text-light text-purple-200">
            <p>
              The following examples are all very scannable - try for yourself!
            </p>
            <br />
            <p class="italic text-purple-200 text-sm">
              We look forward to replacing our admittedly weak designs with
              designs that more creative people come up with. If you think you
              have such a design, please
              <a href="mailto:contact@sw.ink" class="underline"
                >email it to us!</a
              >
            </p>
          </div>
        </div>
        <div class="flex mt-4 flex-wrap justify-center">
          <div
            v-for="example in examples"
            :key="example.image"
            class="mr-4 md:mr-8 mb-4 md:mb-8 md:w-64 w-32"
          >
            <img
              loading="lazy"
              :src="`/example_designs/${example.image}`"
              class="w-full h-auto"
            />
            <div class="flex items-center justify-center mt-1">
              <p class="italic text-purple-300 text-light text-sm">
                {{ example.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-auto" style="max-width: 1200px">
      <div class="w-full px-4 md:px-8 flex flex-col">
        <div class="md:w-1/2 mt-8">
          <h2 class="font-bold text-gray-300 text-5xl poppins" id="goodDesign">
            What makes a good design
          </h2>
          <div class="my-4 text-light">
            <p>
              There's only one rule -
              <span class="font-bold italic"
                >a good design is one that scans well</span
              >.<br /><br />
              You'll find it's easy to make something that doesn't scan. There's
              nothing preventing you from placing a black square over the entire
              QR code. But this would not be a good design.
              <br /><br />Here are a few tips:
            </p>
            <ol class="list-decimal list-inside mt-1">
              <li>
                Try to stick to one color for whatever elements you put inside
                the QR code's drawing area.
              </li>
              <li>Try to match up elements to the QR grid, if possible.</li>
              <li>
                Less is more - don't overdo it by putting a bunch of stuff in
                the middle.
              </li>
              <li>
                Try to test with an Android phone; they are consistenly worse
                than iOS for scanning. If it scans on an Android, we can assume
                it'll scan on iOS.
              </li>
              <li>
                With all that being said, I'll reiterate the first rule - if it
                scans, you're golden.
              </li>
            </ol>
          </div>
        </div>
        <div class="ml-auto md:w-1/2 mt-8">
          <h2 class="font-bold text-gray-300 text-5xl poppins" id="faq">
            Frequently asked questions
          </h2>
          <div class="my-4 text-light">
            <p>Can I have multiple QR codes in one design?</p>
            <p class="italic text-gray-400">No, at least not yet.</p>
            <br />
            <p>
              Do I have to draw or put something in the middle of the QR code?
              What if I don't want to?
            </p>
            <p class="italic text-gray-400">
              No, you don't have to draw anything. They are scannable from the
              start.
            </p>
            <br />
            <p>Will the QR code scan if I rotate it?</p>
            <p class="italic text-gray-400">
              Yes. The orientation of the QR code does not affect whether it
              will scan or not.
            </p>
            <br />
            <p>How do I change what the QR code links to?</p>
            <p class="italic text-gray-400">
              Click on the <span class="font-bold poppins">Link</span> tab next
              to the <span class="font-bold poppins">Design</span> tab, and type
              or paste the link you want the QR code to go to. If you don't
              already have an account, you'll be prompted to make one.
            </p>
            <br />
            <p>Can I save my design and come back to it later?</p>
            <p class="italic text-gray-400">Not yet. We're working on that.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      examples: [
        {
          image: "1.png",
          description: "Artsy lines",
        },
        {
          image: "2.png",
          description: "Some logos fit more perfectly than others",
        },
        {
          image: "3.png",
          description: "Wedding invitations anyone?",
        },
        {
          image: "4.png",
          description: "Might use this one in some marketing materials",
        },
        {
          image: "5.png",
          description: "You can use emoji 😮",
        },
        {
          image: "6.png",
          description: "More text",
        },
        {
          image: "7.png",
          description: "Idk",
        },
        {
          image: "8.png",
          description:
            "This is technically scannable but we don't recommend designs like these.",
        },
      ],
    };
  },
});
</script>

<style>
.poppins {
  font-family: Poppins;
}
.bgstripe:before {
  content: "";
  background-color: #312e81;
  position: absolute;
  height: 110%;
  width: 4000px;
  left: -1000px;
  z-index: -1;
  @apply bg-gradient-to-bl from-purple-500 via-purple-700 to-purple-800;
}
</style>
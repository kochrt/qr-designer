<template>
  <div class="flex items-center">
    <button
      class="text-gray-600 hover:text-gray-900 transition"
      title="Bold"
      @click="$emit('bold')"
    >
      <svg
        class="h-6 w-6"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path
          d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
        ></path>
      </svg>
    </button>
    <button
      class="text-gray-600 hover:text-gray-900 transition"
      title="Italic"
      @click="$emit('italic')"
    >
      <svg
        class="h-6 w-6"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
      </svg>
    </button>
    <button
      class="text-gray-600 hover:text-gray-900 transition"
      title="Underline"
      @click="$emit('underline')"
    >
      <svg
        class="h-6 w-6"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path
          d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
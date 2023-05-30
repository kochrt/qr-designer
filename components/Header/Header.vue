<template>
  <div>
    <div class="header flex flex-row"></div>
  </div>
</template>

<script></script>

<style scoped>
@media (max-width: 576px) {
  .smallGone {
    display: none;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif;
}

.header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.companyName {
  flex-shrink: 0;
}

.makeSwinkButton {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    border-radius 0.15s ease-in-out;
  color: mediumvioletred;
}

.makeSwinkButton:hover {
  color: darkorchid;
}

.breadCrumbWrapper {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.logo {
  width: 2.5rem;
  height: 2.5rem;
}

.title {
  margin: 0 0 0 0.5rem;
  text-decoration: none;
}

a:hover {
  color: #343a40;
  text-decoration: none;
}

.buttonGroup {
  flex-shrink: 0;
}
</style>

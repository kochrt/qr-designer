<script>
export default {
  props: ["value", "appName"],
};
</script>

<template>
  <div class="">
    <div class="pt-1 px-3 pb-3">
      <h6 class="text-sm text-gray-900 my-1">
        Allow <strong>{{ appName }}</strong> to access my:
      </h6>
      <div v-for="grant in value" :key="grant.name" class="form-group mb-1">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="grant.name"
            v-model="grant.active"
            :disabled="!grant.available"
          />
          <label class="form-check-label" :for="grant.name">
            {{ grant.displayName }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.btn-sm {
  padding: 0.05rem 0.5rem;
}

.form-check-input[disabled] ~ .form-check-label {
  color: #b7c0c7;
}

.top-rounded {
  border-top-right-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
}
</style>
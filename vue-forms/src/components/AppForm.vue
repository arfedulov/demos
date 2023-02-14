<template>
  <div>
    <h2 class="page__header">{{ label }}</h2>

    <form
      v-form-validation="{ rules }"
      :action="action"
      :method="method"
      class="form page__form"
    >
      <slot></slot>

      <button class="form__input">{{ submitLabel }}</button>
    </form>
  </div>
</template>

<script setup>
defineProps({
  action: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "GET",
  },
  label: {
    type: String,
    required: true,
  },
  submitLabel: {
    type: String,
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
});
</script>

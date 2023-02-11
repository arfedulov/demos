<template>
  <div>
    <h2 class="page__header">{{ label }}</h2>

    <form :id="id" class="form page__form">
      <slot></slot>

      <button class="form__input">{{ submitLabel }}</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { initForm } from "../util/form.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
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
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  const form = document.getElementById("registrationForm");
  initForm(form, { rules: props.rules });
});
</script>

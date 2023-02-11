<template>
  <div class="form__field field field--row">
    <input
      class="form__input"
      :id="id"
      :name="name"
      type="checkbox"
      :required="required"
      :aria-describedby="descriptionId"
    />
    <label
      :for="id"
      class="form__label"
      :class="{ 'form__label--required': required }"
    >
      <slot></slot>
    </label>
    <span
      :id="descriptionId"
      aria-live="assertive"
      class="form__input-description form__input-description--full-width"
    ></span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const descriptionId = computed(() => `${props.id}Description`);
</script>

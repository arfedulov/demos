<template>
  <div class="form__field field">
    <label
      :for="id"
      class="form__label"
      :class="{ 'form__label--required': required }"
      >{{ label }}</label
    >
    <select
      :id="id"
      :name="name"
      class="form__input"
      :required="required"
      :aria-describedby="descriptionId"
    >
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span
      :id="descriptionId"
      aria-live="assertive"
      class="form__input-description"
      >{{ description }}</span
    >
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
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const descriptionId = computed(() => `${props.id}Description`);
</script>

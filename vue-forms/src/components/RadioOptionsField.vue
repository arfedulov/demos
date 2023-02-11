<template>
  <fieldset class="form__field field form__field--required">
    <legend :class="{ 'form__label--required': required }">{{ label }}</legend>

    <div
      v-for="option of options"
      :key="option.value"
      class="field field--row form__field"
    >
      <label :for="buildOptionId(option.value)">{{ option.label }}</label>
      <input
        :id="buildOptionId(option.value)"
        type="radio"
        :name="name"
        :value="option.value"
        class="form__input form__input--lean-start"
      />
    </div>
  </fieldset>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
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
  options: {
    type: Array,
    required: true,
  },
});

const capitalize = (s) => `${s[0].toUpperCase()}${s.slice(1)}`;
const buildOptionId = (optionValue) => `${props.id}${capitalize(optionValue)}`;
</script>

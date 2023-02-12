<template>
  <fieldset class="form__field field">
    <legend :class="{ 'form__label--required': required }">{{ label }}</legend>

    <div
      v-for="option of options"
      :key="option.value"
      class="field field--row form__field"
    >
      <label :for="buildOptionId(option.value)">{{ option.label }}</label>
      <input
        :id="buildOptionId(option.value)"
        type="checkbox"
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
    requried: true,
  },
  name: {
    type: String,
    requried: true,
  },
  options: {
    type: Array,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const capitalize = (s) => `${s[0].toUpperCase()}${s.slice(1)}`;
const buildOptionId = (optionValue) => `${props.id}${capitalize(optionValue)}`;
</script>

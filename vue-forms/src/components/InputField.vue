<template>
  <div class="form__field field">
    <label
      :for="id"
      class="form__label"
      :class="{
        'form__label--required': required,
      }"
      >{{ label }}</label
    >
    <textarea
      v-if="type === 'textarea'"
      class="form__input"
      :id="id"
      :name="name"
      cols="30"
      rows="10"
      :aria-describedby="descriptionId"
    ></textarea>
    <input
      v-else
      class="form__input"
      :id="id"
      :type="type"
      :name="name"
      :required="required"
      :autocomplete="autocomplete"
      :aria-describedby="descriptionId"
      :minlength="minlength"
      :list="dataListId"
      :inputmode="inputmode"
      :accept="accept"
    />
    <datalist v-if="hasOptions" :id="dataListId">
      <option v-for="option of options" :key="option" :value="option"></option>
    </datalist>
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
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  minlength: {
    type: String,
    default: null,
  },
  inputmode: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  accept: {
    type: String,
    default: null,
  },
});

const descriptionId = computed(() => `${props.id}Description`);
const hasOptions = computed(() => props.options.length > 0);
const dataListId = computed(() =>
  hasOptions.value ? `${props.id}Options` : null
);
</script>

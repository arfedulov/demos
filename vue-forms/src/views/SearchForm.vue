<template>
  <AppForm
    action="http://localhost:3000/api/form/search-form"
    method="POST"
    label="Поиск"
    submit-label="Искать"
  >
    <InputField
      id="minPrice"
      type="number"
      label="Минимальная цена (&#8381;)"
      name="minPrice"
      :min="100"
      :max="100000"
      value="100"
    />

    <InputField
      id="maxPrice"
      type="number"
      name="maxPrice"
      label="Максимальная цена (&#8381;)"
      :min="100"
      :max="100000"
      value="100000"
    />

    <CheckboxOptionsField
      id="categories"
      label="Категории"
      name="categories"
      :options="categoryOptions"
    />

    <InputField id="color" type="color" name="color" label="Цвет" />

    <InputField
      id="maxDeliveryDays"
      type="range"
      name="maxDeliveryDays"
      :min="1"
      :max="5"
      value="5"
      :step="1"
      label="Максимальное время доставки (от 1 до 5 дней)"
    />
  </AppForm>
</template>

<script setup>
import AppForm from "../components/AppForm.vue";
import InputField from "../components/InputField.vue";
import CheckboxOptionsField from "../components/CheckboxOptionsField.vue";

const categoryOptions = [
  {
    label: "Одежда",
    value: "clothes",
  },
  {
    label: "Обувь",
    value: "shoes",
  },
  {
    label: "Книги",
    value: "books",
  },
  {
    label: "Электроника",
    value: "electronics",
  },
  {
    label: "Строительные материалы",
    value: "constructionMaterials",
  },
];
</script>

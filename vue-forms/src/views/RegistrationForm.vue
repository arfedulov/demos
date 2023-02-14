<template>
  <AppForm
    label="Регистрация"
    submit-label="Зарегистрировать"
    :rules="rules"
    action="http://localhost:3000/api/form/registration-form"
    method="POST"
  >
    <InputField
      id="email"
      type="email"
      label="Электронная почта"
      description="Адрес вашей электронной почты (например, abc@example.com)"
      name="email"
      required
      autocomplete="email"
    />

    <InputField
      id="password"
      type="password"
      label="Пароль"
      description="Пароль, который вы будете использовать для входа"
      name="password"
      required
      autocomplete="new-password"
      minlength="8"
    />

    <InputField
      id="fullName"
      type="text"
      label="Полное имя"
      name="fullName"
      required
      autocomplete="name"
      description="Например, Иван Иванов"
    />

    <DropdownField
      id="country"
      label="Страна"
      name="country"
      required
      :options="countryOptions"
    />

    <InputField
      id="city"
      type="text"
      name="city"
      :options="cityOptions"
      required
      label="Город"
    />

    <InputField
      id="address"
      type="text"
      name="address"
      required
      label="Адрес"
      description="Например, 11-я линия Васильевского острова, 48"
    />

    <InputField
      id="phoneNumber"
      type="text"
      name="phoneNumber"
      inputmode="tel"
      required
      label="Номер телефона"
      description="Номер телефона в международном формате (например, +7 999 000 00 00)"
    />

    <InputField
      id="dateOfBirth"
      type="date"
      name="dateOfBirth"
      label="Дата рождения"
    />

    <RadioOptionsField
      id="gender"
      label="Пол"
      name="gender"
      :options="genderOptions"
    />

    <InputField
      id="photo"
      type="file"
      label="Фото"
      name="photo"
      accept="image/*"
    />

    <InputField id="about" type="textarea" name="about" label="О себе" />

    <CheckboxField id="terms" name="termsAndConditions" required
      >Принять
      <a href="https://www.wikipedia.org/" target="_blank"
        >условия использования</a
      ></CheckboxField
    >
  </AppForm>
</template>

<script setup>
import InputField from "../components/InputField.vue";
import CheckboxField from "../components/CheckboxField.vue";
import DropdownField from "./DropdownField.vue";
import RadioOptionsField from "../components/RadioOptionsField.vue";
import AppForm from "../components/AppForm.vue";

const PHONE_NUMBER_PREFIX = {
  BY: "+375",
  UA: "+380",
  RU: "+7",
};

const rules = {
  phoneNumber: (formData, value) => {
    const selectedCountry = formData.get("country");
    const expectPrefix = selectedCountry
      ? PHONE_NUMBER_PREFIX[selectedCountry]
      : "";

    if (!value.trim().startsWith(expectPrefix)) {
      return `Телефонный номер должен начинаться с ${expectPrefix}`;
    }

    return "";
  },
};

const cityOptions = [
  "Санкт-Петербург",
  "Москва",
  "Киев",
  "Минск",
  "Великий Новгород",
];

const countryOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "RU",
    label: "Россия",
  },
  {
    value: "UA",
    label: "Украина",
  },
  {
    value: "BY",
    label: "Беларусь",
  },
];

const genderOptions = [
  {
    value: "male",
    label: "Мужской",
  },
  {
    value: "female",
    label: "Женский",
  },
];
</script>

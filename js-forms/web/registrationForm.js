import { initForm } from "./form.js";

const COUNTRY = {
  BY: "Беларусь",
  UA: "Украина",
  RU: "Россия",
};
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

const form = document.getElementById("registrationForm");

initForm(form, { rules });

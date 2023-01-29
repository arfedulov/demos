const $ = (id) => document.getElementById(id);

const rules = {
  // a really dumm example of how a custom validation
  // rulle should look like for the field
  password: (formData, value) => {
    if (formData.get("email").startsWith("a")) {
      return value.includes("a") ? "" : 'Password must include "a"';
    }

    return "";
  },
};

const formIds = [
  "registerFormStepOne",
  "registerFormStepTwo",
  "registerFormStepThree",
];

formIds.forEach((id) => {
  const form = $(id);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("blur", (e) => validateOnBlur(e.target), true);
});

function onSubmit(event) {
  event.preventDefault();

  const isValid = customValidateOnSubmit(event);
  if (!isValid) {
    return;
  }

  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData.entries()));
}

function updateCustomValidity(inputElement) {
  const rule = rules[inputElement.name];
  if (!rule) {
    return;
  }

  const formData = new FormData(inputElement.form);
  const validity = rule(formData, inputElement.value);
  inputElement.setCustomValidity(validity);
}

function validateOnBlur(inputElement) {
  updateCustomValidity(inputElement);

  const isValid = inputElement.validity.valid;
  const descriptionElement = $(inputElement.getAttribute("aria-describedby"));

  if (!isValid) {
    const message = inputElement.validationMessage;

    if (!descriptionElement.dataset.infoDescription) {
      // memorize info text
      descriptionElement.dataset.infoDescription = descriptionElement.innerText;
    }

    descriptionElement.innerText = message;
    descriptionElement.classList.add("form__input-description--invalid");
  } else {
    if (descriptionElement && descriptionElement.dataset.infoDescription) {
      // restore info description
      descriptionElement.innerText = descriptionElement.dataset.infoDescription;
    }

    descriptionElement?.classList.remove("form__input-description--invalid");
  }
}

function customValidateOnSubmit(event) {
  let isValid = true;

  for (const controll of Array.from(event.target)) {
    validateOnBlur(controll);
    const valid = event.target.reportValidity();
    if (!valid) {
      isValid = false;
    }
  }

  return isValid;
}

// TODO: add on-submit validation

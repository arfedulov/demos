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
  const form = document.getElementById(id);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("blur", (e) => validateOnBlur(e.target), true);
  form
    .querySelector("button")
    .addEventListener("click", customValidateOnSubmit);
});

function onSubmit(event) {
  // it's valid if "submit" event is emitted
  event.preventDefault();

  const formId = event.target.getAttribute("id");

  const formData = new FormData(event.target);
  return fetch(`/api/register/${formId}`, {
    method: "POST",
    body: formData,
  });
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
  const descriptionElement = document.getElementById(
    inputElement.getAttribute("aria-describedby")
  );

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
  for (const controll of Array.from(event.target.form)) {
    validateOnBlur(controll);
  }
}

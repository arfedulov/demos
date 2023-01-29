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
  form.addEventListener("blur", validateOnBlur, true);
});

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData.entries()));
}

function updateCustomValidity(event) {
  const rule = rules[event.target.name];
  if (!rule) {
    return;
  }

  const formData = new FormData(event.target.form);
  const validity = rule(formData, event.target.value);
  event.target.setCustomValidity(validity);
}

function validateOnBlur(event) {
  const isValid = event.target.validity.valid;
  const descriptionElement = $(event.target.getAttribute("aria-describedby"));

  updateCustomValidity(event);

  if (!isValid) {
    const message = event.target.validationMessage;

    if (!descriptionElement.dataset.infoDescription) {
      // memorize info text
      descriptionElement.dataset.infoDescription = descriptionElement.innerText;
    }

    descriptionElement.innerText = message;
    descriptionElement.classList.add("form__input-description--invalid");
  } else {
    if (descriptionElement.dataset.infoDescription) {
      // restore info description
      descriptionElement.innerText = descriptionElement.dataset.infoDescription;
    }

    descriptionElement.classList.remove("form__input-description--invalid");
  }
}

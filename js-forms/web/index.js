const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelector(selector);
document.addEventListener("blur", validateOnBlur, true);

const formIds = [
  "registerFormStepOne",
  "registerFormStepTwo",
  "registerFormStepThree",
];

formIds.forEach((id) => {
  const form = $(id);
  form.addEventListener("submit", onSubmit);
});

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData.entries()));
}

function validateOnBlur(event) {
  const isValid = event.target.validity.valid;
  const descriptionElement = $(event.target.getAttribute("aria-describedby"));

  if (!isValid) {
    console.log("is invalid");
    const message = event.target.validationMessage;

    if (!descriptionElement.dataset.infoDescription) {
      // memorize info text
      descriptionElement.dataset.infoDescription = descriptionElement.innerText;
    }

    descriptionElement.innerText = message;
    descriptionElement.classList.add("form__input-description--invalid");
  } else {
    console.log("is valid");
    console.log(descriptionElement.dataset.infoDescription);
    descriptionElement.innerText = descriptionElement.dataset.infoDescription;
    descriptionElement.classList.remove("form__input-description--invalid");
  }
}

// TODO: add accessability attributes and validation

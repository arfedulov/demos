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

function init() {
  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("blur", (e) => renderControllValidity(e.target), true);
  form
    .querySelector("button")
    .addEventListener("click", (e) => validateForm(e.target.form));
}
init();

function updateCustomValidity(inputElement) {
  // check input value with custom validators
  // and set input's validity object accordingly
  const rule = rules[inputElement.name];
  if (!rule) {
    return;
  }

  const formData = new FormData(inputElement.form);
  const validity = rule(formData, inputElement.value);
  inputElement.setCustomValidity(validity);
}

function renderControllValidity(inputElement) {
  updateCustomValidity(inputElement);

  // Browser handles default validations (like, required, etc..).
  // Custom validations are done by "updateCustomValidity" function.
  // Now we need to check the validity and render the error messages.
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

function validateForm(form) {
  for (const controll of Array.from(form)) {
    renderControllValidity(controll);
  }
}

function onSubmit(event) {
  // it's valid if "submit" event is emitted
  event.preventDefault();

  const formId = event.target.getAttribute("id");

  const formData = new FormData(event.target);
  return fetch(`/api/form/${formId}`, {
    method: "POST",
    body: formData,
  });
}

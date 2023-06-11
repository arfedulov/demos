const formValidationDirective = {
  mounted(formElement, binding) {
    const rules = binding?.value?.rules || {};

    formElement.addEventListener("submit", onSubmit);
    formElement.addEventListener(
      "blur",
      (e) => renderControllValidity(e.target),
      true
    );
    formElement
      .querySelector("button")
      .addEventListener("click", (e) => validateForm(e.target.form));

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
          descriptionElement.dataset.infoDescription =
            descriptionElement.innerText;
        }

        descriptionElement.innerText = message;
        descriptionElement.classList.add("invalid");
        inputElement.classList.add("invalid");
      } else {
        if (descriptionElement) {
          // restore info description
          descriptionElement.innerText =
            descriptionElement.dataset?.infoDescription || "";
        }

        descriptionElement?.classList.remove("invalid");
        inputElement?.classList.remove("invalid");
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

      const formData = new FormData(event.target);
      // return fetch(event.target.action, {
      //   method: event.target.method,
      //   body: formData,
      // });
      alert('Ok');
    }
  },
};

export const formValidation = {
  install(app) {
    app.directive("formValidation", formValidationDirective);
  },
};

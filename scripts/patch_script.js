document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp.expand();
  
  const patchForm = document.getElementById("patchForm");
  const submitButton = document.getElementById("submitPatch");
  const targetingFields = ["gender", "age_from", "age_to", "location"];

  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", function () {
      const fieldName = this.dataset.field;
      const fieldType = this.dataset.type;
      const step = this.dataset.step || null;
      const options = this.dataset.options ? this.dataset.options.split(",") : null;
      const existingField = document.getElementById(`field_${fieldName}`);
      if (existingField) {
        patchForm.removeChild(existingField);
        this.textContent = "+";
        return;
      }
      
      const wrapper = document.createElement("div");
      wrapper.classList.add("added-field");
      wrapper.id = `field_${fieldName}`;
      
      const label = document.createElement("label");
      label.htmlFor = `input_${fieldName}`;
      label.innerText = getFieldLabel(fieldName);
      wrapper.appendChild(label);

      if (fieldType === "select" && options) {
        const selectElement = document.createElement("select");
        selectElement.id = `input_${fieldName}`;
        options.forEach(optionValue => {
          const option = document.createElement("option");
          option.value = optionValue;
          option.text = translateGender(optionValue);
          selectElement.appendChild(option);
        });
        wrapper.appendChild(selectElement);
      } else {
        const inputElement = document.createElement("input");
        inputElement.type = fieldType || "text";
        inputElement.id = `input_${fieldName}`;
        if (step) inputElement.step = step;
        if (!targetingFields.includes(fieldName)) inputElement.required = true;
        wrapper.appendChild(inputElement);
      }
      
      patchForm.appendChild(wrapper);
      this.textContent = "-";
    });
  });

  submitButton.addEventListener("click", () => {
    const formData = {};
    const missingFields = [];

    document.querySelectorAll(".added-field").forEach(wrapper => {
      const fieldName = wrapper.id.replace("field_", "");
      const inputElement = wrapper.querySelector("input, select");
      let value = inputElement.value.trim();
      const isTargeting = targetingFields.includes(fieldName);
      
      if (!isTargeting && value === "") {
        missingFields.push(getFieldLabel(fieldName));
      }
      
      if (value === "") value = null;
      
      if (isTargeting) {
        formData.targeting = formData.targeting || {};
        formData.targeting[fieldName] = value;
      } else {
        formData[fieldName] = value;
      }
    });

    if (missingFields.length > 0) {
      alert("Пожалуйста, заполните обязательные поля:\n" + missingFields.join(", "));
      return;
    }
    
    Telegram.WebApp.sendData(JSON.stringify(formData));
  });
  
    function getFieldLabel(field) {
      switch (field) {
        case "ad_title":
          return "Название кампании:";
        case "ad_text":
          return "Текст кампании:";
        case "impressions_limit":
          return "Лимит показов:";
        case "clicks_limit":
          return "Лимит кликов:";
        case "cost_per_impression":
          return "Цена за показ:";
        case "cost_per_click":
          return "Цена за клик:";
        case "start_date":
          return "Дата начала:";
        case "end_date":
          return "Дата конца:";
        case "gender":
          return "Пол:";
        case "age_from":
          return "Минимальный возраст:";
        case "age_to":
          return "Максимальный возраст:";
        case "location":
          return "Локация:";
        default:
          return "Поле:";
      }
    }
  
    function translateGender(val) {
      switch (val) {
        case "ALL":
          return "Все";
        case "MALE":
          return "Мужской";
        case "FEMALE":
          return "Женский";
        default:
          return val;
      }
    }
  });

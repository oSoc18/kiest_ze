{
  
    const handeSubmitForm = e => {
      const $form  = e.target;
      e.preventDefault();
      if(!$form.checkValidity()){
        Array.from($form.elements).forEach(validateField);
        $form.querySelector(`.error`).textContent = `Schrijf een boost`;
      }else{
        addBoost();
        clearForm($form);
      }
    };
    
    const clearForm = $form => {
      $form.querySelectorAll(`.input`).forEach($field => $field.value = ``);
    };
    
    const addBoost = () => {
      const boostData = getBoostData();
      const boostTekst = getBoostArticle(boostData);
      document.querySelector(`.boosts`).appendChild(boostTekst);
    };
    
    const getBoostData = () => {
      const boost = document.getElementById(`boost`).value;
      return {boost};
    };
    
    const getBoostArticle = boostData => {

    const $article = document.createElement(`article`);
    $article.innerHTML = `
    <div class="d-flex flex-row align-items-center border-boost mb-1 mt-4">
    <img src="static/assets/img/default_man.svg" alt="profielfoto" width="40" height="40" class="mr-2 mb-2">
    <p class="boost mr-2 mt-1">${boostData.boost}</p>
    </div>`

      return $article;
    };
    
    const handleBlurField = e => {
      validateField(e.currentTarget);  
    };
    
    const validateField = $field => {
      let message;
      if($field.validity.valueMissing){
        message = `Dit veld is verplicht`;
      }
      if($field.validity.typeMismatch){
        message = `Niet correct`;
      }
      if($field.validity.rangeOverflow){
        message = `Te groot`;
      }
      if(message){
        $field.parentElement.querySelector(`.error`).textContent = message;
      }
    };
    
    const handleInputField = e => {
      const $field = e.currentTarget;
      if($field.validity.valid){
        $field.parentElement.querySelector(`.error`).textContent = ``;
      }
    };
  
    const addValidationListeners = elements => {
      elements.forEach($element => {
        $element.addEventListener(`blur`, handleBlurField);
        $element.addEventListener(`input`, handleInputField);
      });
    };
  
    const init = () => {
      const $form = document.querySelector(`.form`);
      $form.noValidate = true;
      $form.addEventListener(`submit`, handeSubmitForm );
      addValidationListeners(Array.from($form.elements));
    };
  
    init();
  
  }
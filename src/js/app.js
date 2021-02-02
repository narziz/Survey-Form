function nextPage(nextBtn, backBtn, submitBtn){
  var currentElem, nextSibling, inputs, selects;

  currentElem = document.getElementsByClassName('active')[0];
  inputs = currentElem.getElementsByTagName('input');
  selects = currentElem.getElementsByTagName('select');
  nextSibling = currentElem.nextElementSibling;

  if (validate()) {

    Object.values(inputs).forEach((item, i) => {
      if (item.classList.contains('error')) {
        item.classList.remove('error');
      }
    });

    if (selects.length > 0 && selects[0].classList.contains('error')) {
      selects[0].classList.remove('error');
    }


    if(getComputedStyle(backBtn).visibility == 'hidden'){
      backBtn.style.setProperty('visibility', 'visible');
    }

    if(nextSibling.getAttribute('id') == 'page-6'){
      hideElem(nextBtn);
      showElem(submitBtn);
    }

    if(nextSibling != null && !nextSibling.classList.contains('buttons')){
      nextSibling.classList.add('active');
      currentElem.classList.remove('active');
    }

    changeStep(nextSibling);
    changeProgress();
  }
   else {

    Object.values(inputs).forEach((item, i) => {
      if (item.type == "text"){
        item.classList.add('error');
      } else if (item.type == "email") {
        item.classList.add('error');
      } else if (item.type == "number") {
        item.classList.add('error');
      }
    });

    if (selects.length > 0) {
      selects[0].classList.add('error');
    }

  }

}

function prevPage(nextBtn, backBtn, submitBtn){
  var elem, previousElem;
  elem = document.getElementsByClassName('active')[0];
  previousElem = elem.previousElementSibling;

  previousElem.classList.add('active');
  elem.classList.remove('active');

  if(!previousElem.previousElementSibling){
    backBtn.style.setProperty('visibility', 'hidden');
  }
  if (previousElem.getAttribute('id') != 'page-6') {
    hideElem(submitBtn);
    showElem(nextBtn);
  }

  changeStep(previousElem);
  changeProgress();
}

function showElem(elem){
  elem.style.setProperty('display', 'flex');
  elem.style.setProperty('justify-content', 'center');
}

function hideElem(elem){
  elem.style.setProperty('display', 'none');
}

function countSteps(){
  var steps, total;
  steps = document.getElementsByClassName('fieldset').length;
  total = document.getElementById('total');
  total.innerHTML = steps;
}

function changeStep(elem) {
  var id, currentStep;
  currentStep = document.getElementById('current');
  id = elem.getAttribute('id');
  currentStep.innerHTML = id.split('-')[1];
}

function changeProgress(){
  var progressBar, currentStep, totalStep, persentage;
  progressBar = document.getElementsByClassName('progress-bar')[0];
  currentStep = document.getElementById('current').innerHTML;
  totalStep = document.getElementById('total').innerHTML;
  persentage = (parseInt(currentStep) * 100) / parseInt(totalStep);
  progressBar.style.setProperty('width', persentage+'%');
}

function thankYouPage(){
  var elem, progress, active, buttons;
  elem = document.getElementsByClassName('thank-you-page')[0];
  progress = document.getElementsByClassName('progress-cont')[0];
  active = document.getElementsByClassName('active')[0];
  buttons = document.getElementsByClassName('buttons')[0];
  elem.style.setProperty('display', 'flex');
  hideElem(progress);
  hideElem(active);
  hideElem(buttons);
}

function validate(){
  var name, email, age, gender, roles, recommend, feature, rating, checkboxes, improve = [];
  var nameErr = true, emailErr = true, ageErr = true, genderErr = true,
      roleErr = true, recommendErr = true, featureErr = true, ratingErr = true,
      improveErr = true;
  var currentElem, page;

  // get elements to validate
  name = document.survey.name.value;  //text
  email = document.survey.email.value; //text
  age = document.survey.age.value;  //number
  gender = document.survey.gender.value;  //radio
  roles = document.survey.roles.value;   //select
  recommend = document.survey.recommend.value;   //radio
  feature = document.survey.feature.value;   //select
  rating = document.survey.rating.value;   //radio
  checkboxes = document.getElementsByName('checkboxGroup[]') ;   //checkbox

  // get page number
  currentElem = document.getElementsByClassName('active')[0];
  page = currentElem.getAttribute('id').split('-')[1];

  // does any checkboxes checked?
  Object.values(checkboxes).forEach((item, i) => {
    if (item.checked == true) {
      improve.push(item);
    }
  });

  if (page == "1") {
    // validate name
    if(name == ""){
      printError('nameErr', 'Please, enter your name');
    } else {
      printError("nameErr", "");
      nameErr = false;
    };

    // validate email
    if (email == "") {
      printError('emailErr', 'Please, enter your email');
    } else {
      printError('emailErr', '');
      emailErr = false;
    };

    if ((nameErr || emailErr) == true) {
      return false
    }

  } else if (page == "2") {
    // validate age
    if (age == "") {
      printError('ageErr', 'Please, enter your age');
    } else {
      printError('ageErr', '');
      ageErr = false;
    }

    // validate gender
    if (gender == "") {
      printError('genderErr', 'Please, select your gender');
    } else {
      printError('genderErr', '');
      genderErr = false;
    }

    if ((ageErr || genderErr) == true) {
      return false
    }

  } else if (page == "3") {
    // validate roles
    if (roles == "") {
      printError('roleErr', 'Please, select your role');
    } else {
      printError('roleErr', '');
      roleErr = false
    }

    // validate recommend
    if (recommend == "") {
      printError('recommendErr', 'Please, make choise');
    } else {
      printError('recommendErr', '');
      recommendErr = false;
    }

    if ((roleErr || recommendErr) == true) {
      return false
    }

  } else if (page == "4") {
    // validate feature
    if (feature == "") {
      printError('featureErr', 'Please, select your favorite feature');
    } else {
      printError('featureErr', '');
      featureErr = false;
    }

    // validate
    if (rating == "") {
      printError('ratingErr', 'Please, give rating');
    } else {
      printError('ratingErr', '');
      ratingErr = false;
    }

    if ((featureErr || ratingErr) == true) {
      return false
    }

  } else if (page == "5") {
    // validate checkboxes
    if (improve.length == 0) {
      printError('improveErr', 'Please, check some features');
    } else {
      printError('improveErr', '');
      improveErr = false
    }

    if (improveErr == true) {
        return false
    }
  }

  return true
};

function printError(elemId, msj){
  document.getElementById(elemId).innerHTML = msj;
};


export default{
  nextPage: nextPage,
  prevPage: prevPage,
  showElem: showElem,
  hideElem: hideElem,
  countSteps: countSteps,
  changeStep: changeStep,
  changeProgress: changeProgress,
  thankYouPage: thankYouPage,
  validate: validate
};

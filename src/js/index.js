import app from "./app";
import $ from 'jquery';
import '../scss/style.scss';

const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const submitBtn = document.getElementById('submit');


window.onload = function(){
  app.countSteps();
  app.changeProgress();
}
nextBtn.addEventListener('click', function(){
  app.nextPage(nextBtn, backBtn, submitBtn);
});
backBtn.addEventListener('click', function(){
  app.prevPage(nextBtn, backBtn, submitBtn);
});
submitBtn.addEventListener('click', function(){
  app.thankYouPage();
});

$(document).on("change","select",function(){
  $("option[value=" + this.value + "]", this)
  .attr("selected", true).siblings()
  .removeAttr("selected")
});

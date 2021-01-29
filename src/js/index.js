import {component} from "./app";
import '../scss/style.scss';

window.onload = function() {
  document.getElementById("body").appendChild(component());
}

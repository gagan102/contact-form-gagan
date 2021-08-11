// 'use strict';
// firebase script(above enerything else)

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAx69PQZLl3mGaEt33-xUuu2tIj9hR1_mg",
  authDomain: "sgh-form.firebaseapp.com",
  projectId: "sgh-form",
  storageBucket: "sgh-form.appspot.com",
  messagingSenderId: "201981861158",
  appId: "1:201981861158:web:fd45a2a73e2a2fc259b5e7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference contactInfo collections
let contactInfo = firebase.database().ref("infos");



// form connection with FIREBASE
// listen for a submit
document.querySelector(".callback-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // get input values
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let subject = document.querySelector("#subject").value;
  let message = document.querySelector("#message").value;
  // console.log(name, email, subject, message);
  saveContactInfo(name, email, subject, message);

  document.querySelector(".callback-form").reset();
}

// save Infos to firebase
function saveContactInfo(name, email, subject, message) {
  let newContactInfo = contactInfo.push();

  // left side variable names can be any
  newContactInfo.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });

  retreiveInfos();
}

// Retreive Infos
function retreiveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);

}

function gotData(data) {
  // console.log("mehar");
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let subject = info[infoData].subject;
    let message = info[infoData].message;
    console.log(name, email, subject, message);
  }
}


// ##################################
// for css hover effects
const items = document.querySelectorAll('.icons li');
const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);

// window.addEventListener('load', () => {
//   AOS.init({
//     duration: 1000,
//     easing: 'ease-in-out',
//     once: true,
//     mirror: false,
//   })
// });

// ##########################
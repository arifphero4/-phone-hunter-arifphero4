const setSpinner = (spinnerValue) => {
  document.getElementById("load-spinner").style.display = spinnerValue;
};
// search button function create
const searchItem = () => {
  const inputFieldItem = document.getElementById("input-text");
  showField = inputFieldItem.value.toLowerCase();
  // call to spinner
  setSpinner("block");
  // console.log(showField);
  const url = `https://openapi.programming-hero.com/api/phones?search=${showField}`;
  // clear input field
  inputFieldItem.value = "";
  // call the api
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResult(data.data));
};
// displayReault function call for show result
const displayResult = (phone) => {
  // console.log(phone)
  const displayResultDiv = document.getElementById("displayDiv");
  displayResultDiv.innerHTML = "";
  const hTag = document.getElementById("result-massage");
  hTag.innerText = "";
  if (phone.length != 0) {
    // console.log(phone.length);
    phone.slice(1, 21).forEach(
      (show = (phone) => {
        // console.log(phone)
        // create div for showing result
        const phoneDetailsDiv = document.createElement("div");
        // set result dynamic
        phoneDetailsDiv.innerHTML = `
                 <div class="card">
                 <img src="${phone.image}" class="card-img-top p-2 m-auto img-fluid w-25" alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <h6> Brand: ${phone.brand}</h6>
                 <button onclick="showDetails('${phone.slug}')" class="bg-secondary btn btn-dark" >About Phone </button>
                </div>
                </div>`;
        // console.log(phone.slug);
        //    append the div into main div
        displayResultDiv.appendChild(phoneDetailsDiv);
      })
    );
    setSpinner("none");
  } else {
    hTag.innerText = "NO RESULT FOUND!";
    setSpinner("none");
  }
};
// detail result show
const showDetails = (detailsById) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${detailsById}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMoreInformation(data.data));
};
const displayMoreInformation = (detailsInformation) => {
  // console.log(detailsInformation);
  const detailsShowDiv = document.getElementById("details-show");
  const detailsInformationShow = document.createElement("div");
  detailsShowDiv.innerHTML = "";
  detailsInformationShow.innerHTML = `
    <div class="card mx-auto " style="width: 20rem;">
    <img src="${
      detailsInformation.image
    }" class="card-img-top img-fluid w-25 m-auto" alt="...">
    <div class="card-body">
      <h5 class="card-title">${detailsInformation.name}</h5>
      <p><b>releaseDate:</b>${
        detailsInformation.releaseDate
          ? detailsInformation.releaseDate
          : "not found"
      }</p>
      <p><b>storage:</b>${detailsInformation.mainFeatures.storage}</p>
      <p><b>DisplaySize:</b>${detailsInformation.mainFeatures.displaySize}</p>
      <p><b>chipSet:</b>${detailsInformation.mainFeatures.chipSet}</p>
      <p><b>memory:</b>${detailsInformation.mainFeatures.memory}</p>
      <p><b>sensor:</b>${detailsInformation.mainFeatures.sensors.slice(
        0,
        12
      )}</p>
      <p><b>others:</b></p>
      <p><b>Bluetooth:</b>${
        detailsInformation.others.Bluetooth
          ? detailsInformation.others.Bluetooth
          : "not supportted"
      }</p>
      <p><b>GPS:</b>${detailsInformation.others.GPS}</P>
      <p><b>Radio:</b>${detailsInformation.others.Radio}</p>
      <p><b>WALAN:</b>${detailsInformation.others.WLAN}</p>
       </div>
  </div>`;
  detailsShowDiv.appendChild(detailsInformationShow);
};
document.getElementById("clear-result").addEventListener(
  "click",
  (clearFunction = () => {
    const div = document.getElementById("details-show");
    div.innerHTML = "";
  })
);

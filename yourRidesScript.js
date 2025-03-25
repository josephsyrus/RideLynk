const hostedRides = document.getElementById('hostedRides');
const joinedRides = document.getElementById('joinedRides');
const hostedButton= document.getElementById('hostedButton');
const joinedButton= document.getElementById('joinedButton');

joinedRides.style.display="none";
hostedButton.style.backgroundColor="lightPink";
joinedButton.style.backgroundColor="lightGray"


hostedButton.addEventListener("click", function(){
    hostedButton.style.backgroundColor="lightPink";
    joinedButton.style.backgroundColor="lightGray";
    hostedRides.style.display="block";
    joinedRides.style.display="none";
})

joinedButton.addEventListener("click", function(){
    joinedButton.style.backgroundColor="lightPink";
    hostedButton.style.backgroundColor="lightGray";
    hostedRides.style.display="none";
    joinedRides.style.display="block";
})

const profileIcon = document.getElementById("profile-icon");
const profileDropdown = document.getElementById("profile-dropdown");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const logoutBtn = document.getElementById("logout-btn");

const userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
  profileName.textContent = userData.name;
  profileEmail.textContent = userData.email || "No email provided";
} else {
  usergreetEl.textContent = "Welcome Guest!";
  profileName.textContent = "Guest";
  profileEmail.textContent = "Not logged in";
}

profileIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
  console.log("Profile icon clicked, dropdown toggled");
});

document.addEventListener("click", function (e) {
  if (
    profileDropdown.classList.contains("active") &&
    e.target !== profileIcon
  ) {
    profileDropdown.classList.remove("active");
  }
});

profileDropdown.addEventListener("click", function (e) {
  e.stopPropagation();
});

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("user");
  alert("You have been logged out!");
  window.location.href="index.html";
});
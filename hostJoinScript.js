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

const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", function() {
    this.classList.toggle("active");
    handleToggle(this.classList.contains("active"));
});

const hostInfo= document.getElementById('hostInfo');
const joinInfo=document.getElementById('joinInfo');

joinInfo.style.display="none";

function handleToggle(state) {
    if (state) {
        console.log("Toggle is ON");
        hostInfo.style.display="none";
        joinInfo.style.display="block";
    } else {
        console.log("Toggle is OFF");
        hostInfo.style.display="block";
        joinInfo.style.display="none";
    }
}


hostInfo.addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
        const usernameInput = document.createElement('input');
        usernameInput.type = 'hidden';
        usernameInput.name = 'username';
        usernameInput.value = userData.name;
        hostInfo.appendChild(usernameInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'hidden';
        emailInput.name = 'email';
        emailInput.value = userData.email;
        hostInfo.appendChild(emailInput);
    }


    hostInfo.submit();
});



document.getElementById("joinInfo").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const pickupLocation = document.querySelector("#joinInfo select[name='pickup_location_join']").value;
  const destination = document.querySelector("#joinInfo select[name='destination_location_join']").value;
  const date = document.querySelector("#joinInfo input[name='date_join']").value;

  if (!pickupLocation || !destination || !date) {
      alert("Please fill in all fields.");
      return;
  }

  const searchData = {
      pickup_location_join: pickupLocation,
      destination_location_join: destination,
      date_join: date
  };

  localStorage.setItem("searchData", JSON.stringify(searchData));

  window.location.href = "viewRides.html";
});


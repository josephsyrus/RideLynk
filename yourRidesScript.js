const hostedRides = document.getElementById('hostedRides');

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

const userEmail=userData.email;

async function fetchHostedRides() {
  if (!userData || !userData.email) {
      hostedRides.innerHTML = "<p>You are not logged in.</p>";
      return;
  }

  try {
      const response = await fetch(`/getHostedRides?email=${encodeURIComponent(userData.email)}`);
      const data = await response.json();


      if (data.error) {
          hostedRides.innerHTML += `<p>${data.error}</p>`;
          return;
      }

      if (data.length === 0) {
          hostedRides.innerHTML += "<p>No rides found.</p>";
      } else {
          data.forEach(ride => {
              const rideDiv = document.createElement("div");
              rideDiv.classList.add("ride-card");

              rideDiv.innerHTML = `
                  <p><strong>From:</strong> ${ride.pickup_location_host}</p>
                  <p><strong>To:</strong> ${ride.destination_location_host}</p>
                  <p><strong>Date:</strong> ${new Date(ride.date_host).toLocaleDateString()}</p>
                  <p><strong>Pickup Time:</strong> ${ride.pickup_time_host}</p>
                  <p><strong>Vehicle Type:</strong> ${ride.vehicle_type_host}</p>
                  <p><strong>Passenger Count:</strong> ${ride.passenger_count_host}</p>
                  <p><strong>Price Per Passenger:</strong> ₹${ride.price_per_passenger}</p>
              `;

              hostedRides.appendChild(rideDiv);
          });
      }
  } catch (error) {
      console.error("Error fetching rides:", error);
      hostedRides.innerHTML = "<p>Failed to load rides.</p>";
  }
}
fetchHostedRides();








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
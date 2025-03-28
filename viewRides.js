document.addEventListener("DOMContentLoaded", async () => {
    const rideList = document.getElementById("rideList");

    try {
        const userSearchData = JSON.parse(localStorage.getItem("searchData"));
            if (!userSearchData) {
            rideList.innerHTML = "<p>Please enter search criteria.</p>";
            return;
            }

const queryString = new URLSearchParams(userSearchData).toString();
const response = await fetch(`/getRides?${queryString}`);
        const rides = await response.json();

        if (rides.length === 0) {
            rideList.innerHTML = "<p>No available rides at the moment.</p>";
            return;
        }

        rideList.innerHTML = ""; 
        rides.forEach((ride) => {
            const rideDiv = document.createElement("div");
            rideDiv.classList.add("ride-item");
            rideDiv.innerHTML = `
                <div class="info-parent-div">
                <div class="info-div">
                <h3>${ride.pickup_location_host} → ${ride.destination_location_host}</h3>
                <p><strong>Date:</strong> ${new Date(ride.date_host).toDateString()}</p>
                <p><strong>Time:</strong> ${ride.pickup_time_host}</p>
                <p><strong>Vehicle:</strong> ${ride.vehicle_type_host}</p>
                <p><strong>Seats:</strong> ${ride.passenger_count_host}</p>
                <p><strong>Price per Passenger:</strong> ₹${ride.price_per_passenger}</p>
                <p><strong>Name:</strong> ${ride.username}</p>
                <p><strong>Email:</strong>. ${ride.email}</p>
                </div>

                <div class="button-div">
                <button class="join-btn" data-email="${ride.email}">Join Ride</button>
                </div>
                </div>
            `;

            rideList.appendChild(rideDiv);
        });

        document.querySelectorAll(".join-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const email=event.target.dataset.email;
                const subject=encodeURIComponent("Cab Sharing Request");
                const body=encodeURIComponent("Hey! I want to share this cab with you.");
                window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;
            });
        });

    } catch (error) {
        console.error("Error fetching rides:", error);
        rideList.innerHTML = "<p>Error loading rides.</p>";
    }
});

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

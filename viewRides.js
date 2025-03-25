document.addEventListener("DOMContentLoaded", async () => {
    const rideList = document.getElementById("rideList");

    try {
        const response = await fetch("/getRides");
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


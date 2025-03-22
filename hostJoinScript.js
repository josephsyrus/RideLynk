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

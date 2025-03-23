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
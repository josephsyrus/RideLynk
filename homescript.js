const usergreetEl=document.getElementById("greetMsg");
const userData=JSON.parse(localStorage.getItem("user"));

if(userData){
    usergreetEl.innerHTML=`<h1> Welcome ${userData.name} </h1>`;
}
else{
    usergreetEl.textContent="Welcome Guest!";
}
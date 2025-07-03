
const popUp = document.getElementById("popUpID");
const newBookBtn = document.getElementById("newBookbtn");
const submitBtn = document.getElementById("submitID");
const closeBtn = document.getElementById("close");


newBookBtn.onclick = function (){
    popUp.style.display = "block";
}

submitBtn.onclick = function (){
    popUp.style.display = "none";
}

window.onclick = function(event){
    if (event.target == popUp){
        popUp.style.display = "none";
    }
}

closeBtn.onclick = function(){
    popUp.style.display = "none";
}

//When pressing Submit a new Book object will be created with its ID. crypto.randomUUID()
//The new object will be placed in the Library array
//A loop that would update the table will run

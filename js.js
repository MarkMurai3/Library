
const popUp = document.getElementById("popUpID");
const newBookBtn = document.getElementById("newBookbtn");
const submitBtn = document.getElementById("submitID");
const closeBtn = document.getElementById("close");
const form = document.getElementById("bookForm");
const log = document.getElementById("log");
const table = document.querySelector("tbody");


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

const myLibrary = [];

form.addEventListener("submit", function (e){
    e.preventDefault();
    addBookToLibrary();

});


function Book(title, author, pages, read, id){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

Book.prototype.toggle = function(){
    if (this.read == "Yes") {
        this.read = "No";
    } else if (this.read == "No") {
        this.read = "Yes";
    }
    updateTable();
    console.log("Toggle has been done");
} 

function addBookToLibrary(){
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var read = document.querySelector('input[name="read"]:checked').value;
    const id = crypto.randomUUID();

    const newBook = new Book(title, author, pages, read, id);

    //So the problem for the toggle is that when this gets sent to the array 
    //the name assigned here is nowhere to be found in the library. It is shown as
    //[Book]. 

    //For the delete button if we combine the id and the data attribute somehow
    //then we can cook something

    //Also change HOWTHEFUCKDOIDOTHIS back lol

    // myLibrary[0].toggle()
    //THIS WORKED! in the console at least

    myLibrary.push(newBook);
    updateTable();
    var title = document.getElementById("title").value = "";
    var author = document.getElementById("author").value = "";
    var pages = document.getElementById("pages").value = "";
    var read = document.querySelector('input[name="read"]').checked = false;
    // console.log(newBook);
    // console.log(newBook.prototype);
    // newBook.toggle();
}


function updateTable(){
    deleteTable();
    for (const book of myLibrary){
        // console.log(book.title);

        const tr = document.createElement("tr");
        table.appendChild(tr);

        for(let i = 0;i <= 4; i++){
            const td = document.createElement("td");
            let textNode = "";
            switch(i){
                case 0:
                    textNode = document.createTextNode(book.title);
                    td.appendChild(textNode);
                    break;
                case 1:
                    textNode = document.createTextNode(book.author);
                    td.appendChild(textNode);
                    break;
                case 2: 
                    textNode = document.createTextNode(book.pages);
                    td.appendChild(textNode);
                    break;
                case 3:
                    textNode = document.createTextNode(book.read);
                    const toggleRead = document.createElement("button");
                    const toggleText = document.createTextNode("Toggle");
                    toggleRead.className = "read";
                    toggleRead.id = "readID";
                    toggleRead.appendChild(toggleText);
                    // toggleRead.prototype

                    td.appendChild(textNode);
                    td.appendChild(toggleRead);
                    toggleRead.onclick = () =>{
                        book.toggle();
                    }
                    break;
                case 4:
                    textNode = document.createTextNode("Delete");
                    const deleteBtn = document.createElement("button");
                    const btnTextNode = document.createTextNode("Delete");
                    deleteBtn.className = "delete";
                    deleteBtn.appendChild(btnTextNode);
                    td.appendChild(deleteBtn);
                    break;
                default:
                    console.log("Something went wrong with the switch statement");
                    break;
            }
            tr.appendChild(td);
        }
    }
}

function deleteTable(){
    while (table.hasChildNodes()){
        table.removeChild(table.lastChild);
    }
}



//TEST 
let testToggleID = document.getElementById("readID");
let testToggle = document.getElementsByClassName("read");
// testToggle.onclick = (e) => {
//     console.log("cjecne");
// }
// testToggle.addEventListener("click", (e) => {
//     console.log("rvejkn");
// }





// const toggleRead = document.getElementsByClassName("read");
// toggleRead.onclick = 

// We should make sure that the Submit button doesn't function unless all the inputs have been answered

// element.deleteRow(n) for the delete button

//When pressing Submit a new Book object will be created with its ID. crypto.randomUUID()
//The new object will be placed in the Library array
//A loop that would update the table will run

//For when the submit input tries to send the data to a server use event.preventDefault();
//Add a delete button for each book. Give them data-attribute that corresponds to the unique id of the respective book
//To change its read status create a Book prototype function that toggles it
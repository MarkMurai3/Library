
const popUp = document.getElementById("popUpID");
const newBookBtn = document.getElementById("newBookbtn");
const submitBtn = document.getElementById("submitID");
const closeBtn = document.getElementById("close");
const form = document.getElementById("bookForm");
const log = document.getElementById("log");
const table = document.querySelector("tbody");
const radioButtons = document.getElementById("radioButtons");


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
} 

function addBookToLibrary(){
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var read = document.querySelector('input[name="read"]:checked').value;
    const id = crypto.randomUUID();

    const newBook = new Book(title, author, pages, read, id);

    myLibrary.push(newBook);
    updateTable();
    var title = document.getElementById("title").value = "";
    var author = document.getElementById("author").value = "";
    var pages = document.getElementById("pages").value = "";
    var readNo = document.querySelector('input[id="no"]').checked = false;
    var readYes = document.querySelector('input[id="yes"]').checked = false;
}


function updateTable(){
    deleteTable();
    for (const book of myLibrary){

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
                    const a = document.createAttribute("data-id");
                    a.value = book.id;
                    
                    deleteBtn.setAttributeNode(a);
                    deleteBtn.onclick = () =>{
                        if(a.value == book.id){
                            findAndDeleteObject(a.value);
                            updateTable();
                        }
                    }

                    break;
                default:
                    console.log("Something went wrong with the switch statement");
                    break;
            }
            tr.appendChild(td);
        }
    }
}

function findAndDeleteObject(e){
    for(let i=0;i < myLibrary.length; i++){
        if (myLibrary[i].id == e){
            myLibrary.splice(i,1);
        }
    }
    
}

function deleteTable(){
    while (table.hasChildNodes()){
        table.removeChild(table.lastChild);
    }
}

// We should make sure that the Submit button doesn't function unless all the inputs have been answered
// The "No" radio button stays active after pressing Submit
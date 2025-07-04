
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

// We should make sure that the Submit button doesn't function unless all the inputs have been answered

form.addEventListener("submit", function (e){
    e.preventDefault();
    addBookToLibrary();

});

Book.prototype.toggle = function(){
    if (this.read == "Yes") {
        this.read = "No";
    } else if (this.read == "No") {
        this.read = "Yes";
    }
    console.log("Toggle has been done");
} //It works fine on the console if I make a new object there and apply the toggle prototype there.
//But here it isn't working and idk why. Maybe the ID would help
//Maybe this is where the data-attribute comes to play but that's for the delete option

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


function addBookToLibrary(){
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var read = document.querySelector('input[name="read"]:checked').value;
    const id = crypto.randomUUID();

    let newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);
    updateTable();
    var title = document.getElementById("title").value = "";
    var author = document.getElementById("author").value = "";
    var pages = document.getElementById("pages").value = "";
    var read = document.querySelector('input[name="read"]').checked = false;
}


function updateTable(){
    deleteTable();
    for (const book of myLibrary){
        console.log(book.title);

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
                    
                    td.appendChild(textNode);
                    break;
                case 4:
                    textNode = document.createTextNode("Delete");
                    td.appendChild(textNode);
                    break;
                default:
                    console.log("Something went wrong with the switch statement");
                    break;
            }
            tr.appendChild(td);
        }

        // const td = document.createElement("td");
        // tr.appendChild(td);
    }
}

function deleteTable(){
    while (table.hasChildNodes()){
        table.removeChild(table.lastChild);
    }
}

// element.deleteRow(n) for the delete button

//When pressing Submit a new Book object will be created with its ID. crypto.randomUUID()
//The new object will be placed in the Library array
//A loop that would update the table will run

//For when the submit input tries to send the data to a server use event.preventDefault();
//Add a delete button for each book. Give them data-attribute that corresponds to the unique id of the respective book
//To change its read status create a Book prototype function that toggles it
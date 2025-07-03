
const popUp = document.getElementById("popUpID");
const newBookBtn = document.getElementById("newBookbtn");
const submitBtn = document.getElementById("submitID");
const closeBtn = document.getElementById("close");
const form = document.getElementById("bookForm");
const log = document.getElementById("log");

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

function saveData(){
    const params = []
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var read = document.querySelector('input[name="read"]:checked').value;
    params.push(title, author, pages, read);

    // console.log(params);
    return params;
}


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
    const title = saveData()[0];
    const author = saveData()[1];
    const pages = saveData()[2];
    const read = saveData()[3];
    const id = crypto.randomUUID();

    let newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);
    updateTable();
}

function updateTable(){
    //Update the table
}

//When pressing Submit a new Book object will be created with its ID. crypto.randomUUID()
//The new object will be placed in the Library array
//A loop that would update the table will run

//For when the submit input tries to send the data to a server use event.preventDefault();
//Add a delete button for each book. Give them data-attribute that corresponds to the unique id of the respective book
//To change its read status create a Book prototype function that toggles it
const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const mainBody = document.querySelector('.main-body');
  mainBody.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const pagesReadDiv = document.createElement('div');
    pagesReadDiv.classList.add('pages-read');

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = `${book.pages} pages`;

    const titleAuthorDiv = document.createElement('div');
    titleAuthorDiv.classList.add('title-author');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;

    const readIcon = document.createElement('img');
    readIcon.classList.add('read-icon');
    readIcon.src = book.read ? '/library/images/read.svg' : '/library/images/alpha-x-box-outline.svg';
    readIcon.alt = book.read ? 'Read' : 'Unread';
    readIcon.onclick = () => {
      toggleReadStatus(index);
    };

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove Book';
    removeButton.onclick = () => {
      removeBook(index);
    };

    titleAuthorDiv.appendChild(title);
    titleAuthorDiv.appendChild(author);
    titleAuthorDiv.appendChild(removeButton);

    pagesReadDiv.appendChild(readIcon);
    pagesReadDiv.appendChild(pages);

    infoDiv.appendChild(pagesReadDiv);
    infoDiv.appendChild(titleAuthorDiv);

    bookDiv.appendChild(infoDiv);

    mainBody.appendChild(bookDiv);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.querySelector('.new-book-btn').addEventListener('click', () => {
  document.getElementById('form-container').classList.toggle('hidden');
});

document.getElementById('new-book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  document.getElementById('new-book-form').reset();
  document.getElementById('form-container').classList.add('hidden');
});

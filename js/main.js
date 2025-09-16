document.addEventListener('DOMContentLoaded', function() {
  let debounceTimeout = null;

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => getBook(e.target.value.trim()), 1500);
  });
});

function getBook(title) {
  if (!title) return;
  onBeforeSend();
  fetchBookFromApi(title);
}

async function fetchBookFromApi(title) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`);

    if (!response.ok) throw new Error('Invalid Response');

    const data = await response.json();
    handleResponse(data);
  } catch (error) {
    console.error("Error: " + error);
    onApiError();
  }
}

function handleResponse(data) {
  hideComponent("#LoadingGIF");
  hideComponent("#BookInfo");
  hideComponent("#BookImage");
  hideComponent("#NotFound");

  if (data.totalItems > 0) {
    renderBook(data.items[0]);
  } else {
    showComponent("#NotFound");
  }
}

function onBeforeSend() {
  showComponent("#LoadingGIF");
  hideComponent("#NotFound");
  hideComponent("#Error");
  hideComponent("#BookInfo");
  hideComponent("#BookImage");
}

function onApiError() {
  hideComponent("#LoadingGIF");
  showComponent("#Error");
  hideComponent("#BookInfo");
  hideComponent("#BookImage");
}

function showComponent(selector) {
  const element = document.querySelector(selector);
  if (element) element.hidden = false;
}

function hideComponent(selector) {
  const element = document.querySelector(selector);
  if (element) element.hidden = true;
}

function renderBook(item) {
  const volumeInfo = item.volumeInfo;

  const bookLink = document.getElementById("bookLink");
  bookLink.href = volumeInfo.previewLink || volumeInfo.infoLink || "#";
  bookLink.target = "_blank";

  document.getElementById("BookTitle").textContent = volumeInfo.title || "No Title";
  document.getElementById("BookAuthor").textContent = (volumeInfo.authors || []).join(", ") || "Unknown Author";
  document.getElementById("DatePublished").textContent = volumeInfo.publishedDate || "Unknown Date";
  document.getElementById("BookDescription").textContent = volumeInfo.description || "No Description Available";

  const bookCover = document.getElementById("BookImage");
  bookCover.src = volumeInfo.imageLinks?.thumbnail || "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg";
  bookCover.alt = volumeInfo.title || "No Image Available";

  bookCover.hidden = false;
  document.getElementById("BookInfo").hidden = false;
}

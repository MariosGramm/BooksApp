document.addEventListener('DOMContentLoaded',function() {
  let debounceTimeout = null ;

  const searchInput = document.getElementById("searchInput")
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => getBook(this.value.trim(),1500))
  })
})

function getBook(title){
  if (!title) return;

  onBeforeSend();
  fetchBookFromApi(title);
}

async function fetchBookFromApi(title) {
  try{
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle=${title}`)

    if (!response.ok){
      throw new Error('Invalid Response')
    }else {
      const data = await response.json()
      handleResponse(data)
    }
  }catch (error) {
    console.error("Error: " + error)
    onApiError()
  }
}

function handleResponse(data) {
  if (data.totalItems > 0 ){
    hideComponent("#LoadingGIF")
    render(data)
  }else {
    hideComponent("#LoadingGIF")
    showComponent("#NotFound")
  }
}

function onBeforeSend() {
  showComponent("#LoadingGIF")
  hideComponent("#NotFound")
  hideComponent("#Error")
}

function onApiError(){
  showComponent("#Error")
  showComponent("#NotFound")
}

function showComponent(component){
  const element = document.querySelector(component)
  if (element) element.classList.remove("hidden")
}

function hideComponent(component){
  const element = document.querySelector(component)
  if (element) element.classList.add("hidden")
}

function render(data) {
  const bookLink = document.getElementById("bookLink")
  bookLink.href = `https://www.google.gr/books/edition/${data.title}/${data.id}?hl=${data.language}&gbpv=1`

  document.getElementById("BookTitle").textContent = data.items[0].volumeInfo.title
  document.getElementById("BookAuthor").textContent = data.items[0].volumeInfo.authors
  document.getElementById("DatePublished").textContent = data.items[0].volumeInfo.publishedDate
  document.getElementById("BookDescription").textContent = data.items[0].volumeInfo.description
  
  const bookCover = document.getElementById("BookImage")
  bookCover.src = data.items[0].volumeInfo.imageLinks.thumbnail
  bookCover.alt = data.items[0].volumeInfo.title
}


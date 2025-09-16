document.addEventListener('DOMContentLoaded',() => {
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
      const data = response.json()
      handleReponse(data)
    }
  }catch (error) {
    console.error("Error: " + error)
    onApiError()
  }
}

function handleReponse() {

}

function onBeforeSend() {
  showComponent("LoadingGIF")
  hideComponent("NotFound")
  hideComponent("Error")
}


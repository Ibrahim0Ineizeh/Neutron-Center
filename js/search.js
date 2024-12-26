let Products = [];

//fetch data about the products from the json file 
fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        // Data contains the parsed JSON object (an array of products)
        Products = data;
        //when the web page loads show the data 
    })

let search = function () {
    event.stopPropagation();
    let sug = '';

    let searchTerm = document.getElementById('searchInput').value;

    let suggestionsContainer = document.getElementById('suggestions_container');
    suggestionsContainer.style.display = 'block';

    if (searchTerm != '') {
        for (i = 0; i < Products.length; i++) {
            if (Products[i].name.toLowerCase().includes(searchTerm)) {
                sug += `<a href="product_page.html" class="search-elements" onclick="ShowProPage(event, this, ${i})">
            <img src="${Products[i].image}"  width="30px" alt="">
            <h5>${Products[i].name}</h5>
          </a>`;
            }
        }
    }

    document.getElementById("suggestions_container").innerHTML = sug;
}

let ShowProPage = function (event, target, index) {
    event.stopPropagation();
    localStorage.setItem("product", JSON.stringify(Products[index]));
  }
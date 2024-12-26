
let Product = JSON.parse(localStorage.product);

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

let cartProducts = [];
if (localStorage.cart != null) {
    cartProducts = JSON.parse(localStorage.cart);
}
else {
    cartProducts = [];
}

//A function to show the the item
let showProduct = function () {
    let prodcutInfo = '';

    prodcutInfo += `
    <div class="col-md-6">
        <img src="${Product.image}" class="img-fluid" alt="Product Image">
        </div>
        <div class="col-md-6">
            <h2>${Product.name}</h2>
            <p class="lead">Price: $${Product.price}</p>
            <p>Description:</p>
            <p>${Product.ldiscreption}</p>

            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" class="form-control" id="quantity" value="1" min="1">
            </div>
        <button class="btn check" onclick="addCart(event, this)">Add to Cart</button>
    </div>
    `;

    //add the code of the product to the html code base
    document.getElementById("productItem").innerHTML = prodcutInfo;
}
showProduct();

let addCart = function (event, target) {
    event.stopPropagation();

    let i;
    for (i = 0; i < cartProducts.length; i++) {
        if (Product.name === cartProducts[i].name) {
            let q = document.getElementById("quantity").value;
            cartProducts[i].quantity += parseInt(q);
            break;
        }
    }
    if ((i) == cartProducts.length) {
        cartProducts.unshift(Product);
        let q = document.getElementById("quantity").value;
        cartProducts[0].quantity = parseInt(q);
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
}

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
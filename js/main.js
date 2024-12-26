
//an arraay to save in the products and their information
//check the local storage for products
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
    showProd();
  })

//an array to save in the products in the cart that the user added
//check for products in the cart in the local storage
let cartProducts = [];
if (localStorage.cart != null) {
  cartProducts = JSON.parse(localStorage.cart);
}
else {
  cartProducts = [];
}

//A function to add the products to the page 
let showProd = function () {
  let productkDiv = '';

  //loop theough the array for each product and display
  for (let i = 0; i < 6; i++) {
    let rating = '';

    //add rating for the product 
    let temp = Products[i].rating;
    let k;
    for (k = 0; k < temp; k++) {
      rating += `<i class="fa fa-star" aria-hidden="true"></i>`;
    }
    for (let j = 0; j < 5 - (k); j++) {
      rating += `<i class="fa fa-star transparent-star" aria-hidden="true"></i>`;
    }


    productkDiv += `
        <div class="col-sm-6 col-lg-4">
          <div class="box">
            <div class="img-box">
              <img src="${Products[i].image}" alt="">
              <a class="add_cart_btn" onclick="addCart(event, this, ${i})">
                <span>
                  Add to Cart
                </span>
              </a>
              <a href="product_page.html" class="add_cart_btn2" onclick="ShowProPage(event, this, ${i})">
                <span>
                  View
                </span>
              </a>
            </div>
            <div class="detail-box">
              <h5>
                ${Products[i].name}
              </h5>
              <div class="product_info">
                <h5>
                  <span>$</span> ${Products[i].price}
                </h5>
                <div class="star_container">
                    ${rating}
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  //add the code of the product to the html code base
  document.getElementById("productList").innerHTML = productkDiv;
}

let addCart = function (event, target, index) {
  event.stopPropagation();

  let i;
  for (i = 0; i < cartProducts.length; i++) {
    if (Products[index].name === cartProducts[i].name) {
      cartProducts[i].quantity += 1;
      break;
    }
  }
  if ((i) == cartProducts.length) {
    cartProducts.unshift(Products[index]);
    cartProducts[0].quantity = 1;
  }
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

let ShowProPage = function (event, target, index) {
  event.stopPropagation();
  localStorage.setItem("product", JSON.stringify(Products[index]));
}

let showProHeader = function (event, target) {
  event.stopPropagation();
  localStorage.setItem("product", JSON.stringify(Products[0]));
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
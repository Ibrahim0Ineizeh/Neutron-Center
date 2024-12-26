

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

//load the products in the cart from the local storage
let cartProducts = [];
if (localStorage.cart != null) {
  cartProducts = JSON.parse(localStorage.cart);
}
else {
  cartProducts = [];
}

let ShowCart = function () {
  let cartDiv = '';

  if (cartProducts.length <= 0) {
    cartDiv += `<h4 class="text-muted text-center my-3"> Your cart is empty</h4>`;
  }
  else {
    //loop theough the array for each product and display it in the cart section
    for (let i = 0; i < cartProducts.length; i++) {

      cartDiv += `
            <li class="list-group-item d-flex justify-content-between lh-condensed my-2">
                    <div class="d-flex">
                        <img src="${cartProducts[i].image}" alt="" width="120px" height="110px" class="mr-2">
                        <div class="mr-2 d-flex flex-column justify-content-between">
                            <div>
                                <a href="product_page.html" onclick="ShowProPage(event, this, ${i})" class="cartlink"><h6 class="my-0">${cartProducts[i].name}</h6></a>
                                <small class="text-muted">${cartProducts[i].description}</small>
                            </div>
                            <h6 class="mt-3 mb-0">Quantity:  <span class="text-muted mx-2">  ${cartProducts[i].quantity}  </span> </h6>
                        </div>
                    </div>

                    <div class="d-flex flex-column align-items-end justify-content-between">
                        <button type="button" class="btn delete mx-0"  onclick="deletePro(event, this, ${i})">-</button>
                        <span class="text-muted">$${cartProducts[i].price}</span>
                    </div>
            </li>
            `;
    }
  }

  //add the code of the product to the html code base
  document.getElementById("cartList").innerHTML = cartDiv;
}
ShowCart();

let deletePro = function (event, target, index) {
  //make sure the div doesn't get triggered 
  event.stopPropagation();

  //check the quantity and remove one from the total 
  //if the item quantity is already one then remove it
  if (cartProducts[index].quantity > 1) {
    //remove one from the quantity
    cartProducts[index].quantity -= 1;
  }
  else {
    //remove the prodcut from the array 
    cartProducts.splice(index, 1);
  }
  //save it in the local storage and then show it
  localStorage.cart = JSON.stringify(cartProducts);
  ShowCart();
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
        sug += `<a href="product_page.html" class="search-elements" onclick="ShowProPageP(event, this, ${i})">
            <img src="${Products[i].image}"  width="30px" alt="">
            <h5>${Products[i].name}</h5>
          </a>`;
      }
    }
  }

  document.getElementById("suggestions_container").innerHTML = sug;
}

let ShowProPageP = function (event, target, index) {
  event.stopPropagation();
  localStorage.setItem("product", JSON.stringify(Products[index]));
}

let ShowProPage = function (event, target, index) {
  event.stopPropagation();
  localStorage.setItem("product", JSON.stringify(cartProducts[index]));
}
let carts = document.querySelectorAll('.add-cart')
let Products = [
    {
        pname : "Black T-shirt",
        tag: "blackshirt",
        price: 15,
        inCart: 0,
    },
    {
        pname: "White T-shirt",
        tag: "whiteshirt",
        price: 20,
        inCart: 0,
    },
    {
        pname: "Jean shirt",
        tag: "jeanshirt",
        price: 10,
        inCart: 0,
    },
    {
        pname: "Coloured Kicks",
        tag: "kicks",
        price: 25,
        inCart: 0,
    },
    {
        pname: "Starry Shirt",
        tag: "starryshirt",
        price: 20,
        inCart: 0,
    },
    {
        pname: "Rainbow Shirt",
        tag: "rainbowshirt",
        price: 25,
        inCart: 0,
    }
]
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        console.log("Added to cart")
        cartNumbers(Products[i])
        totalCost(Products[i])
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')
    if(productNumbers){
        document.getElementById("items").textContent = productNumbers
    }
}
function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById("items").textContent = productNumbers + 1
    }
    else{
        localStorage.setItem('cartNumbers', 1)
        document.getElementById("items").textContent = 1
    }
    
    setItems(product)

}
function setItems(product){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    if (cartItems != null){
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1
    }
    else{
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}
function totalCost(product){
    // console.log("The product price is", product.price)
    let cartCost = localStorage.getItem("totalCost")
    console.log("My Cart Cost is", cartCost)
    console.log(typeof cartCost)
    if (cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    }else{
        localStorage.setItem("totalCost", product.price)
    }
    
}
// function clearCart(){
//     localStorage.getItem("cartNumbers")
//     localStorage.removeItem("cartNumbers")
//     document.getElementById("items").textContent = 0
// }
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products")
    let bskttl = document.querySelector(".bskttl")
    if ( cartItems && productContainer){
        productContainer.innerHTML= ""
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <img src="close.png" height="10px" width="10px">
                <img src="${item.tag}.jpg" height="100px" width="100px">
                <span>${item.pname}</span>
            </div>
            <div class="prices">$${item.price},00</div>
            <div class="quantitynum">
                <img src="minus.png" height="10px" width="10px">
                <span>${item.inCart}</span>
                <img src="add.png" height="10px" width="10px">
            </div>
            <div class="totals">
                $${item.inCart * item.price},00
            `
            
        })

        
    }
}
function cartClear(){
    let productContainer = document.querySelector(".products")
    productContainer.innerHTML = ''
    localStorage.getItem("cartNumbers")
    localStorage.removeItem("cartNumbers")
    document.getElementById("items").textContent = 0
}
onLoadCartNumbers()
displayCart()
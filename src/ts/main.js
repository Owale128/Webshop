"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
import "../scss/style.css";
import { closePage, openPage, stopScroll, validateForm } from "../ts/functions.js";
import { Product } from "../ts/models/Product.js";
var products = [
    new Product("Rödgran", "src/assets/img/resized_images/red_spruce3.webp", "230 – 260 cm", 499, "Rödgranen, en symbol för julens stämning, är känd för sina stadiga grenar och doftande barr som sprider en friskhet som förtrollar. Med dess frodiga barrverk och praktfulla utseende blir denna gran ett lysande inslag i juldekorationerna. Med rätt underhåll sitter barren kvar länge och ger en varaktig skönhet som fyller hemmet med en känsla av tradition och glädje under helgerna.", "001"),
    new Product("Rödgran", "src/assets/img/resized_images/red_spruce.webp", "180 – 230 cm", 350, "Inget fångar julens anda som den klassiska rödgranen. Dess slanka silhuett och intensiva gröna barr skapar en fantastisk atmosfär och sprider en ljuvlig doft i varje vrå. Rödgranen är mer än en dekoration – den är själva hjärtat i julens festligheter och bjuder in till en tid av gemenskap och värme.", "002"),
    new Product("Blågran", "src/assets/img/resized_images/blue_spruce.webp", "180 – 230 cm", 699, "Blågranen är en storslagen symbol för vinterns charm och elegans. Med sina mjuka, silverblå barr skapar denna gran en atmosfär av frostig skönhet i varje rum. Dess kompakta och välmående grenverk ger en perfekt plats att hänga julens dekorationer och ljus, medan dess hållbara barr behåller sin färg och form under hela säsongen. Blågranen erbjuder en unik och förtrollande touch till julens firande och blir snabbt hjärtat i ditt hem under denna festliga tid.", "003"),
    new Product("Bosnisk tall", "src/assets/img/resized_images/bosnian_pine.webp", "180 – 230 cm", 750, "Bosnisk tall, med sin ståtliga och majestätiska gestalt, är en symbol för vinterens skönhet och styrka. Dess karaktäristiska mörkgröna barr och robusta grenar skapar en imponerande kuliss för julens festligheter. Med en naturlig symmetri och en doft av skogens friskhet blir denna tall en enastående centralpunkt för dekorationer och ljus. Dess hållbara kvalitet och långvariga skönhet gör den till det perfekta valet för att införa en känsla av tradition och elegans i ditt hem under julen.", "004"),
    new Product("Rödgran", "src/assets/img/resized_images/red_spruce2.webp", "100 – 140 cm", 250, "Rödgranen är julens symbol av skönhet och elegans. Dess frodiga barrverk skänker inte bara en frisk doft utan också en levande touch till varje hem. Med en rödgran i huset skapas en atmosfär av tradition och fröjd, där varje barrstrå förmedlar känslan av en härlig julstund.", "005"),
    new Product("Rödgran", "src/assets/img/resized_images/red_spruce_xl.webp", "300 – 350 cm", 990, "Inget fångar julens anda som den klassiska rödgranen. Dess slanka silhuett och intensiva gröna barr skapar en fantastisk atmosfär och sprider en ljuvlig doft i varje vrå. Rödgranen är mer än en dekoration – den är själva hjärtat i julens festligheter och bjuder in till en tid av gemenskap och värme.", "006"),
];
var cart = JSON.parse(sessionStorage.getItem("cartItems") || JSON.stringify([]));
// CTA scrollar till produkterna
var ctaButton = document.getElementById("cta");
ctaButton === null || ctaButton === void 0 ? void 0 : ctaButton.addEventListener("click", function () {
    var productList = document.getElementById("product-list");
    productList === null || productList === void 0 ? void 0 : productList.scrollIntoView({ behavior: "smooth" });
});
var totalPrice = 0;
totalPrice = JSON.parse(sessionStorage.getItem("totalPrice") || JSON.stringify(0));
var currentProduct;
var cardTitle = document.querySelector(".c-card__header");
var cardImage = document.querySelector(".c-card__image");
var cardInfo = document.querySelector(".c-card__body");
var closeProductPageButton = document.getElementById("product-page-close-button");
var productPage = document.querySelector("#wrapper-product-page");
var openCheckoutButton = document.querySelector(".cart__checkout-button");
var closeCheckoutButton = document.querySelector("#checkout-close-button");
var checkoutContainer = document.querySelector(".c-checkout");
var openCartButton = document.querySelector("#main-cart-button");
var closeCartButton = document.querySelector(".cart__close-button");
var cartContainer = document.querySelector(".cart");
var totalPriceTagCart = document.createElement("p");
(0, closePage)(closeCheckoutButton, checkoutContainer);
(0, openPage)(openCheckoutButton, checkoutContainer);
(0, openPage)(openCartButton, cartContainer);
(0, closePage)(closeCartButton, cartContainer);
openCartButton.addEventListener("click", stopScroll);
closeCartButton.addEventListener("click", stopScroll);
productPage.addEventListener("click", stopScroll);
closeProductPageButton.addEventListener("click", stopScroll);
closeCheckoutButton.addEventListener("click", function () {
    cartContainer.classList.remove("--active");
    document.body.classList.remove("stop-scroll");
});
cardTitle === null || cardTitle === void 0 ? void 0 : cardTitle.addEventListener("click", stopScroll);
cardImage === null || cardImage === void 0 ? void 0 : cardImage.addEventListener("click", stopScroll);
cardInfo === null || cardInfo === void 0 ? void 0 : cardInfo.addEventListener("click", stopScroll);
var buyButton = document.getElementById("modalButton");
buyButton.addEventListener("click", handlePurchase);
var productPageCartButton = document.getElementById("product-page-cart-button");
productPageCartButton === null || productPageCartButton === void 0 ? void 0 : productPageCartButton.addEventListener("click", function () {
    var checkId = cart.findIndex(function (product) { return product.id === currentProduct.id; });
    if (checkId !== -1) {
        currentProduct.quantity++;
        totalPrice += currentProduct.price;
        cartHtml();
        cartHtmlForCheckout();
        // quantityInCartIcon();
        cartContainItems();
    }
    else {
        cart.push(currentProduct);
        totalPrice += currentProduct.price;
        cartHtml();
        cartHtmlForCheckout();
        // quantityInCartIcon();
        cartContainItems();
    }
});
var createProductsHtml = function () {
    var _loop_1 = function (i) {
        var list = document.querySelector(".l-list");
        var listItem = document.createElement("li");
        var productContainer = document.createElement("div");
        var productHeader = document.createElement("div");
        var productTitle = document.createElement("h2");
        var productBody = document.createElement("div");
        var productImage = document.createElement("img");
        var productPrice = document.createElement("p");
        var productId = document.createElement("p");
        var productSize = document.createElement("p");
        var productFooter = document.createElement("div");
        var addToCartButton = document.createElement("button");
        productTitle.innerHTML = products[i].title;
        productImage.innerHTML = products[i].imageUrl;
        productSize.innerHTML = products[i].size;
        productPrice.innerHTML = "".concat(products[i].price.toString(), " kr");
        productImage.setAttribute("src", products[i].imageUrl);
        productId.innerHTML = "Art.nr: " + products[i].id;
        addToCartButton.innerHTML = "Lägg i varukorg";
        listItem.classList.add("l-list__item");
        productContainer.classList.add("c-card");
        productHeader.classList.add("c-card__header");
        productTitle.classList.add("c-card__title");
        productBody.classList.add("c-card__body");
        productImage.classList.add("c-card__image");
        productPrice.classList.add("c-card__price");
        productSize.classList.add("c-card__attribute");
        productId.classList.add("c-card__text");
        productFooter.classList.add("c-card__footer");
        addToCartButton.classList.add("c-button", "c-button--primary");
        listItem.appendChild(productImage);
        productContainer.appendChild(productHeader);
        productHeader.appendChild(productTitle);
        productContainer.appendChild(productBody);
        productBody.appendChild(productSize);
        productBody.appendChild(productPrice);
        list === null || list === void 0 ? void 0 : list.appendChild(listItem);
        listItem.appendChild(productContainer);
        productContainer.appendChild(productFooter);
        productFooter.appendChild(addToCartButton);
        addToCartButton.addEventListener("click", function () {
            var checkId = cart.findIndex(function (product) { return product.id === products[i].id; });
            if (checkId !== -1) {
                products[i].quantity++;
                totalPrice += products[i].price;
                cartHtml();
                cartHtmlForCheckout();
                cartContainItems();
            }
            else {
                cart.push(products[i]);
                totalPrice += products[i].price;
                cartHtml();
                cartHtmlForCheckout();
                cartContainItems();
            }
        });
        var clickOnProduct = function () {
            var productPage = document.querySelector(".c-product-page");
            var productPageTitle = document.getElementById("product-page-title");
            var productPageImage = document.getElementById("product-page-image");
            var productPageInfo = document.getElementById("product-page-info");
            var readMore = document.getElementById("read-more");
            var productPageSize = document.getElementById("product-page-size");
            var productPagePrice = document.getElementById("product-page-price");
            var productPageWrapper = document.getElementById("wrapper-product-page");
            var productPageClose = document.getElementById("product-page-close-button");
            currentProduct = products[i];
            if (productPageWrapper) {
                productPageWrapper.classList.add("--active");
            }
            productPage === null || productPage === void 0 ? void 0 : productPage.classList.add("--active");
            if (productPageTitle) {
                productPageTitle.innerHTML = products[i].title;
            }
            if (productPageImage) {
                productPageImage.setAttribute("src", products[i].imageUrl);
            }
            if (productPageInfo) {
                productPageInfo.innerHTML = products[i].info;
            }
            if (productPageSize) {
                productPageSize.innerHTML = "Storlek: " + products[i].size;
            }
            if (productPagePrice) {
                productPagePrice.innerHTML = products[i].price.toString() + " kr";
            }
            readMore === null || readMore === void 0 ? void 0 : readMore.addEventListener("click", function () {
                if (productPageInfo === null || productPageInfo === void 0 ? void 0 : productPageInfo.classList.contains("--active")) {
                    productPageInfo.classList.remove("--active");
                    readMore.innerHTML = "Läs mer";
                }
                else {
                    productPageInfo === null || productPageInfo === void 0 ? void 0 : productPageInfo.classList.add("--active");
                    readMore.innerHTML = "Visa mindre";
                }
            });
            productPageClose === null || productPageClose === void 0 ? void 0 : productPageClose.addEventListener("click", function () {
                productPageWrapper === null || productPageWrapper === void 0 ? void 0 : productPageWrapper.classList.remove("--active");
                if (productPageInfo === null || productPageInfo === void 0 ? void 0 : productPageInfo.classList.contains("--active")) {
                    productPageInfo.classList.remove("--active");
                    readMore.innerHTML = "Läs mer";
                }
            });
        };
        productImage.addEventListener("click", clickOnProduct);
        productHeader.addEventListener("click", clickOnProduct);
        productBody.addEventListener("click", clickOnProduct);
    };
    for (var i = 0; i < products.length; i++) {
        _loop_1(i);
    }
};
var cartHtml = function () {
    var _a;
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
    sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    var cartContainer = document.querySelector("#cart-items");
    totalPriceTagCart.innerHTML = "Summa: " + totalPrice.toString() + " kr";
    if (cartContainer) {
        cartContainer.innerHTML = "";
    }
    var _loop_2 = function (i) {
        var listItem = document.createElement("li");
        var productContainer = document.createElement("div");
        var productHeader = document.createElement("div");
        var productTitle = document.createElement("h3");
        var imageContainer = document.createElement("figure");
        var productImage = document.createElement("img");
        var productBody = document.createElement("div");
        var productPrice = document.createElement("p");
        var articleNumber = document.createElement("p");
        var productSize = document.createElement("p");
        var cardFooter = document.createElement("div");
        var addButton = document.createElement("button");
        var quantityTag = document.createElement("span");
        var removeButton = document.createElement("button");
        listItem.classList.add("l-list__item");
        productContainer.classList.add("c-card-cart");
        productHeader.classList.add("c-card__header");
        imageContainer.classList.add("c-card-cart__figure");
        productImage.classList.add("c-card-cart__image");
        productBody.classList.add("c-card-cart__body");
        productPrice.classList.add("c-card__price");
        articleNumber.classList.add("c-card__id");
        productSize.classList.add("c-card__attribute");
        cardFooter.classList.add("c-card-cart__footer");
        productTitle.innerHTML = cart[i].title;
        productImage.setAttribute("src", cart[i].imageUrl);
        productPrice.innerHTML = cart[i].price.toString() + " kr";
        productSize.innerHTML = "Storlek: " + cart[i].size;
        articleNumber.innerHTML = "Art.nr: " + cart[i].id;
        addButton.innerHTML = "+";
        quantityTag.innerHTML = cart[i].quantity.toString();
        removeButton.innerHTML = "-";
        productContainer.appendChild(imageContainer);
        imageContainer.appendChild(productImage);
        productContainer.appendChild(productBody);
        productBody.appendChild(productTitle);
        productBody.appendChild(productPrice);
        productBody.appendChild(productSize);
        productBody.appendChild(articleNumber);
        productContainer.appendChild(cardFooter);
        cardFooter.appendChild(removeButton);
        cardFooter.appendChild(quantityTag);
        cardFooter.appendChild(addButton);
        listItem.appendChild(productContainer);
        cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(listItem);
        addButton.addEventListener("click", function () {
            cart[i].quantity++;
            totalPrice += cart[i].price;
            cartHtml();
            cartHtmlForCheckout();
            // quantityInCartIcon();
            cartContainItems();
        });
        removeButton.addEventListener("click", function () {
            if (cart[i].quantity === 1) {
                totalPrice -= cart[i].price;
                cart.splice(i, 1);
                cartHtml();
                cartHtmlForCheckout();
                cartContainItems();
            }
            else {
                cart[i].quantity--;
                totalPrice -= cart[i].price;
                cartHtml();
                cartHtmlForCheckout();
                // quantityInCartIcon();
                cartContainItems();
            }
        });
    };
    for (var i = 0; i < cart.length; i++) {
        _loop_2(i);
    }
    (_a = document.querySelector(".cart__total-price")) === null || _a === void 0 ? void 0 : _a.appendChild(totalPriceTagCart);
};
var cartHtmlForCheckout = function () {
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
    sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    var cartInCheckout = document.querySelector("#checkout-cart-items");
    var totalPriceInCheckout = document.getElementById("total-price-checkout");
    if (totalPriceInCheckout) {
        totalPriceInCheckout.innerHTML = "Summa: " + totalPrice.toString() + " kr";
    }
    if (cartInCheckout) {
        cartInCheckout.innerHTML = "";
    }
    var _loop_3 = function (i) {
        var listItem = document.createElement("li");
        var productImage = document.createElement("img");
        var productBody = document.createElement("div");
        var productTitle = document.createElement("h3");
        var productPrice = document.createElement("p");
        var articleNumber = document.createElement("p");
        var cardFooter = document.createElement("div");
        var addButton = document.createElement("button");
        var quantityTag = document.createElement("span");
        var removeButton = document.createElement("button");
        productTitle.innerHTML = cart[i].title;
        productImage.setAttribute("src", cart[i].imageUrl);
        productPrice.innerHTML = cart[i].price.toString() + " kr";
        addButton.innerHTML = "+";
        quantityTag.innerHTML = cart[i].quantity.toString();
        removeButton.innerHTML = "-";
        articleNumber.innerHTML = "Art.nr: " + cart[i].id;
        listItem.classList.add("c-card-checkout");
        productBody.classList.add("c-card-checkout__body");
        cardFooter.classList.add("c-card-checkout__footer");
        listItem.appendChild(productImage);
        productBody.appendChild(productTitle);
        productBody.appendChild(productPrice);
        productBody.appendChild(articleNumber);
        listItem.appendChild(productBody);
        cardFooter.appendChild(removeButton);
        cardFooter.appendChild(quantityTag);
        cardFooter.appendChild(addButton);
        listItem.appendChild(cardFooter);
        cartInCheckout === null || cartInCheckout === void 0 ? void 0 : cartInCheckout.appendChild(listItem);
        addButton.addEventListener("click", function () {
            cart[i].quantity++;
            totalPrice += cart[i].price;
            cartHtml();
            cartHtmlForCheckout();
            // quantityInCartIcon();
            cartContainItems();
        });
        removeButton.addEventListener("click", function () {
            if (cart[i].quantity === 1) {
                totalPrice -= cart[i].price;
                cart.splice(i, 1);
                cartHtml();
                cartHtmlForCheckout();
                // quantityInCartIcon();
            }
            else {
                cart[i].quantity--;
                totalPrice -= cart[i].price;
                cartHtml();
                cartHtmlForCheckout();
                // quantityInCartIcon();
            }
        });
    };
    for (var i = 0; i < cart.length; i++) {
        _loop_3(i);
    }
};
function handlePurchase(event) {
    event.preventDefault();
    var emailInput = document.getElementById("email");
    var userEmail = emailInput.value;
    if ((0, validateForm)()) {
        showPurchaseModal(userEmail);
    }
}
function showPurchaseModal(userEmail) {
    var modal = document.getElementById("purchaseModal");
    modal.classList.add("--active");
    var orderDetailsContainer = document.createElement("div");
    orderDetailsContainer.classList.add("order-details-container");
    var modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = "\n    <div class=\"checkmark\">&#10003;</div>\n    <i id=\"closeModalButton\" class=\"bi bi-x-lg\"></i>\n    <h3>Ditt k\u00F6p har genomf\u00F6rts!</h3>\n    <p class=\"purchaseModalEmail\">Betalningsinstruktioner kommer skickas till: ".concat(userEmail, "</p>\n    <h4>Orderdetaljer</h4>\n  ");
    var totalOrderPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        var productDetails = document.createElement("p");
        productDetails.classList.add("order-details-item");
        var productPrice = cart[i].price * cart[i].quantity;
        totalOrderPrice += productPrice;
        productDetails.innerHTML = "\n      ".concat(cart[i].title, " - ").concat(productPrice, " kr <br> Antal: ").concat(cart[i].quantity, "\n    ");
        orderDetailsContainer.appendChild(productDetails);
    }
    var totalPriceTagModal = document.createElement("p");
    totalPriceTagModal.innerHTML = "<br>Totalt belopp: ".concat(totalOrderPrice, " kr");
    orderDetailsContainer.appendChild(totalPriceTagModal);
    modalContent.appendChild(orderDetailsContainer);
    var closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", function () {
        // modal.style.display = "none";
        modal.classList.remove("--active");
        //nollställer totalpriset efter genomfört köp
        totalPrice = 0;
        //tömmer cart arrayen och uppdaterar html
        cart.splice(0, cart.length);
        cartHtml();
        cartHtmlForCheckout();
        //stänger de öppna sidorna och scrollar till toppen
        checkoutContainer.classList.remove("--active");
        cartContainer.classList.remove("--active");
        productPage.classList.remove("--active");
        (0, stopScroll)();
        // quantityInCartIcon();
        window.scrollTo(0, 0);
        setTimeout(function () {
            location.reload();
        }, 1000);
    });
}
// visa fylld varukorg
var cartContainItems = function () {
    var cartIcon = document.getElementById("cart-icon");
    if (cart.length !== 0) {
        cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.classList.remove("bi-cart");
        cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.classList.add("bi-cart-fill");
    }
    else {
        cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.classList.remove("bi-cart-fill");
        cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.classList.add("bi-cart");
    }
};
createProductsHtml();
cartHtml();
cartHtmlForCheckout();
// /* stopScroll(); */
// quantityInCartIcon();
cartContainItems();

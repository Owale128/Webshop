"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const _stopScroll = exports.validateForm = exports.closePage = exports.openPage = void 0;
export { _stopScroll as stopScroll };
//funktioner för att visa sidorna när man öppnar och gömma sidorna när man stänger
function openPage(theButton, thePage) {
    theButton.addEventListener("click", function () {
        thePage.classList.add("--active");
    });
}
const _openPage = openPage;
export { _openPage as openPage };
function closePage(theButton, thePage) {
    theButton.addEventListener("click", function () {
        thePage.classList.remove("--active");
    });
}
const _closePage = closePage;
export { _closePage as closePage };
function validateForm() {
    var fullname = document.getElementById("fullname");
    var address = document.getElementById("address");
    var zipcode = document.getElementById("zipcode");
    var email = document.getElementById("email");
    var cellPhone = document.getElementById("cellPhone");
    if (fullname.value === "" || !isValidFullName(fullname.value)) {
        fullname.classList.add("is-invalid");
        return false;
    }
    else {
        fullname.classList.remove("is-invalid");
    }
    if (address.value === "" || !isValidAddress(address.value)) {
        address.classList.add("is-invalid");
        return false;
    }
    else {
        address.classList.remove("is-invalid");
    }
    if (zipcode.value === "" || !isValidPostalCode(zipcode.value)) {
        zipcode.classList.add("is-invalid");
        return false;
    }
    else {
        zipcode.classList.remove("is-invalid");
    }
    if (email.value === "" || !isValidEmail(email.value)) {
        email.classList.add("is-invalid");
        return false;
    }
    else {
        email.classList.remove("is-invalid");
    }
    if (cellPhone.value === "" || !isValidPhoneNumber(cellPhone.value)) {
        cellPhone.classList.add("is-invalid");
        return false;
    }
    else {
        cellPhone.classList.remove("is-invalid");
    }
    return true;
}
const _validateForm = validateForm;
export { _validateForm as validateForm };
function isValidFullName(fullName) {
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(fullName);
}
function isValidAddress(address) {
    return address.trim().length >= 10;
}
function isValidPostalCode(postalCode) {
    return /^\d{5}$/.test(postalCode);
}
function isValidEmail(email) {
    return /@hotmail\.com$|@gmail\.com$|@yahoo\.com$/.test(email);
}
function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
}
var stopScroll = function () {
    var _a, _b, _c;
    var pages = {
        productPage: document.getElementById("wrapper-product-page"),
        cart: document.getElementById("cart"),
        checkout: document.getElementById("checkout"),
    };
    if (((_a = pages.cart) === null || _a === void 0 ? void 0 : _a.classList.contains("--active")) ||
        ((_b = pages.checkout) === null || _b === void 0 ? void 0 : _b.classList.contains("--active")) ||
        ((_c = pages.productPage) === null || _c === void 0 ? void 0 : _c.classList.contains("--active"))) {
        document.body.classList.add("stop-scroll");
        console.log("hej");
    }
    else {
        document.body.classList.remove("stop-scroll");
    }
};
const _stopScroll = stopScroll;
// export { _stopScroll as stopScroll };

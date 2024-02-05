"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const _Product = void 0;
export { _Product as Product };
var Product = /** @class */ (function () {
    class Product {
        constructor(title, imageUrl, size, price, info, id) {
            this.title = title;
            this.imageUrl = imageUrl;
            this.size = size;
            this.price = price;
            this.info = info;
            this.id = id;
            this.quantity = 1;
        }
    }
    return Product;
}());
const _Product = Product;
// export { _Product as Product };

/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { getProduct } from "../api";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender, toastNotify } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);

    if (forceUpdate) {
        rerender("header-container", Header);
        rerender("main-container", CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = "/cart";
    } else {
        rerender("header-container", Header);
        rerender("main-container", CartScreen);
    }
};

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach((qtySelect) => {
            qtySelect.addEventListener("change", (e) => {
                const item = getCartItems().find(
                    (x) => x.product === qtySelect.id
                );
                addToCart({ ...item, qty: Number(e.target.value) }, true);
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener("click", () => {
                if (window.confirm("Xóa sản phẩm?")) {
                    removeFromCart(deleteButton.id);
                    toastNotify({
                        title: "Thành công!",
                        message: "Xóa sản phẩm thành công",
                        type: "error",
                        duration: 3000,
                    });
                }
            });
        });
        document
            .getElementById("checkout-button")
            .addEventListener("click", () => {
                document.location.hash = "/shipping";
            });
        document.getElementById("home-button").addEventListener("click", () => {
            document.location.hash = "/";
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);
            addToCart({
                product: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }

        const cartItems = getCartItems();

        const isContinue = cartItems.length === 0 ? "disabled" : "";

        rerender("header-container", Header);

        return `
            <div class="cart-page">
                <div class="container">
                    ${Breadcrumb.render(["Trang chủ", "Giỏ hàng"])}
                    ${Heading.render("Giỏ hàng")}
                    <div class="row">
                    
                                <div class="col-md-9">
                        <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="cart__head">
                            <tr class="cart__col">
                                <th scope="col">Ảnh</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng số</th>
                                <th scope="col">Xóa</th>
                            </tr>
                            </thead>
                            <tbody class="cart__body">
                            ${cartItems
                                .map(
                                    (item) => `
                                <tr class="cart__row">
                                    <td class="cart__image"><a href="/#/"><img src="${
                                        item.image
                                    }" alt="Cart"/></a></td>
                                    <td class="cart__product"><a href="/#/">${
                                        item.name
                                    }</a></td>
                                    <td class="cart__price">${item.price
                                        .toFixed(2)
                                        .replace(
                                            /\d(?=(\d{3})+\.)/g,
                                            "$&,"
                                        )} đ</td>
                                    <td class="cart__qty">
                                        <select class="qty-select" id="${
                                            item.product
                                        }">
                                        ${[
                                            ...Array(item.countInStock).keys(),
                                        ].map((x) =>
                                            item.qty === x + 1
                                                ? `<option selected value="${
                                                      x + 1
                                                  }">${x + 1}</option>`
                                                : `<option  value="${x + 1}">${
                                                      x + 1
                                                  }</option>`
                                        )}  
                                        </select>
                                    </td>
                                    <td class="cart__sum">${(
                                        item.price * item.qty
                                    )
                                        .toFixed(2)
                                        .replace(
                                            /\d(?=(\d{3})+\.)/g,
                                            "$&,"
                                        )} đ</td>
                                    <td class="cart__delete">
                                    <button type="button" class="delete-button" id="${
                                        item.product
                                    }"><i class="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>               
                            `
                                )
                                .join("")}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="cart-summary">
                        <table class="table table-summary">
                            <tbody>
                            <tr class="summary-subtotal">
                                <h3>Subtotal</h3>
                                <td>${cartItems.reduce(
                                    (a, c) => a + c.qty,
                                    0
                                )} items:</td>
                                <td>$${cartItems
                                    .reduce((a, c) => a + c.price * c.qty, 0)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}đ</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="cart-action">
                            <button id="checkout-button" class="btn-cart" ${isContinue}>Tiếp tục mua hàng</button>
                            <button id="home-button" class="btn-cart">Quay lại</button>
                        </div>
                        </div>
                    </div>
                    </div>            
                            
                </div>
            </div>

        `;
    },
};

export default CartScreen;

import { createOrder } from "../api";
import Breadcrumb from "../components/Breadcrumb";
import CheckoutSteps from "../components/CheckoutSteps";
import Heading from "../components/Heading";
import {
    cleanCart,
    getCartItems,
    getPayment,
    getShipping,
} from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = "/cart";
    }
    const shipping = getShipping();
    if (!shipping.address) {
        document.location.hash = "/shipping";
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = "/payment";
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};

const PlaceOrderScreen = {
    after_render: async () => {
        document
            .getElementById("placeorder-button")
            .addEventListener("click", async () => {
                const order = convertCartToOrder();
                showLoading();
                const data = await createOrder(order);
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    cleanCart();
                    // eslint-disable-next-line no-return-assign
                    showMessage("Đặt hàng thành công", () => (document.location.hash = "/"));
                }
            });
    },
    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = convertCartToOrder();
        return `
            <div class="order container">
                ${Breadcrumb.render(["Trang chủ", "Payment"])}
                ${Heading.render("Placeorder")}
                ${CheckoutSteps.render({
                    step1: true,
                    step2: true,
                    step3: true,
                    step4: true,
                })}
                <div class="row">
                    <div class="col-md-9">
                        <div class="order-info">
                        <div>
                            <h3>Địa chỉ</h3>
                            <div>
                                ${shipping.address},
                                ${shipping.city}, 
                                ${shipping.postalCode},
                                ${shipping.country}
                            </div>
                        </div>
                        <div>
                            <h3>Thanh toán</h3>
                            <div>Phương thức thanh toán: ${
                                payment.paymentMethod
                            }</div>
                        </div>
                        <div>
                            <ul class="order-list-container">
                            <li>
                                <h3>Shopping Cart</h3>
                                <div>Price</div>
                            </li>
                            
                                ${orderItems
                                    .map(
                                        (item) => `
                                    <li>
                                        <div class="order-image"><img src="${item.image}" alt="${item.name}" /></div>
                                        <div class="order-name">
                                        <div><a href="/#/">${item.name} </a></div>
                                        <div>Qty: ${item.qty}</div>
                                        </div>
                                        <div class="order-price">${item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</div>
                                    </li>
                                    `
                                    )
                                    .join("\n")}
                            
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="order-action">
                        <ul>
                            <li>
                            <h3>Order Summary</h3>
                            </li>
                            <li>
                            <div>Item</div>
                            <div>${itemsPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</div>
                            </li>
                            <li>
                            <div>Shipping</div>
                            <div>${shippingPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</div>
                            </li>
                            <li>
                            <div>Tax</div>
                            <div>${taxPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</div>
                            </li>
                            <li class="total">
                            <div>Order Total</div>
                            <div>${totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</div>
                            </li>
                        </ul>
                        <button id="placeorder-button" class="btn btn-primary" type="submit">Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

export default PlaceOrderScreen;

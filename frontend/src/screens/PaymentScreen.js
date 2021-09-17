import Breadcrumb from "../components/Breadcrumb";
import CheckoutSteps from "../components/CheckoutSteps";
import Heading from "../components/Heading";
import { setPayment } from "../localStorage";

const PaymentScreen = {
    after_render: () => {
        document
            .getElementById("payment-form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                const paymentMethod = document.querySelector(
                    'input[name="payment-method"]:checked'
                ).value;
                setPayment({ paymentMethod });
                document.location.hash = "/placeorder";
            });
    },
    render: () => `
            <div class="payment container">
                ${Breadcrumb.render(["Trang chủ", "Payment"])}
                ${Heading.render("Payment")}

                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        ${CheckoutSteps.render({
                            step1: true,
                            step2: true,
                            step3: true,
                        })}
                        <form id="payment-form">
                            <h4>Lựa chọn phương thức thanh toán</h4>
                            <div class="form-check">
                                <input class="form-check-input" id="paypal" type="radio" name="payment-method" value="Paypal" checked>
                                <label class="form-check-label" for="paypal">PayPal</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" id="stripe" type="radio" name="payment-method" value="Stripe">
                                <label class="form-check-label" for="stripe">Stripe</label>
                            </div>
                            <button class="btn btn-primary" type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        
        `,
};

export default PaymentScreen;

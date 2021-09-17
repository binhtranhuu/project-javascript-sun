import Breadcrumb from "../components/Breadcrumb";
import CheckoutSteps from "../components/CheckoutSteps";
import Heading from "../components/Heading";
import { getShipping, setShipping } from "../localStorage";
import { Validator } from "../validate";

const ShippingScreen = {
    after_render: () => {
        Validator({
            form: "#shipping-form",
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            rules: [
                Validator.isRequired(
                    "#address",
                    "Vui lòng nhập địa chỉ của bạn"
                ),
                Validator.isRequired("#city", "Vui lòng nhập tên thành phố"),
                Validator.isRequired(
                    "#postalCode",
                    "Vui lòng nhập mã bưu điện"
                ),
            ],
            onSubmit: (data) => {
                console.log(data);
                setShipping({
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    country: data.country,
                });
                document.location.hash = "/payment";
            },
        });
        // document
        //     .getElementById("shipping-form")
        //     .addEventListener("submit", async (e) => {
        //         e.preventDefault();
        //         setShipping({
        //             address: document.getElementById("address").value,
        //             city: document.getElementById("city").value,
        //             postalCode: document.getElementById("postalCode").value,
        //             country: document.getElementById("country").value,
        //         });
        //         document.location.hash = "/payment";
        //     });
    },
    render: () => {
        const { address, city, postalCode, country } = getShipping();

        return `
            <div class="container">
                ${Breadcrumb.render(["Trang chủ", "Shipping"])}
                ${Heading.render("Shipping")}
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        ${CheckoutSteps.render({ step1: true, step2: true })}
                        <form id="shipping-form">
                        <h4>Địa chỉ nhận hàng</h4>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input class="form-control" id="address" type="text" placeholder="Address" name="address" value="${address}" require>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <input class="form-control" id="city" type="text" placeholder="City" name="city" value="${city}" require>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="postalCode">Postal Code</label>
                            <input class="form-control" id="postalCode" type="text" placeholder="Address" name="postalCode" value="${postalCode}" require>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="country">Country</label>
                            <input class="form-control" id="country" type="text" placeholder="Address" name="country" value="${country}" require>
                            <span class="form-message"></span>
                        </div>
                        <button class="btn btn-primary" type="submit">Tiếp tục</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },
};

export default ShippingScreen;

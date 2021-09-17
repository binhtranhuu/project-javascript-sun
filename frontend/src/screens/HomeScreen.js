/* eslint-disable no-use-before-define */
import { getCategories, getProduct, getProducts } from "../api";
import Header from "../components/Header";
import { getCartItems, setCartItems } from "../localStorage";
import { getParameterByName, rerender, toastNotify } from "../utils";

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
        // rerender("main-container", HomeScreen);
    }
};

const HomeScreen = {
    after_render: () => {
        const btnAddToCarts = document.getElementsByClassName("btn-cart");
        Array.from(btnAddToCarts).forEach((btnAddToCart) => {
            btnAddToCart.addEventListener("click", async () => {
                const product = await getProduct(btnAddToCart.id);
                addToCart(
                    {
                        product: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        countInStock: product.countInStock,
                        qty: 1,
                    },
                    true
                );
                toastNotify({
                    title: "Thành công!",
                    message: "Thêm sản phẩm thành công",
                    type: "success",
                    duration: 5000,
                });
                // document.location.hash = `/cart/${btnAddToCart.id}`;
            });
        });
    },
    render: async () => {
        const page = getParameterByName("page");
        const category = getParameterByName("category");

        const products = await getProducts({ page, category });
        const categories = await getCategories();

        return `
            <div class="container">
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li class="breadcrumb-item"><a href="#">Sản phẩm</a></li>
                    <li class="breadcrumb-item active"><a href="#">Rượu vang đỏ</a></li>
                </ol>
                </nav>
                <div class="banner-horizontal"><img src="../images/product-list-banner-1.png" alt="Banner"/></div>
                <div class="row">
                <div class="col-lg-9 order-lg-2">
                    <div class="product-list__content">
                    <div class="product-list__tabs">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item"><a class="nav-link active" id="pills-products-gird-tab" data-toggle="pill" href="#pills-products-gird" role="tab" aria-controls="pills-products-gird" aria-selected="true"><i class="fas fa-th"></i></a></li>
                        <li class="nav-item"><a class="nav-link" id="pills-products-list-tab" data-toggle="pill" href="#pills-products-list" role="tab" aria-controls="pills-products-list" aria-selected="false"><i class="fas fa-list"></i></a></li>
                        </ul>
                        <div class="pagination">
                        <ul>
                            <li class="pagination-pre"><a href="#"><i class="fas fa-caret-left"></i></a></li>
                            <li>
                            <ul class="list-pages">
                                
                                <li><a href="/#/?page=1${
                                    category !== null
                                        ? `&category=${category}`
                                        : ""
                                }">1</a></li>
                                <li><a href="/#/?page=2${
                                    category !== null
                                        ? `&category=${category}`
                                        : ""
                                }">2</a></li>
                                <li><a href="/#/?page=3${
                                    category !== null
                                        ? `&category=${category}`
                                        : ""
                                }">3</a></li>
                                <li><a href="/#/?page=4${
                                    category !== null
                                        ? `&category=${category}`
                                        : ""
                                }">4</a></li>
                                <li><a href="/#/?page=5${
                                    category !== null
                                        ? `&category=${category}`
                                        : ""
                                }">5</a></li>
                            </ul>
                            </li>
                            <li class="pagination-next"><a href="#"><i class="fas fa-caret-right"></i></a></li>
                        </ul>
                        </div>
                    </div>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-products-gird" role="tabpanel" aria-labelledby="pills-products-gird-tab">
                            <div class="row">
                                ${
                                    products.length === 0
                                        ? `<p class="no-product">Không có sản phẩm</p>`
                                        : ""
                                }
                                ${products
                                    .map(
                                        (product) => `
                                    <div class="col-lg-4 col-md-6 col-xs-12">
                                        <div class="product">
                                            <figure class="product__media"><span class="product__label product__label-new"></span><span class="product__label-text">Mới</span><a href="#"><img class="product__image" src="${product.image}" alt="Product"/></a>
                                            <div class="product__action-horizontal"><a class="btn-product-icon btn-wishlist"><span>Yêu thích</span></a><a class="btn-product-icon btn-compare"><span>So sánh</span></a><a class="btn-product-icon btn-quickview"></a></div>
                                            </figure>
                                            <div class="product__body">
                                            <h3 class="product__title"><a href="#">${product.name}</a></h3>
                                            <div class="product__price"> <span class="product__price-new">${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</span>
                                            </div>
                                            <div class="product__action">
                                                <button id="${product.id}" class="btn-cart"><span>Add to cart</span></button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-products-list" role="tabpanel" aria-labelledby="pills-products-list-tab">
                        <div class="row">
                            ${products.map(
                                (product) => `
                                <div class="col-lg-12 col-md-12 col-xs-12">
                                    <div class="product horizontal">
                                        <figure class="product__media"><span class="product__label product__label-new"></span><span class="product__label-text">Mới</span><a href="#"><img class="product__image" src="${product.image}" alt="Product"/></a>
                                        <div class="product__action-horizontal"><a class="btn-product-icon btn-wishlist"><span>Yêu thích</span></a><a class="btn-product-icon btn-compare"><span>So sánh</span></a><a class="btn-product-icon btn-quickview"></a></div>
                                        </figure>
                                        <div class="product__body">
                                        <h3 class="product__title"><a href="#">${product.name}</a></h3>
                                        <div class="product__price"> <span class="product__price-new">${product.price}đ</span>
                                        </div>
                                        <p class="product__desc">${product.description}</p>
                                        <div class="product__action">
                                            <button id="${product.id}" class="btn-cart"><span>Add to cart</span></button>
                                            <button class="btn-product-icon btn-wishlist"><span>Yêu thích</span></button>
                                            <button class="btn-product-icon btn-compare"><span>So sánh</span></button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            `
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="product-list__sidebar">
                    <div class="product-list__categories">
                        <div class="heading title">
                        <h3 class="heading__title">Danh mục sản phẩm</h3>
                        <div class="heading__desc"><img src="../images/titleleft-dark.png" alt="Title"/></div>
                        </div>
                        <ul>
                        <li><a href="#">Rượu ngoại</a></li>
                            <ul>
                                ${categories
                                    .map(
                                        (cate) => `
                                    <li><a href="/#/?category=${cate.id}">${cate.name}</a></li>
                                `
                                    )
                                    .join("")}
                            </ul>
                        </ul>
                    </div>
                    <div class="product-list__compare">
                        <div class="heading title">
                        <h3 class="heading__title">So sánh sản phẩm</h3>
                        <div class="heading__desc"><img src="../images/titleleft-dark.png" alt="Title"/></div>
                        </div>
                        <p>Bạn chưa có bất kỳ sản phẩm nào để so sánh</p>
                    </div>
                    <div class="product-list__tags">
                        <div class="heading title">
                        <h3 class="heading__title">Tag sản phẩm</h3>
                        <div class="heading__desc"><img src="../images/titleleft-dark.png" alt="Title"/></div>
                        </div>
                        <ul>
                        <li><a href="#">Đồng hồ</a></li>
                        <li><a href="#">Túi</a></li>
                        <li><a href="#">Phụ kiện</a></li>
                        <li><a href="#">Giày</a></li>
                        <li><a href="#">Sandal</a></li>
                        <li><a href="#">Áo sơ mi</a></li>
                        <li><a href="#">Nước hoa</a></li>
                        <li><a href="#">Trẻ em</a></li>
                        <li><a href="#">Thời trang nữ</a></li>
                        </ul>
                    </div>
                    <div class="banner-vetical"><img src="../images/product-list-banner-2.png" alt="Banner"/>
                        <div class="banner-text"><span class="banner-text-medium">Rượu vang</span>
                        <div class="banner-text-wrapper"><span class="banner-text-big">Đỏ</span><span class="banner-text-small">1980</span></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    },
};

export default HomeScreen;

import { getCartItems } from "../localStorage";

const Header = {
    after_render: () => {
        
    },
    render: () => {
        const cartItems = getCartItems();
        return `
            <div class="header__top">
                <div class="container">
                <div class="header__left">
                    <ul class="header__top-menu">
                    <li><a href="#">Link</a>
                        <ul>
                        <li><a href="#">Tài khoản của tôi</a></li>
                        <li><a href="#">Trạng thái đơn hàng</a></li>
                        <li><a href="#">Danh sách ưa thích</a></li>
                        <li><a href="/#/cart">Giỏ hàng (${cartItems.length})</a></li>
                        <li><a href="#">Đăng nhập</a></li>
                        <li><a href="#">Đăng ký</a></li>
                        </ul>
                    </li>
                    </ul>
                </div>
                <div class="header__right">
                    <form class="header__search" action="#">
                    <input class="header__search-input" type="text" placeholder="Tìm kiếm ở đây ..."/>
                    <button> <i class="header__search-icon fas fa-search"></i></button>
                    </form>
                </div>
                </div>
            </div>
            <div class="header__middle">
                <div class="container">
                <div class="header__left"><a class="logo" href="/#/">
                    <figure class="logo__wrapper">
                        <h1 class="logo__title">Wine House<span class="logo__desc">Since 1980</span></h1><img class="logo__image-main" src="../images/logo.png" alt=""/><img class="logo__image-bg" src="../images/bg-logo.png" alt=""/>
                    </figure></a></div>
                <div class="header__right">
                    <button class="menu__mobile-toggle">
                    <label for="menu__input-check"><i class="fas fa-bars menu__mobile-bar"></i></label>
                    </button>
                    <input class="menu__input" id="menu__input-check" type="checkbox" hidden="hidden"/>
                    <label class="bg-overlay" for="menu__input-check"></label>
                    <nav class="main__menu">
                    <div class="menu__mobile">
                        <label class="menu__mobile-close" for="menu__input-check"><i class="fas fa-times"></i></label>
                    </div>
                    <form class="mobile__search" action="#" method="get">
                        <input id="mobile__search" type="text" name="mobile__search" placeholder="Tìm kiếm ở đây ..." required="" value=""/>
                        <button class="btn btn-primary" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <ul class="menu sf-arrows">
                        <li><a href="#">Trang chủ</a>
                        </li>
                        <li><a class="sf-with-ul" href="#">Rượu vang đỏ</a>
                        <div class="mega__menu">
                            <div class="row no-gutters">
                            <div class="col-md-8">
                                <div class="menu-col">
                                <div class="row">
                                    <div class="col-md-4">
                                    <div class="menu-title">Rượu ngoại</div>
                                    <ul>
                                        <li><a href="#">Rượu Chivas</a></li>
                                        <li><a href="#">Hàng độc - Rượu độc đáo</a></li>
                                        <li><a href="#">Johnnie Walker</a></li>
                                        <li><a href="#">Rượu Whisky</a></li>
                                        <li><a href="#">Rượu Remy Martin</a></li>
                                        <li><a href="#">Rượu Glenmorangie </a></li>
                                    </ul>
                                    </div>
                                    <div class="col-md-4">
                                    <div class="menu-title">Rượu Vang</div>
                                    <ul>
                                        <li><a href="#">Rượu Chivas</a></li>
                                        <li><a href="#">Hàng độc - Rượu độc đáo</a></li>
                                        <li><a href="#">Johnnie Walker</a></li>
                                        <li><a href="#">Rượu Whisky</a></li>
                                        <li><a href="#">Rượu Remy Martin</a></li>
                                        <li><a href="#">Rượu Glenmorangie </a></li>
                                    </ul>
                                    </div>
                                    <div class="col-md-4">
                                    <div class="menu-title">Rượu ngoại</div>
                                    <ul>
                                        <li><a href="#">Rượu Chivas</a></li>
                                        <li><a href="#">Hàng độc - Rượu độc đáo</a></li>
                                        <li><a href="#">Johnnie Walker</a></li>
                                        <li><a href="#">Rượu Whisky</a></li>
                                        <li><a href="#">Rượu Remy Martin</a></li>
                                        <li><a href="#">Rượu Glenmorangie </a></li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-md-4"><a href="#"> <img src="../images/deposit-photos.jpg" alt="Banner"/></a></div>
                            </div>
                        </div>
                        </li>
                        <li><a href="#">Rượu trắng</a>
                        </li>
                        <li><a href="#">CHAMPAGNE</a>
                        </li>
                        <li><a href="#">Thông tin</a>
                        </li>
                        <li><a href="#">Blog</a>
                        </li>
                        <li><a href="#">Liên hệ</a>
                        </li>
                    </ul>
                    </nav>
                </div>
                <div class="header__cart">
                    <a href="/#/cart" class="header__cart-link">
                        <span class="header__cart-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </span>
                        <span class="header__cart-count">
                            ${cartItems.length}
                        </span>
                    </a>
                <div>
                </div>
            </div>
        `;
    },
};

export default Header;

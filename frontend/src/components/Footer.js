const Footer = {
    render: () => `
            <div class="footer__top">
                <div class="container">
                <div class="row">
                    <div class="col text-center">
                    <div class="footer__top-brand"><img src="../images/brands.png" alt="Brand"></div>
                    </div>
                </div>
                </div>
            </div>
            <div class="footer__middle">
                <div class="container">
                <div class="row">
                    <div class="col-md-2 col-xs-12">
                    <h4 class="footer__title">Thông tin</h4>
                    <ul class="footer__list">
                        <li><a href="#">Về chúng tôi</a></li>
                        <li><a href="#">Giao hàng</a></li>
                        <li><a href="#">Cảm nghĩ</a></li>
                        <li><a href="#">Lưu trữ</a></li>
                        <li><a href="#">Chính sách riêng tư</a></li>
                    </ul>
                    </div>
                    <div class="col-md-2 col-xs-12">
                    <h4 class="footer__title">Mua hàng</h4>
                    <ul class="footer__list">
                        <li><a href="#">Vận chuyển và trả hàng</a></li>
                        <li><a href="#">Mua hàng an toàn</a></li>
                        <li><a href="#">Vận chuyển quốc tế</a></li>
                        <li><a href="#">Liên kết</a></li>
                        <li><a href="#">Dịch vụ giảm giá</a></li>
                    </ul>
                    </div>
                    <div class="col-md-4 col-xs-12">
                    <h4 class="footer__title">Gửi email</h4>
                    <p>Gửi email cho chúng tôi để được hỗ trợ</p>
                    <div class="cta">
                        <form class="input-group">
                        <input class="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary cta__btn" type="button">Gửi</button>
                        </div>
                        </form>
                    </div>
                    <ul class="footer__social">
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                        <li><a href="#"><i class="fab fa-dribbble"></i></a></li>
                        <li><a href="#"><i class="fas fa-rss"></i></a></li>
                    </ul>
                    </div>
                    <div class="col-md-4 col-xs-12">
                    <h4 class="footer__title">Liên hệ</h4>
                    <div class="footer__contact"><span><i class="fas fa-map-marker-alt"></i></span><span>Tầng 4, Tòa nhà Hanoi Group Số 442 Đội Cấn, P. Cống Vị, Q. Ba Đình, Hà Nội</span></div>
                    <div class="footer__contact"><span><i class="fas fa-fax"></i></span><span>(04) 6674 2332</span><span><i class="fas fa-fax"></i></span><span>(04) 3786 8904</span></div>
                    <div class="footer__contact"><span><i class="fas fa-fax"></i></span><span>(08) 6680 9686</span><span><i class="fas fa-envelope"></i></span><span><a href="#">Support@bizweb.vn</a></span></div>
                    </div>
                </div>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="container">
                <div class="copyright">© Copyright 2008-2014 DKT Technology JSC</div>
                <div class="payment"><img src="../images/payments.png" alt="Payment"></div>
                </div>
            </div>
        
        `,
};

export default Footer;

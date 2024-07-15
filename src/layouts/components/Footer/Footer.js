import "./Footer.css";
function Footer() {
  return (
    <footer className="">
      <div className="top-footer">
        <div className="footer-item">
          <a href="">Giới thiệu chung</a>
        </div>
        <div className="footer-item">
          <a href="">Điều khoản sử dụng</a>
        </div>
        <div className="footer-item">
          <a href="">Bảo mật & Quyền riêng tư</a>
        </div>
        <div className="footer-item">
          <a href="">Tin tức</a>
        </div>
      </div>
      <div className="footer-content-list">
        <div className="footer-content">
          <div className="footer-content-header">
            <h4>SẢN PHẨM</h4>
          </div>
          <div className="footer-content-items">
            <ul>
              <li>
                <a href="#" target="_blank">
                  Bảo Hiểm Xe Máy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-content-header">
            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          </div>
          <div className="footer-content-items">
            <ul>
              <li>
                <a href="" target="_blank">
                  Trung Tâm Dịch Vụ Khách Hàng
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  Tạo Hợp Đồng Bảo Hiểm
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  Hướng Dẫn Sửa Đổi, Bổ Sung/Hủy Hợp Đồng Bảo Hiểm
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  Hướng Dẫn Đặt Mua, Thanh Toán, Giao Nhận
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-content-header">
            <h4>XỬ LÝ BỒI THƯỜNG</h4>
          </div>
          <div className="footer-content-items">
            <ul>
              <li>
                <a href="" target="_blank">
                  Bảo Hiểm Xe Máy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-contact">
            <div className="footer-content-header">
              <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
            </div>
            <div className="content-connect">
              <div className="connect-item">
                <a href="https://facebook.com/khar2009" target="_blank">
                  <img src="images/fb icon.png" alt="alt" />
                </a>
              </div>
              <div className="connect-item">
                <a href="https://facebook.com/khar2009" target="_blank">
                  <img src="images/instagram icon.png" alt="alt" />
                </a>
              </div>
              <div className="connect-item">
                <a href="https://facebook.com/khar2009/" target="_blank">
                  <img src="images/youtube icon.png" alt="alt" />
                </a>
              </div>
              <div className="connect-item">
                <a href="https://facebook.com/khar2009/" target="_blank">
                  <img src="images/Group 78.png" alt="alt" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-partner">
            <div className="footer-content-header partner">
              <h4>ĐỐI TÁC</h4>
            </div>
            <div className="content-partner">
              <div className="item">
                <img src="images/logo momo-02.png" alt="alt" />
              </div>
              <div className="item">
                <img src="images/logo-payoo111x63.png" alt="alt" />
              </div>
              <div className="item">
                <img src="images/logo-vnpay.jpg" alt="alt" />
              </div>
              <div className="item">
                <img src="images/logo-zalopay.png" alt="alt" />
              </div>
              <div className="item">
                <img src="images/viettel_pay.png" alt="alt" />
              </div>
              <div className="item">
                <img src="images/logo-vnpt-ca.png" alt="alt" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-address">
        <p>
          Trụ sở chính: Trường Đại Học FPT Hà Nội, Khu Công Nghệ Cao Hòa Lạc, Hà
          Nội
        </p>
        <p>
          Tel:{" "}
          <span style={{ color: "#419FA3", fontWeight: "bold" }}>
            1900 009901 - 0123 455667
          </span>{" "}
          - Email: fcarefpt@gmail.com
        </p>
        <p style={{ marginBottom: 0 }}>
          &COPY; 2024 FCare Insurance, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import { Container } from "react-bootstrap";
import Header from "../../layouts/components/Header/Header";
import "./Home.css";
import Footer from "../../layouts/components/Footer/Footer";

function Home() {
  return (
    <div>
      <Header />
      <div className="middle">
        <div className="bg-img"></div>
        <div className="middle-content">
          <div className="f-title">BẢO HIỂM F-Care</div>
          <p className="f-quote">
            “Đến với F-Care, chúng tôi cung cấp cho bạn dịch vụ bảo hiểm xe máy
            với chi phí và chính sách tốt nhất.
            <br />
            Đồng hành cùng bạn mỗi bước đường. Bảo hiểm xe máy cho mọi hành
            trình!”
          </p>
        </div>
      </div>
      <Container>
        <div className="content">
          <div className="content-header">
            <h2>TẠI SAO CHỌN F-CARE?</h2>
            <p>luôn thấu hiểu, luôn lắng nghe, sự hài lòng là tuyệt đối!</p>
          </div>
          <div className="content-list">
            <div className="content-items">
              <img src="images/icon-1.png" alt="alt" />
              <h3>Chính Sách Tốt Nhất</h3>
              <p>Cung cấp chính sách tốt nhất với rủi ro cực kì thấp.</p>
            </div>
            <div className="content-items">
              <img src="images/icon-2.png" alt="alt" />
              <h3>An Toàn</h3>
              <p>Bảo mật thông tin của khách hàng.</p>
            </div>
            <div className="content-items">
              <img src="images/icon-3.png" alt="alt" />
              <h3>Đảm Bảo Uy Tín</h3>
              <p>Cam kết làm đúng theo hợp đồng và chính sách đã đề ra.</p>
            </div>
          </div>
        </div>
        <div className="service">
          <div className="service-header">
            <h2>DỊCH VỤ KHÁCH HÀNG</h2>
            <p>
              Sự ra đời Trung tâm Dịch vụ khách hàng là minh chứng cho những nỗ
              lực nhằm hoàn thiện phong cách phục vụ khách hàng chuyên nghiệp
              của Bảo hiểm F-Care.
            </p>
          </div>

          <div className="service-list">
            <div className="service-items">
              <a className="simg" href="/" target="_blank">
                <img
                  src="images/ho tro khach hang.png"
                  width="100%"
                  height="100%"
                  alt="alt"
                />
              </a>
              <a
                href="/"
                className="service-items-header"
                style={{ textDecoration: "none" }}
              >
                <h2>TRUNG TÂM DỊCH VỤ KHÁCH HÀNG</h2>
              </a>
              <p>
                Sự ra đời Trung tâm Dịch vụ khách hàng là minh chứng cho những
                nỗ lực nhằm hoàn thiện phong cách phục vụ khách hàng chuyên
                nghiệp của Bảo hiểm F-Care.
              </p>
            </div>
            <div className="service-items">
              <a className="simg" href="/" target="_blank">
                <img
                  src="images/tao hop dong.png"
                  width="100%"
                  height="100%"
                  alt="alt"
                />
              </a>
              <a
                href="/"
                className="service-items-header"
                style={{ textDecoration: "none" }}
              >
                <h2>TẠO HỢP ĐỒNG BẢO HIỂM</h2>
              </a>
              <p>
                Bảo hiểm F-Care là doanh nghiệp đi đầu trong việc bảo đảm tài
                sản và đền bù thỏa đáng cho khách hàng.
              </p>
            </div>
            <div className="service-items">
              <a className="simg" href="/" target="_blank">
                <img
                  src="images/huong dan sua doi .png"
                  width="100%"
                  height="100%"
                  alt="alt"
                />
              </a>
              <a
                href="/"
                className="service-items-header"
                style={{ textDecoration: "none" }}
              >
                <h2>HƯỚNG DẪN SỬA ĐỔI, BỔ SUNG/HỦY HỢP ĐỒNG BẢO HIỂM</h2>
              </a>
              <p>
                Những hướng dẫn chi tiết và lưu ý quan trọng khi quý khách có
                yêu cầu sửa đổi, bổ sung và hủy hợp đồng bảo hiểm.
              </p>
            </div>
            <div className="service-items">
              <a className="simg" href="/" target="_blank">
                <img
                  src="images/huong dan dat mua.png"
                  width="100%"
                  height="100%"
                  alt="alt"
                />
              </a>
              <a
                href="/"
                className="service-items-header"
                style={{ textDecoration: "none" }}
              >
                <h2>HƯỚNG DẪN ĐẶT MUA, THANH TOÁN, GIAO NHẬN</h2>
              </a>
              <p>
                Những hướng dẫn chi tiết và lưu ý quan trọng khi đặt mua, thanh
                toán và giao nhận giúp khách hàng mua thành công bảo hiểm trực
                tuyến.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;

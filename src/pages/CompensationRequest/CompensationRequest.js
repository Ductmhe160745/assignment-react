import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import Header from "../../layouts/components/Header/Header";
import { useContext, useState } from "react";
import { ContractContext } from "../../context/ContractContext";
import { CompensationContext } from "../../context/CompensationContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function CompensationRequest() {
  const { contracts } = useContext(ContractContext);
  const { addAccident, addCompensation } = useContext(CompensationContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const compensation = {
    id: "",
    accidentId: "",
    contractId: "",
    customerId: "",
    dateFiled: "",
    dateApproved: "",
    notes: "",
    claimStatus: "pending",
  };
  const accident = {
    id: "",
    customerId: "",
    dateOfAccident: "",
    accidentLocation: "",
    policeReportNumber: "",
    descriptionOfAccident: "",
    vehicleDamage: "",
    estimatedRepairCost: "",
  };
  const [dataForm, setDataForm] = useState({
    code: "",
    accidentLocation: "",
    policeReportNumber: "",
    vehicleDamage: "",
    dateOfAccident: null,
    estimatedRepairCost: null,
    descriptionOfAccident: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateString) => {
    setDataForm({ ...dataForm, dateOfAccident: date });
  };

  const handleNumberChange = (value) => {
    setDataForm({ ...dataForm, estimatedRepairCost: value });
  };

  const handleSubmit = async (values) => {
    const contractExists = contracts.some(
      (contract) => contract.Code === values.code
    );
    if (!contractExists) {
      setError("Mã bảo hiểm không tồn tại trong hệ thống.");
    } else {
      const formattedValues = values.dateOfAccident.format("DD-MM-YYYY");
      const contractFind = contracts.find(
        (contract) => contract.Code === values.code
      );
      const dateNow = new Date();
      const accidentID = await addAccident({
        ...accident,
        customerId: user.id,
        dateOfAccident: formattedValues,
        accidentLocation: dataForm.accidentLocation,
        policeReportNumber: dataForm.policeReportNumber,
        descriptionOfAccident: dataForm.descriptionOfAccident,
        vehicleDamage: dataForm.vehicleDamage,
        estimatedRepairCost: dataForm.estimatedRepairCost,
      });
      addCompensation({
        ...compensation,
        accidentId: accidentID,
        customerId: user.id,
        contractId: contractFind.id,
        dateFiled: dateNow.toLocaleDateString(),
      });
      message.success("Gửi yêu cầu thành công!");
      setTimeout(() => {
        navigate("/compensation");
      }, 2000);
      setError("");
    }
  };

  return (
    <>
      <Header />
      <h1 style={{ margin: "20px 0 " }} className="text-center">
        Mẫu yêu cầu đền bù
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            width: "100%",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Mã bảo hiểm"
              name="code"
              validateStatus={error ? "error" : ""}
              help={error || ""}
              rules={[{ required: true, message: "Vui lòng nhập mã bảo hiểm" }]}
            >
              <Input
                name="code"
                value={dataForm.code}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Địa điểm tai nạn"
              name="accidentLocation"
              rules={[
                { required: true, message: "Vui lòng nhập địa điểm tai nạn" },
              ]}
            >
              <Input
                name="accidentLocation"
                value={dataForm.accidentLocation}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Số biên bản cảnh sát"
              name="policeReportNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số biên bản cảnh sát",
                },
              ]}
            >
              <Input
                name="policeReportNumber"
                value={dataForm.policeReportNumber}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Tình trạng xe"
              name="vehicleDamage"
              rules={[
                { required: true, message: "Vui lòng nhập tình trạng xe" },
              ]}
            >
              <Input
                name="vehicleDamage"
                value={dataForm.vehicleDamage}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Ngày tai nạn"
              name="dateOfAccident"
              rules={[
                { required: true, message: "Vui lòng chọn ngày tai nạn" },
              ]}
            >
              <DatePicker
                name="dateOfAccident"
                value={dataForm.dateOfAccident}
                onChange={handleDateChange}
              />
            </Form.Item>
            <Form.Item
              label="Chi phí sửa chữa"
              name="estimatedRepairCost"
              rules={[
                { required: true, message: "Vui lòng nhập chi phí sửa chữa" },
              ]}
            >
              <InputNumber
                name="estimatedRepairCost"
                value={dataForm.estimatedRepairCost}
                onChange={handleNumberChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả sự cố"
              name="descriptionOfAccident"
              rules={[{ required: true, message: "Vui lòng nhập mô tả sự cố" }]}
            >
              <TextArea
                rows={4}
                name="descriptionOfAccident"
                value={dataForm.descriptionOfAccident}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 18,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CompensationRequest;

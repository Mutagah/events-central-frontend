import { Col, Row, Form, Input, Button, message, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Step } = Steps;

const Createvent = () => {
  let router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [imgsUpload, setImgsUpload] = useState({});
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    event_start_date: "",
    event_end_date: "",
    ticket_format: "",
    early_booking_end_date: "",
    early_booking_price_regular: "",
    early_booking_price_vip: "",
    location: "",
    regular_price: "",
    vip_price: "",
    vip_no_of_tickets: "",
    regular_no_of_tickets: "",
    description: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImages(e) {
    setImgsUpload({
      ...imgsUpload,
      [e.target.name]: e.target.files[0],
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
        setIsLoading(false);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    Object.keys(imgsUpload).forEach((key) => {
      data.append(key, imgsUpload[key]);
    });

    submitToApi(data);
  }

  function submitToApi(data) {
    fetch(`http://localhost:3000/events`, {
      method: "POST",
      body: data,
    });

    message.success("Event has been created and Posted!");
    router.push("/");
  }

  if (isLoading === true)
    return (
      <Row justify="center" align="middle">
        <div style={{ marginTop: "25%" }}>
          <div className="loader"></div>
        </div>
      </Row>
    );

  return (
    <div>
      <Col span={24}>
        <Row justify="center" align="middle">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontWeight: "bolder", fontSize: 15 }}>
              <i>Register your Event</i>
            </h1>
          </div>
        </Row>
      </Col>

      <Col span={24}>
        <br />
        <Row justify="center" align="middle">
          <Steps
            current={current}
            size="small"
            onChange={(c) => {
              setCurrent(c);
            }}
            style={{ width: "70%" }}
          >
            <Step title="Main Event Details"></Step>
            <Step title="Pricing"></Step>
            <Step title="Miscellaneous"></Step>
          </Steps>
        </Row>
      </Col>

      <div className="displayFormFields">
        <Col span={24}>
          <Row justify="center" align="middle">
            <Form
              layout="vertical"
              size="default"
              onSubmit={(e) => handleSubmit(e)}
              style={{ width: "100%", marginLeft: "30%", marginRight: "30%" }}
            >
              {current == [0] && (
                <>
                  <br />
                  <Form.Item
                    label="Category"
                    style={{ width: "100%" }}
                    required
                  >
                    <select
                      name="category_id"
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option value="">--Please choose a category--</option>
                      {categoryData.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Item>

                  <Form.Item
                    label="Event Title"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      onChange={handleChange}
                      value={formData.title}
                      name="title"
                      placeholder="eg. BDO tournament"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Location"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      name="location"
                      onChange={handleChange}
                      value={formData.location}
                      placeholder="eg. Nairobi"
                      type="text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Event Starting Date"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      type="datetime-local"
                      name="event_start_date"
                      onChange={handleChange}
                      value={formData.event_start_date}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Event Ending Date"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      type="datetime-local"
                      name="event_end_date"
                      onChange={handleChange}
                      value={formData.event_end_date}
                      style={{ width: "100%" }}
                      showTime
                    />
                  </Form.Item>

                  <Form.Item
                    label="Early Booking End Date"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      type="datetime-local"
                      name="early_booking_end_date"
                      onChange={handleChange}
                      value={formData.early_booking_end_date}
                      style={{ width: "100%" }}
                      showTime
                    />
                  </Form.Item>
                </>
              )}
              {current == [1] && (
                <>
                  <br />

                  <Form.Item
                    label="Early Regular Booking Ticket Price ($)"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="early_booking_price_regular"
                      onChange={handleChange}
                      value={formData.early_booking_price_regular}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Early Vip Booking Ticket Price ($)"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="early_booking_price_vip"
                      onChange={handleChange}
                      value={formData.early_booking_price_vip}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Regular Price ($)"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="regular_price"
                      onChange={handleChange}
                      value={formData.regular_price}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Vip Price ($)"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="vip_price"
                      onChange={handleChange}
                      value={formData.vip_price}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Number of Vip Tickets"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="vip_no_of_tickets"
                      onChange={handleChange}
                      value={formData.vip_no_of_tickets}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Number of Regular Tickets"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      min={0}
                      name="regular_no_of_tickets"
                      onChange={handleChange}
                      value={formData.regular_no_of_tickets}
                      type="number"
                    />
                  </Form.Item>
                </>
              )}
              {current == [2] && (
                <>
                  <br />
                  <Form.Item
                    label="Ticket Format"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input
                      name="ticket_format"
                      onChange={handleChange}
                      value={formData.ticket_format}
                      placeholder="eg. BDOTourney"
                      type="text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    style={{ width: "100%" }}
                    required
                  >
                    <TextArea
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                      rows={4}
                    />
                  </Form.Item>

                  <div>
                    <Form.Item
                      label="Banner Image Upload"
                      style={{ width: "100%" }}
                      required
                    >
                      <input
                        type="file"
                        onChange={handleImages}
                        name="banner_img"
                        id="banner_img"
                      />
                    </Form.Item>

                    <Form.Item
                      label="First Image Upload"
                      style={{ width: "100%" }}
                      required
                    >
                      <input
                        type="file"
                        onChange={handleImages}
                        name="image_url1"
                        id="image_url1"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Second Image Upload"
                      style={{ width: "100%" }}
                      required
                    >
                      <input
                        type="file"
                        onChange={handleImages}
                        name="image_url2"
                        id="image_url2"
                      />
                    </Form.Item>
                  </div>

                  <Col span={24}>
                    <Row justify="center" align="middle">
                      <Form.Item style={{ width: "30%" }}>
                        <Button
                          type="submit"
                          onClick={(e) => handleSubmit(e)}
                          style={{
                            width: "100%",
                            backgroundColor: "#d1410a",
                            color: "#fff",
                            height: 50,
                            borderRadius: 10,
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Row>
                  </Col>
                </>
              )}
            </Form>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Createvent;

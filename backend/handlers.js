const { stock, customers } = require("./data/inventory");

const orderHandler = (req, res) => {
  const {
    order,
    size,
    givenName,
    surname,
    email,
    address,
    city,
    province,
    postcode,
    country,
  } = req.body;
  //   customers.forEach((customer) => console.log(customer));
  const returnCustomerSurNames = customers.map((customer) =>
    customer.surname.toLowerCase()
  );
  const returnCustomerEmail = customers.map((customer) => customer.email);
  const returnCustomerAddress = customers.map((customer) => customer.address);
  if (
    returnCustomerSurNames.indexOf(surname.toLowerCase()) !== -1 ||
    returnCustomerEmail.indexOf(email) !== -1 ||
    returnCustomerAddress.indexOf(address) !== -1
  ) {
    return res.status(400).json({
      status: "error",
      error: "repeat-customer",
      message: "There is a limit of 1 item per customer.",
    });
  } else if (stock[order] < 1 || stock["shirt"][size] < 1) {
    return res.status(400).json({
      status: "error",
      error: "unavailable",
      message: "The item that was selected is temporarily unavailable.",
    });
  } else if (
    order === "undefined" ||
    (order === "tshirt" && size === "undefined") ||
    givenName === "undefined" ||
    surname === "undefined" ||
    email.indexOf("@") === -1 ||
    address === "undefined" ||
    city === "undefined" ||
    province === "undefined" ||
    postcode === "undefined" ||
    country === "undefined"
  ) {
    return res.status(400).json({
      status: "error",
      error: "missing-data",
      message: "Some of the required information was not provided",
    });
  } else if (country.toLowerCase() !== "canada") {
    return res.status(400).json({
      status: "error",
      error: "undeliverable",
      message: "Items can only be shipped to Canada",
    });
  } else {
    console.log(order, size);
    res.status(200).json({
      status: "success",
      data: "Your order was successfully submitted!",
    });
  }
};

module.exports = { orderHandler };

const food = [
  {
    name: "Caramel Donuts",
    price: 8,
    image: "https://foodish-api.herokuapp.com/images/dessert/dessert19.jpg",
  },
  {
    name: "Shrimps Rice",
    price: 12,
    image: "https://foodish-api.herokuapp.com/images/rice/rice33.jpg",
  },
  {
    name: "Vegetable Pizza",
    price: 17,
    image: "https://foodish-api.herokuapp.com/images/pizza/pizza8.jpg",
  },
  {
    name: "Cheese Burger",
    price: 35,
    image: "https://foodish-api.herokuapp.com/images/burger/burger3.jpg",
  },
  {
    name: "Italian Pasta",
    price: 23,
    image: "https://foodish-api.herokuapp.com/images/pasta/pasta2.jpg",
  },
  {
    name: "Beef Samosa",
    price: 14,
    image: "https://foodish-api.herokuapp.com/images/samosa/samosa20.jpg",
  },
];
let bill = [];
let num = 1;
let temp = JSON.parse(localStorage.getItem("bill"));

const add = (index) => {
  let count = parseInt(prompt("How many items you want to add", ""));
  console.log(count);
  if ( count  ==NaN ||count  == null) 
    count = 0;
  numOfOrders += count;
  let name = food[index].name;
  let price = food[index].price;
  let totalPrice = count * price;
  let status = "add";
  const sfood = { name, count, price, totalPrice, status };
  const temp1 = JSON.parse(localStorage.getItem("bill")) || [];
  const temp2 = [...temp1, sfood];
  localStorage.setItem("bill", JSON.stringify(temp2));
  temp = JSON.parse(localStorage.getItem("bill"));
  updateNumOfOrders();
  updateTotal();
};
let numOfOrders = 0;
let total = 0;
const updateNumOfOrders = () => {
  numOfOrders = 0;
  for (let index = 0; index < temp.length; index++) {
    numOfOrders += temp[index].count;
    document.getElementById("order").innerHTML = numOfOrders;
  }
  console.log("numOfOrders", numOfOrders);
};
const updateTotal = () => {
  total = 0;
  for (let index = 0; index < temp.length; index++) {
    if (bill.status != "cancel"){
      total += temp[index].totalPrice;
    }
  }
  console.log("total", total);
  document.getElementById("total").innerHTML = total;
};
const renderOrder = (bill, index) => {
  if (bill.status != "cancel") {
    document.getElementById("details-container").innerHTML += `
       <div class="data">
          <span >${bill.name}</span>
          <span >
          ${bill.count}<span >${"*" + "&nbsp" + bill.price + "$"}</span>
          </span>
          <span >${bill.totalPrice + "$"}</span>
          <button class="delete" onclick ="deleteOrder(${index})">X</button>
      </div>
    `;
  }
   else {
    return;
  }
};
const renderOrders = () => {
  for (let i = 0; i < bill.length; i++) {
    renderOrder(bill[i], i);
  }
};

const loadOrders = () => {
  if (localStorage.length == 0 ) {
    document.getElementById("details-container").innerHTML =
      "No Items In Your Cart";
      document.getElementById("info").style.display="none";

  } else {
    bill = JSON.parse(window.localStorage.bill) || [];
    renderOrders();
    updateNumOfOrders();
    updateTotal();
  }
};
const deleteAll = () => {
  localStorage.clear();
  location.reload();
  numOfOrders = 0;
  total = 0;
  updateNumOfOrders();
  updateTotal();
};
const deleteOrder = (index) => {
  bill[index].status = "cancel";
  bill[index].totalPrice = 0;
  bill[index].count = 0;
  localStorage.setItem("bill", JSON.stringify(bill));
  // total -= bill[index].totalPrice;
  // numOfOrders -= bill[index].count;
  // document.getElementById("total").innerHTML = total;
  // document.getElementById("order").innerHTML = numOfOrders;
  location.reload();
  renderOrders();

};


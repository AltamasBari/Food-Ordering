const useState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value;
  const setValue = (newValue) => (value = newValue);
  return [getValue, setValue];
};

const [cart, updCart] = useState([]);
var orderlist = localStorage.getItem("itemlist");
if (orderlist){
  updCart(JSON.parse(orderlist));
}
window.onload = function cartsize() {
  document.getElementById("itemcount").innerText = "(" + cart().length + ")";
  displayitem();
};
function additem(obj) {
  var newitem = {
    id: obj.getAttribute("data-uid"),
    itemname: obj.getAttribute("data-name"),
    itemprice: obj.getAttribute("data-price"),
    quantity: 1,
  };
  cart().push(newitem);
  document.getElementById("itemcount").innerText = "(" + cart().length + ")";
  updCart(cart());
  localStorage.setItem("itemlist", JSON.stringify(cart()));
  obj.innerText = "Added to cart";
  obj.disabled = true;
}

function inc(id) {
  console.log("hi from inc");
  updCart(
    cart().map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );

  console.log(cart());
  localStorage.setItem("itemlist", JSON.stringify(cart()));
  displayitem();
}

function dec(id) {
  console.log("hi from dec");

  updCart(
    cart().map((item) =>
      item.id == id
        ? {
            ...item,
            quantity: item.quantity !== 0 ? item.quantity - 1 : item.quantity,
          }
        : item
    )
  );

  console.log(cart());
  localStorage.setItem("itemlist", JSON.stringify(cart()));
  displayitem();
}

function remove(id) {
  updCart(
    cart().filter((item) => {
      return item.id != id;
    })
  );
  localStorage.setItem("itemlist", JSON.stringify(cart()));
  displayitem();
}

function displayitem() {
  console.log(cart());
  console.log("hiii");
  var total = 0;
  var list1 = document.getElementById("list1");
  list1.innerHTML = "";
  var headtr = document.createElement("tr");
  var content = `<th scope="col">Item Name(s)</th>
  <th scope="col">Decrease qty.</th>
  <th scope="col">Quantity</th>
  <th scope="col">Increase qty.</th>
  <th scope="col">Remove item</th>
  <th scope="col">Price</th>`;
  headtr.innerHTML = content;
  list1.append(headtr);
  function display() {
    cart().map((order) => {
      var newlist = document.createElement("tr");
      var content1 = `<td>${order.itemname}</td>
      <td><button class='btn btn-primary' onclick='dec(${
        order.id
      })'>-</button></td>
      <td>${order.quantity}</td>
      <td><button class="btn btn-primary" onclick='inc(${
        order.id
      })'>+</button></td><td>
      <button class='btn btn-primary' onClick='remove(${
        order.id
      })'>Remove</button></td>
      <td>Rs. ${
        parseInt(order.itemprice.slice(3, 6)) * order.quantity
      } /-</td>`;

      //var td2 = document.createElement("td");
      // td2.innerText = order.itemprice;
      newlist.innerHTML = content1;
      //newlist.append(td1, td2);
      list1.append(newlist);

      total += parseInt(order.itemprice.slice(3, 6)) * order.quantity;
    });
    var final = document.createElement("tr");
    var td3 = document.createElement("th");
    td3.colSpan = "5";
    var td4 = document.createElement("th");
    td3.innerText = "Total";
    td4.innerText = "Rs. " + total + " /-";
    final.append(td3, td4);
    list1.append(final);
  }
  display();
}

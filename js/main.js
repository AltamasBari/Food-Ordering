var cart = [];

function additem(obj) {
  var newitem = {
    uniqueid: obj.getAttribute("data-uid"),
    itemname: obj.getAttribute("data-name"),
    itemprice: obj.getAttribute("data-price"),
  };
  cart.push(newitem);
  document.getElementById("itemcount").innerText = "(" + cart.length + ")";
  localStorage.setItem("itemlist", JSON.stringify(cart));
}

function displayitem() {
  console.log("hiii");
  var total = 0;
  var list1 = document.getElementById("list1");
  var orderlist = JSON.parse(localStorage.getItem("itemlist"));
  if (orderlist) {
    console.log(orderlist);
    orderlist.map((order) => {
      var newlist = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      td1.innerText = order.itemname;
      td2.innerText = order.itemprice;
      total += parseInt(order.itemprice.slice(3, 6));
      newlist.append(td1, td2);
      list1.append(newlist);
    });
    var final = document.createElement("tr");
    var td3 = document.createElement("th");
    var td4 = document.createElement("th");
    td3.innerText = "Total";
    td4.innerText = "Rs. " + total + " /-";
    final.append(td3, td4);
    list1.append(final);
    return true;
  } else {
    return false;
  }
}

function opencart() {
  window.location = "../cart.html";
  console.log("hiii");
  var total = 0;
  var list1 = document.getElementById("list1");
  var orderlist = JSON.parse(localStorage.getItem("itemlist"));
  if (orderlist) {
    console.log(orderlist);
    orderlist.map((order) => {
      var newlist = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      td1.innerText = order.itemname;
      td2.innerText = order.itemprice;
      total += parseInt(order.itemprice.slice(3, 6));
      newlist.append(td1, td2);
      list1.append(newlist);
    });
    var final = document.createElement("tr");
    var td3 = document.createElement("th");
    var td4 = document.createElement("th");
    td3.innerText = "Total";
    td4.innerText = "Rs. " + total + " /-";
    final.append(td3, td4);
    list1.append(final);
    return true;
  } else {
    return false;
  }
}

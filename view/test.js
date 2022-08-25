function getAllProducts() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products",
        success: function (data) {
            let table = document.getElementById("list");
            if (table.style.display === "none") {
                table.style.display = "block"
                document.getElementById("form").style.display = "none"
            }
            document.getElementById("list").innerHTML = displayTable(data)
            console.log(data)
        }

    })
}

function displayTable(data) {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>STT</th>"
    result += "<th>Name</th>"
    result += "<th>Amount</th>"
    result += "<th>Price</th>"
    result += "<th>Category</th>"
    result += "<th colspan='2'>Action</th>"
    result += "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<th>" + (i+1) + "</th>"
        result += "<th>" + data[i].name + "</th>"
        result += "<th>" + data[i].amount + "</th>"
        result += "<th>" + data[i].price + "</th>"
        result += "<th>" + data[i].category.nameCategory + "</th>"
        result += "<th><button onclick='update(" + data[i].id + ")'>Update</button></th>"
        result += "<th><button onclick='deleteProduct(" + data[i].id + ")'>Delete</button></th>"
        result += "</tr>"
    }
    result += "</table>"
    return result
}

function formCreate(data) {
    let result = ""
    result += "<form>"
    result += "<table>"
    result += "<tr>"
    result += "<th>Name</th>"
    result += "<td><label><input type='text' id='name'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Amount</th>"
    result += "<td><label><input type='text' id='amount'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Price</th>"
    result += "<td><label><input type='text' id='price'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Category</th>"
    result += "<td><select id='select'>"
    for (let i = 0; i < data.length; i++) {
        result += "<option value=" + data[i].id + ">" + data[i].nameCategory + "</option>"
    }
    result += "</select>"
    result += "</td>"
    result += "</tr>"
    result += " <tr>"
    result += "<td colspan='2'>"
    result += "<button id='button' onclick='CreateProduct()'>Create</button>"
    result += "</td>"
    result += "</tr>"
    result += "</table>"
    result += "</form>"
    result += "</div>"
    document.getElementById("list").style.display = "none"
    return result
}

let idProduct;

function update(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/categories/",
        success: function (data) {
            document.getElementById("form").innerHTML = formUpdate(data)
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/products/" + id,
                success: function (data) {
                    document.getElementById("id").value = data.id
                    document.getElementById("name").value = data.name
                    document.getElementById("amount").value = data.amount
                    document.getElementById("price").value = data.price
                }
            })
        }
    })
}


function formUpdate(data) {
    let result = ""
    result += "<form>"
    result += "<table>"
    result += "<tr>"
    result += "<th>ID</th>"
    result += "<td><label><input type='text' id='id' readonly></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Name</th>"
    result += "<td><label><input type='text' id='name'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Amount</th>"
    result += "<td><label><input type='text' id='amount'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Price</th>"
    result += "<td><label><input type='text' id='price'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Category</th>"
    result += "<td><select id='select'>"
    for (let i = 0; i < data.length; i++) {
        result += "<option value=" + data[i].id + ">" + data[i].nameCategory + "</option>"
    }
    result += "</select>"
    result += "</td>"
    result += "</tr>"
    result += " <tr>"
    result += "<td colspan='2'>"
    result += "<button id='button' onclick='updateProduct()'>Update</button>"
    result += "</td>"
    result += "</tr>"
    result += "</table>"
    result += "</form>"
    result += "</div>"
    document.getElementById("form").style.display = "block"
    document.getElementById("list").style.display = "none"
    return result
}

function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/products/" + id,
        success: getAllProducts
    })
}

function updateProduct() {
    let id = $('#id').val()
    let name = $('#name').val()
    let amount = $('#amount').val()
    let price = $('#price').val()
    let category = $('#select').val()

    let product = {
        id: id,
        name: name,
        amount: amount,
        price: price,
        category: {
            id: category
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success: function () {
            getAllProducts()
            // document.getElementById("form").style.display = "none"
        }
    })
    event.preventDefault()

}


function CreateProduct() {
    let name = $('#name').val()
    let amount = $('#amount').val()
    let price = $('#price').val()
    let category = $('#select').val()

    let product = {
        name: name,
        amount: amount,
        price: price,
        category: {
            id: category
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success: getAllProducts
    })
    event.preventDefault()
}


function getAllCategories() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/categories",
        success: function (data) {
            document.getElementById("form").innerHTML = formCreate(data)
            document.getElementById("form").style.display = "block"
        }
    })
}
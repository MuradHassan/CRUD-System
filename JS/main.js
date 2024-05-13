var getProductName = document.getElementById('productName');
var getProductPrice = document.getElementById('productPrice');
var getProductCategory = document.getElementById('productCategory');
var getProductDescription = document.getElementById('productDescription');
var getAddProduct = document.getElementById('addProduct');
var inputs = document.getElementsByClassName('form-control');
var products = [];
var indexUpdate = 0;

if (JSON.parse(localStorage.getItem('productsList')) != null) {
    products = JSON.parse(localStorage.getItem('productsList'))
    displayData();
}

function getData() {

    var product =
    {
        name: getProductName.value,
        price: getProductPrice.value,
        category: getProductCategory.value,
        description: getProductDescription.value
    }
    products.push(product)
    localStorage.setItem('productsList', JSON.stringify(products))
}
function displayData() {
    var data = '';
    for (var i = 0; i < products.length; i++) {
        data += `
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="getUpdateData(${i})" class="btn btn-warning">Update</button><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('bodyData').innerHTML = data;

}
function clearData() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
        inputs[i].classList.remove('is-valid')
    }
    NameResult = false
    PriceResult = false
    categoryResult = false


}
getAddProduct.onclick = function () {
    if (NameResult && PriceResult && categoryResult) {
        btnOptions()
        displayData()
        clearData()
    }

}

function deleteData(index) {
    products.splice(index, 1)
    localStorage.setItem('productsList', JSON.stringify(products))
    displayData()
}

function getUpdateData(index) {
    indexUpdate = index;
    var currentData = products[index];
    getProductName.value = currentData.name
    getProductPrice.value = currentData.price
    getProductCategory.value = currentData.category
    getProductDescription.value = currentData.description
    document.getElementById('addProduct').innerHTML = 'Update Product'
}

function searchData(dataSearch) {

    var data = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(dataSearch.toLowerCase())) {
            data += `
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="getUpdateData(${i})" class="btn btn-warning">Update</button><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `}
    }
    document.getElementById('bodyData').innerHTML = data;


}

function btnOptions() {
    if (getAddProduct.innerHTML == 'Add Product') {
        getData()
    }
    else if (getAddProduct.innerHTML == 'Update Product') {
        setUpdateData()
    }
}

function setUpdateData() {
    products[indexUpdate].name = getProductName.value;
    products[indexUpdate].price = getProductPrice.value;
    products[indexUpdate].category = getProductCategory.value;
    products[indexUpdate].description = getProductDescription.value;
    localStorage.setItem('productsList', JSON.stringify(products));
    document.getElementById('addProduct').innerHTML = 'Add Product'
}

/*start regular Expretion*/
var NameResult = false
var PriceResult = false
var categoryResult = false

productName.onkeyup = function () {
    var regularName = /^[A-Z][a-z]{3,}$/;
    if (regularName.test(productName.value)) {
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
        alertName.classList.add('d-none')
        NameResult = true
    } else {
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
        alertName.classList.remove('d-none')
        NameResult = false
    }
}

productPrice.onkeyup = function () {
    var regularPrice = /^[0-9]{1,7}$/;
    if (regularPrice.test(productPrice.value)) {
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        alertPrice.classList.add('d-none')
        PriceResult = true
    } else {
        productPrice.classList.add('is-invalid')
        productPrice.classList.remove('is-valid')
        alertPrice.classList.remove('d-none')
        PriceResult = false
    }
}

productCategory.onkeyup = function () {
    var regularCategory = /^[A-Za-z]{2,}$/;
    if (regularCategory.test(productCategory.value)) {
        productCategory.classList.add('is-valid')
        productCategory.classList.remove('is-invalid')
        alertCategory.classList.add('d-none')
        categoryResult = true

    } else {
        productCategory.classList.add('is-invalid')
        productCategory.classList.remove('is-valid')
        alertCategory.classList.remove('d-none')
        categoryResult = false
    }
}




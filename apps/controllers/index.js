let productService = new ProductService();

const domId = (id) => document.getElementById(id);

// Lấy danh sách sản phẩm
const getProductList = () => { 
    productService.getList().then(function(response){ 
        renderProductList(response.data);       
    });  
}

// In danh sách sản phẩm
const renderProductList = (data) => {
    let content ="";  
    for(var i=0; i < data.length; i++){
        content +=`
            <tr>
                <td>${i+1}</td> 
                <td>${data[i].name}</td>
                <td>${data[i].price}</td>
                <td>${data[i].screen}</td>
                <td>${data[i].backCamera}</td>
                <td>${data[i].frontCamera}</td>
                <td>${data[i].img}</td>
                <td>${data[i].desc}</td>
                <td>${data[i].type}</td>
                <td>
                    <button onclick="openUpdateProduct('${data[i].id}')" class="btn btn-primary" data-toggle="modal" data-target="#myModal">SỬA</button>    
                    <button onclick="deleteProduct('${data[i].id}')" class="btn btn-danger">XÓA</button>  
                </td>
            </tr>
        `;
    }
    
    domId("tblDanhSachSP").innerHTML = content;
}

// Modal - thêm sản phẩm
domId("btnThemSP").onclick = function () {
    document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
    document.querySelector(".modal-footer").innerHTML = "<button onclick='addProduct()' class='btn btn-primary'>THÊM</button>";
}; 

// Thêm mới sản phẩm
const addProduct = () => {
    let name = domId("TenSP").value;
    let price = domId("GiaSP").value;
    let screen = domId("ManHinhSP").value;
    let backCamera = domId("CamSauSP").value;
    let frontCamera = domId("CamTruocSP").value;
    let img = domId("HinhSP").value;
    let desc = domId("MoTaSP").value;
    let type = domId("loaiSP").value;

    var product = new Products (name, price, screen, backCamera, frontCamera, img, desc, type);

    productService.addProduct(product).then(function (){
        alert("Thêm sản phẩm thành công.");
        getProductList(); 
    });
}

// Delete product
const deleteProduct = (id) => {
    productService.deleteProduct(id).then(function(){
      alert("Xóa sản phẩm thành công.");
      getProductList();
    });
}

// Modal - sửa sản phẩm
const openUpdateProduct = (id) => {
    document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
    document.querySelector(".modal-footer").innerHTML = `<button onclick="updateProduct(${id})" class='btn btn-primary'>SỬA</button>`;

    productService.getById(id).then(function(response){
        domId("TenSP").value = response.data.name;
        domId("GiaSP").value = response.data.price;
        domId("ManHinhSP").value = response.data.screen;
        domId("CamSauSP").value = response.data.backCamera;
        domId("CamTruocSP").value = response.data.frontCamera;
        domId("HinhSP").value = response.data.img;
        domId("MoTaSP").value = response.data.desc;
        domId("loaiSP").value = response.data.type;
    });
}

// Sửa sản phẩm
const updateProduct = (id) => {
    let name = domId("TenSP").value;
    let price = domId("GiaSP").value;
    let screen = domId("ManHinhSP").value;
    let backCamera = domId("CamSauSP").value;
    let frontCamera = domId("CamTruocSP").value;
    let img = domId("HinhSP").value;
    let desc = domId("MoTaSP").value;
    let type = domId("loaiSP").value;

    var product = new Products (name, price, screen, backCamera, frontCamera, img, desc, type);

    productService.updateProduct(id, product).then(function (){
        alert("Sửa sản phẩm thành công.");
        getProductList(); 
    });
};

window.onload = function () {
    getProductList();
};
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

// edit openModal - thêm sản phẩm
domId("btnThemSP").onclick = function () {
    document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
    document.querySelector(".modal-footer").innerHTML = "<button onclick='addProduct()' class='btn btn-primary'>THÊM</button>";
}; 

// Thêm mới sản phẩm
const addProduct = () => {
    let name = domId("tenSP").value;
    let price = domId("giaSP").value;
    let screen = domId("manHinhSP").value;
    let backCamera = domId("camSauSP").value;
    let frontCamera = domId("camTruocSP").value;
    let img = domId("hinhSP").value;
    let desc = domId("moTaSP").value;
    let type = domId("loaiSP").value;

    // validatefield
    if(!validateField(name, price, screen, backCamera, frontCamera, img, desc, type)) return;
    
    // new product
    var product = new Products (name, price, screen, backCamera, frontCamera, img, desc, type);

    productService.addProduct(product).then(function (){
        alert("Thêm sản phẩm thành công.");
        domId("resetForm").reset(); // reset form sau khi thêm sản phẩm
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

// edit openModal - sửa sản phẩm
const openUpdateProduct = (id) => {
    document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
    document.querySelector(".modal-footer").innerHTML = `<button onclick="updateProduct(${id})" class='btn btn-primary'>SỬA</button>`;

    // Hiển thị infor sản phẩm cần sửa lên modal
    productService.getById(id).then(function(response){
        domId("tenSP").value = response.data.name;
        domId("giaSP").value = response.data.price;
        domId("manHinhSP").value = response.data.screen;
        domId("camSauSP").value = response.data.backCamera;
        domId("camTruocSP").value = response.data.frontCamera;
        domId("hinhSP").value = response.data.img;
        domId("moTaSP").value = response.data.desc;
        domId("loaiSP").value = response.data.type;
    });
}

// Sửa sản phẩm
const updateProduct = (id) => {
    let name = domId("tenSP").value;
    let price = domId("giaSP").value;
    let screen = domId("manHinhSP").value;
    let backCamera = domId("camSauSP").value;
    let frontCamera = domId("camTruocSP").value;
    let img = domId("hinhSP").value;
    let desc = domId("moTaSP").value;
    let type = domId("loaiSP").value;

    var product = new Products (name, price, screen, backCamera, frontCamera, img, desc, type);

    productService.updateProduct(id, product).then(function (){
        alert("Sửa sản phẩm thành công.");
        domId("resetForm").reset(); // reset form sau khi sửa sản phẩm
        getProductList(); 
    });
};

// Validate form 
const validateField = (name, price, screen, backCamera, frontCamera, img, desc, type) => {
    let checkFlg = true;
    
    // RegExr
    let reName = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,50}$/;
    let rePrice = /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/;
    let reScreen = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,20}$/;
    let reBackCamera = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,20}$/;
    let reFrontCamera = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,20}$/;
    let reImg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if(name == "") {
        setErr("tbTen", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!reName.test(name)) {
            setErr("tbTen", "* Tên sản phẩm có độ dài từ 2 đến 50 kí tự!!");
            checkFlg = false;
        } else {
            setErr("tbTen", "");
        }
    }
    
    if(price == "") {
        setErr("tbGia", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!rePrice.test(price)) {
            setErr("tbGia", "* Nhập giá dưới dạng chữ số!!");
            checkFlg = false;
        } else {
            setErr("tbGia", "");
        }
    }

    if(screen == "") {
        setErr("tbManHinh", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!reScreen.test(screen)) {
            setErr("tbManHinh", "* Thông tin màn hình có độ dài từ 2 đến 20 kí tự!!");
            checkFlg = false;
        } else {
            setErr("tbManHinh", "");
        }
    }

    if(backCamera == "") {
        setErr("tbCamSau", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!reBackCamera.test(backCamera)) {
            setErr("tbCamSau", "* Thông tin camera có độ dài từ 2 đến 20 kí tự!!");
            checkFlg = false;
        } else {
            setErr("tbCamSau", "");
        }
    }

    if(frontCamera == "") {
        setErr("tbCamTruoc", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!reFrontCamera.test(frontCamera)) {
            setErr("tbCamTruoc", "* Thông tin camera trước có độ dài từ 2 đến 20 kí tự!!");
            checkFlg = false;
        } else {
            setErr("tbCamTruoc", "");
        }
    }

    if(img == "") {
        setErr("tbHinhSP", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        if(!reImg.test(img)) {
            setErr("tbHinhSP", "* Nhập URL ảnh sản phẩm!!");
            checkFlg = false;
        } else {
            setErr("tbHinhSP", "");
        }
    }

    if(desc == "") {
        setErr("tbMoTa", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    }  else {
        setErr("tbMoTa", "");
    }

    if(type == "") {
        setErr("tbLoaiSP", "* Trường bắt buộc nhập!!");
        checkFlg = false;
    } else {
        setErr("tbLoaiSP", "");
    }
    
    return checkFlg;
}

// Ser error mess
const setErr = (elementById, errorMess) => document.getElementById(elementById).innerHTML = errorMess;

// Reset form nếu tắt modal 
$('#myModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    resetForm();
});

const resetForm = () => {
    setErr("tbTen", "");
    setErr("tbGia", "");
    setErr("tbManHinh", "");
    setErr("tbCamSau", "");
    setErr("tbCamTruoc", "");
    setErr("tbHinhSP", "");
    setErr("tbMoTa", "");
    setErr("tbLoaiSP", "");
}

window.onload = () => getProductList();

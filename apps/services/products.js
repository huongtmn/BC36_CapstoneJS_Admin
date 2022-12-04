// Call API 
function ProductService() { 
    // Lấy danh sách
    this.getList = function () {
        return axios({
            url:"https://63661fbc046eddf1baf95efc.mockapi.io/Products",
            method: "GET",
        });
    };

    // Thêm sản phẩm
    this.addProduct = function (data) {
        return axios({ 
            url:"https://63661fbc046eddf1baf95efc.mockapi.io/Products",
            method: "POST",
            data: data,
        });
    };

    // Xóa sản phẩm
    this.deleteProduct = function (id) {
        return axios({ 
            url:`https://63661fbc046eddf1baf95efc.mockapi.io/Products/${id}`,
            method: "DELETE",
        });
    }

    // Sửa sp - lấy id
    this.getById = function (id) {
        return axios({
        url:`https://63661fbc046eddf1baf95efc.mockapi.io/Products/${id}`,
        method: "GET",
    });
    }

    // Sửa thông tin sản phẩm
    this.updateProduct = function (id, data) {
        return axios({
        url:`https://63661fbc046eddf1baf95efc.mockapi.io/Products/${id}`,
        method: "PUT",
        data: data,
    });
    }
}
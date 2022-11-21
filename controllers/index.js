let productsService = new ProductsService();

const domId = (id) => document.getElementById(id);

let getProductList = () => {
  productsService.getList().then((response) => {
    renderProductList(response.data);
  });
};

let renderProductList = (data) => {
  let content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
    <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].screen}</td>
        <td>${data[i].backCamera}</td>
        <td>${data[i].frontCamera}</td>
        <td>${data[i].img}</td>
        <td>${data[i].desc}</td>
        <td>${data[i].type}</td>
   
</tr>
        `;
  }
  domId("tblDanhSachSP").innerHTML = content;
};

window.onload = () => {
    getProductList();
  };
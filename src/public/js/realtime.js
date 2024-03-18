const socketClient=io()

socketClient.on("enviodeproducts",(obj)=>{
    updateProductList(obj)
})


function updateProductList(productList) {
 
    const productsDiv  = document.getElementById('list-products')

    let productosHTML = "";
  
    productList.forEach((product) => {
        productosHTML += `<div class="bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
        <div class="card-header bg-black text-white">code: ${product.code}</div>
        <div class="card-body">
            <h4 class="card-title text-white">${product.title}</h4>
            <p class="card-text">
            <ul class="card-text">
            <li>ID: ${product._id}</li>
            <li>Descripción: ${product.description}</li>
            <li>Precio: $${product.price}</li>
            <li>Categoria: ${product.category}</li>
            <li>Status: ${product.status}</li>
            <li>Stock: ${product.stock}</li>
            Imagen: <img src="${product.thumbnail}" alt="img" class="img-thumbnail img-fluid">        </ul>
            </p>
        </div>
        <div class="d-flex justify-content-center mb-4">
        <button type="button" class="btn btn-danger delete-btn" onclick="deleteProduct('${String(product._id)}')">Eliminar</button>
        </div>
        
    </div>
</div>`;
    });
  
    productsDiv .innerHTML = productosHTML;
  }


  let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked; 
  
    socketClient.emit("addProduct", {
      title,
      description,
      stock,
      thumbnail,
      category,
      price,
      code,
      status, 
  
    });
  
    form.reset();
  });


  
  //para eliminar por ID
document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = deleteidinput.value;
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  })



//para eliminar el producto directamente 
function deleteProduct(productId) {
  socketClient.emit("deleteProduct", productId);
}
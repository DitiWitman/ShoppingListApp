using Microsoft.AspNetCore.Mvc;
using DAL.Models;
using BL.Interfaces;


namespace SoppingListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Products>> GetAll()
        {
            var products = _productService.GetAllproducts();
            return Ok(products);
        }

        [HttpPost]
        public ActionResult AddProduct([FromBody] Products product)
        {
            _productService.AddProduct(product); 
            return CreatedAtAction(nameof(GetAll), new { id = product.id }, product);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProductQuantity(int id, [FromBody] int Newamount)
        {
            _productService.UpdateProductAmount(id, Newamount); 
            return NoContent();
        }
        [HttpPost("confirm-order")]
        public IActionResult ConfirmOrder([FromBody] List<Products> products)
        {
            if (products == null || !products.Any())
                return BadRequest("No products to save.");

            _productService.ConfirmOrder(products); // קורא לפונקציה לאישור הזמנה

            return Ok("Order confirmed and products saved.");
        }


        [HttpGet("total-items")]
        public ActionResult<int> GetTotalItems()
        {
            var totalItems = _productService.GetTotalItems(); 

            return Ok(totalItems);
        }

    }
}

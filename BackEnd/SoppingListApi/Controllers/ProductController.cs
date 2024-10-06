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
    }
}

using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL.Services
{
    public class ProductService : IProductRepository
    {

        private readonly ShoppingListContext _context;

        public ProductService(ShoppingListContext context)
        {
            _context = context;
        }

        public IEnumerable<Products> GetAllproducts()
        {
            return _context.Products.ToList(); 
        }
    }
}

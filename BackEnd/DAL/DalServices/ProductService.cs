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

        public void AddProduct(Products product)
        {
            var NewProduct=_context.Products.FirstOrDefault(p=>p.name == product.name);
            if (NewProduct != null)
            {
                product.amount += NewProduct.amount;
            }
            else
            {
                _context.Products.Add(product);
            }
            _context.SaveChanges();

        }
        public void UpdateProductAmount(int productId, int amount)
        {
            var product = _context.Products.Find(productId);
            if (product != null)
            {
                product.amount = amount; 
                _context.SaveChanges(); 
            }
        }
        public void AddProducts(List<Products> products)
        {
            foreach (var product in products)
            {
                AddProduct(product);
            }
        }

        public void DeleteProduct(int productId)
        {
            var product = _context.Products.Find(productId);
            if(product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
        public int GetTotalItems()
        {
            return _context.Products.Sum(p => p.amount); 
        }

    }
}

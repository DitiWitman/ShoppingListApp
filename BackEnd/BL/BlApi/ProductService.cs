using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.BlApi
{
    public class ProductService : Interfaces.IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Products> GetAllproducts()
        {
            return _productRepository.GetAllproducts();
        }

        public void  AddProduct(Products product)
        {
            _productRepository.AddProduct(product); 
        }

        public void UpdateProductAmount(int productId, int amount)
        {
            _productRepository.UpdateProductAmount(productId, amount); 
        }

        public void AddProducts(List<Products> products) 
        {
            _productRepository.AddProducts(products); 
        }

        public void ConfirmOrder(List<Products> products) 
        {
            AddProducts(products); 
        }
        public int GetTotalItems()
        {
            return _productRepository.GetTotalItems(); 
        }


    }
}

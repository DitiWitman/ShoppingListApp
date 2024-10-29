using System.Collections.Generic;
using DAL.Models;

namespace BL.Interfaces
{
    public interface IProductService
    {
        IEnumerable<Products> GetAllproducts(); // get all products

        void AddProduct(Products product);

        void UpdateProductAmount(int productId, int amount);
        void DeleteProduct(int productId);

        public void ConfirmOrder(List<Products> products);

        int GetTotalItems();

    }
}
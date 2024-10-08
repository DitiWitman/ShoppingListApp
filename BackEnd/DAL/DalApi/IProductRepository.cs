using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL.Interfaces
{
    public interface IProductRepository
    {
        IEnumerable<Products> GetAllproducts();

        void AddProduct(Products product);

        void AddProducts(List<Products> products);

        void UpdateProductAmount(int productId, int amount);
        int GetTotalItems();
    }
}

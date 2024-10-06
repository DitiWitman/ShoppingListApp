using System.Collections.Generic;
using DAL.Models;

namespace BL.Interfaces
{
    public interface IProductService
    {
        IEnumerable<Products> GetAllproducts(); // get all products
    }
}
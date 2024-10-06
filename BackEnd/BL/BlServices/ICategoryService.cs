using System.Collections.Generic;
using DAL.Models;

namespace BL.Interfaces
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAllCategories(); 
    }
}

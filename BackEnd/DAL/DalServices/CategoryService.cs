using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ShoppingListContext _context;

        public CategoryRepository(ShoppingListContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _context.Categories.ToList(); // Fetching all categories
        }
    }
}

using System.Collections.Generic;
using BL.Interfaces;
using DAL.Interfaces;
using DAL.Models;

namespace BL.BlApi
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _categoryRepository.GetAllCategories();
        }

        


    } 
}
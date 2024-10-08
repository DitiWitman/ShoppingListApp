using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext(DbContextOptions<ShoppingListContext> options) : base(options)
        {
            
            UpdateCategories();
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Products> Products { get; set; }

        private void UpdateCategories()
        {
            var categories = new List<Category>
    {
        new Category { name = "מוצרי ניקיון" },
        new Category { name = "גבינות" },
        new Category { name = "ירקות ופירות" },
        new Category { name = "בשר ודגים" },
        new Category { name = "מאפים" }
    };

            foreach (var category in categories)
            {
                if (!Categories.Any(c => c.name == category.name))
                {
                    Categories.Add(category);
                }
            }

            SaveChanges();
        }

    }
}

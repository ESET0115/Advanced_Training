using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Model.Components.Pages;

namespace Model.Data
{
    public class ModelContext : DbContext
    {
        public ModelContext (DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public DbSet<Model.Components.Pages.Student> Student { get; set; } = default!;
    }
}

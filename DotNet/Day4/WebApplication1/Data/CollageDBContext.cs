using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class CollageDBContext:DbContext
    {
        public CollageDBContext(DbContextOptions<CollageDBContext> options) : base(options)
        {

        }
        public DbSet<studentDTO> students { get; set; }
    }
}

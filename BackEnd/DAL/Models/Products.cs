namespace DAL.Models
{
    public class Products
    {
        public int id { get; set; }
        public string name { get; set; }=string.Empty;
        public int amount { get; set; }
        public int categoryid { get; set; }
       // public Category Category { get; set; }
    }
}

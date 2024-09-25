using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace web_api_05.Models
{
    public class Perfume
    {
        public int Id { get; set; }
        public string Marca { get; set; }
        public string Nome { get; set; }
        public DateTime DataFabricacao { get; set; }
        public DateTime? DataVencimento { get; set; }
        public double Valor { get; set; }
    }
}
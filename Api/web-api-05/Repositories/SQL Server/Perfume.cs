using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using web_api_05.Models;
using System.Web.Caching;

namespace web_api_05.Repositories.SQL_Server
{
    public class Perfume
    {
        private readonly SqlConnection _conexao;
        private readonly SqlCommand _cmd;
        //parâmetro para o método construtor de médico
        public Perfume(string conexao)
        {
            _conexao = new SqlConnection(conexao);
            _cmd = new SqlCommand();
            _cmd.Connection = _conexao;
        }
        public List<Models.Perfume> SelectAll()
        {
            List<Models.Perfume> perfumes = new List<Models.Perfume>();
            using (_conexao)
            {
                _conexao.Open();
                using (_cmd)
                {
                    _cmd.CommandText = "select Id, Marca, Nome, DataFabricacao, DataVencimento, Valor from Perfumes;";
                    using (SqlDataReader dr = _cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            Models.Perfume perfume = new Models.Perfume();
                            perfume.Id = (int)dr["Id"];
                            perfume.Marca = dr["Marca"].ToString();
                            perfume.Nome = dr["Nome"].ToString();
                            perfume.DataFabricacao = (DateTime)dr["DataFabricacao"];
                            decimal valorDecimal = (decimal)dr["Valor"];
                            perfume.Valor = (double)valorDecimal;

                            if (!(dr["DataVencimento"] is DBNull))
                                perfume.DataVencimento = (DateTime)dr["DataVencimento"];

                            perfumes.Add(perfume);
                        }
                    }
                }
            }
            return perfumes;
        }
        public Models.Perfume SelectById(int id)
        {
            Models.Perfume perfume = new Models.Perfume();
            using (_conexao)
            {
                _conexao.Open();
                using (_cmd)
                {
                    _cmd.CommandText = "select Id, Marca, Nome, DataFabricacao, DataVencimento, Valor from Perfumes where id = @id;";
                    _cmd.Parameters.Add(new SqlParameter("@id", SqlDbType.Int)).Value = id;
                    using (SqlDataReader dr = _cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            perfume.Id = (int)dr["Id"];
                            perfume.Marca = dr["Marca"].ToString();
                            perfume.Nome = dr["Nome"].ToString();
                            perfume.DataFabricacao = (DateTime)dr["DataFabricacao"];
                            decimal valorDecimal = (decimal)dr["Valor"];
                            perfume.Valor = (double)valorDecimal;

                            if (!(dr["DataVencimento"] is DBNull))
                                perfume.DataVencimento = (DateTime)dr["DataVencimento"];
                        }
                    }
                    if (perfume.Id == 0)
                        return null;
                }
            }
            return perfume;
            
        }
        public List<Models.Perfume> SelectByName(string nome)
        {


            List<Models.Perfume> perfumes = new List<Models.Perfume>();
            using (_conexao)
            {
                _conexao.Open();
                //conexao.Close();
                //conexao.Dispose();

                //Insert

                using (_cmd)
                {
                    _cmd.Connection = _conexao;
                    _cmd.CommandText = $"select Id, Marca, Nome, DataFabricacao, DataVencimento, Valor from Perfumes where nome like @Nome;";
                    _cmd.Parameters.Add(new SqlParameter("@Nome", SqlDbType.VarChar)).Value = $"%{nome}%";


                    using (SqlDataReader dr = _cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            Models.Perfume perfume = new Models.Perfume();
                            perfume.Id = (int)dr["Id"];
                            perfume.Marca = dr["Marca"].ToString();
                            perfume.Nome = dr["Nome"].ToString();
                            perfume.DataFabricacao = (DateTime)dr["DataFabricacao"];
                            decimal valorDecimal = (decimal)dr["Valor"];
                            perfume.Valor = (double)valorDecimal;

                            if (!(dr["DataVencimento"] is DBNull))
                                perfume.DataVencimento = (DateTime)dr["DataVencimento"];

                            perfumes.Add(perfume);
                        }

                    }
                }

            }
            return perfumes;
        }
        public bool Add(Models.Perfume perfume)
        {
            
            using (_conexao)
            {
                _conexao.Open();
                using (_cmd)
                {
                    _cmd.Connection = _conexao;
                    _cmd.CommandText = $"insert into Perfumes(Marca, Nome, DataFabricacao, DataVencimento, Valor) values (@Marca, @Nome, @DataFabricacao, @DataVencimento, @Valor);select convert(int,SCOPE_IDENTITY()) as Id";
                    _cmd.Parameters.Add(new SqlParameter("@Marca", System.Data.SqlDbType.VarChar)).Value = perfume.Marca;
                    _cmd.Parameters.Add(new SqlParameter("@Nome", System.Data.SqlDbType.VarChar)).Value = perfume.Nome;
                    _cmd.Parameters.Add(new SqlParameter("@DataFabricacao", System.Data.SqlDbType.Date)).Value = perfume.DataFabricacao;
                    _cmd.Parameters.Add(new SqlParameter("@DataVencimento", System.Data.SqlDbType.Date)).Value = perfume.DataVencimento;
                    _cmd.Parameters.Add(new SqlParameter("@Valor", System.Data.SqlDbType.Decimal)).Value = perfume.Valor;
                    perfume.Id = Convert.ToInt32(_cmd.ExecuteScalar());
                }
            }
            return perfume.Id != 0;
        }
        public bool Update(Models.Perfume perfume)
        {
            int linhasAfetadas = 0;
            using (_conexao)
            {
                _conexao.Open();


                using (_cmd)
                {
                    _cmd.CommandText = $"update Perfumes set Marca = @Marca, Nome = @Nome, DataFabricacao = @DataFabricacao, DataVencimento = @DataVencimento, Valor = @Valor where Id = @Id;";
                    _cmd.Parameters.Add(new SqlParameter("@Marca", System.Data.SqlDbType.VarChar)).Value = perfume.Marca;
                    _cmd.Parameters.Add(new SqlParameter("@Nome", System.Data.SqlDbType.VarChar)).Value = perfume.Nome;
                    _cmd.Parameters.Add(new SqlParameter("@DataFabricacao", System.Data.SqlDbType.Date)).Value = perfume.DataFabricacao;
                    _cmd.Parameters.Add(new SqlParameter("@DataVencimento", System.Data.SqlDbType.Date)).Value = perfume.DataVencimento;
                    _cmd.Parameters.Add(new SqlParameter("@Valor", System.Data.SqlDbType.Decimal)).Value = perfume.Valor;
                    _cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = perfume.Id;

                    linhasAfetadas = _cmd.ExecuteNonQuery();
                    
                }
            }
            return linhasAfetadas != 0;
        }
        public bool DeleteById(int id)
        {
            int linhasAfetadas = 0;
            using (_conexao)
            {

                _conexao.Open();
            
                string sql = $"delete from Perfumes where Id = @Id";
                using (_cmd)
                {
                    _cmd.Connection = _conexao;
                    _cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = id;
                    _cmd.CommandText = sql;
                    linhasAfetadas = _cmd.ExecuteNonQuery();
                    
                }
                return linhasAfetadas == 1;
            }
        }

    }
}
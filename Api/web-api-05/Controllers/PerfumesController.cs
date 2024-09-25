using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;

namespace web_api_05.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PerfumesController : ApiController
    {
        private readonly Repositories.SQL_Server.Perfume _repoPerfume;
        public PerfumesController()
        {
            _repoPerfume = new Repositories.SQL_Server.Perfume(Configurations.Database.getConnectionString());
        }
        // GET: api/Perfumes
        [HttpGet]
        public IHttpActionResult Get()
        {
            List<Models.Perfume> perfumes = _repoPerfume.SelectAll();
            if (perfumes != null)
                return Ok(perfumes);
            else
                return InternalServerError();

        }
        [HttpGet]
        // GET: api/Perfumes/5
        public IHttpActionResult Get(int id)
        {
            Models.Perfume perfume = _repoPerfume.SelectById(id);
            if (perfume == null)
                return NotFound();
            return Ok(perfume);
        }
        [HttpGet]
        // GET: api/Perfumes/5
        public IHttpActionResult Get(string nome)
        {
            List<Models.Perfume> perfumes = _repoPerfume.SelectByName(nome);
            if (perfumes is null)
                return NotFound();
            return Ok(perfumes);
        }
        [HttpPost]
        // POST: api/Perfumes
        public IHttpActionResult Post([FromBody] Models.Perfume perfume)
        {
            if (!_repoPerfume.Add(perfume))
                return InternalServerError();
            return Ok(perfume);
        }
        // PUT: api/Perfumes/5
        [HttpPut]
        public IHttpActionResult Put(int id, Models.Perfume perfume)
        {
            if (id != perfume.Id)
                return BadRequest("O id da requisição não coincide com o Id do produto!");
            if (!_repoPerfume.Update(perfume))
                return InternalServerError();

            return Ok(perfume);
        }

        // DELETE: api/Perfumes/5
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            if (!_repoPerfume.DeleteById(id))
                return NotFound();
            return Ok($"Perfume ID:{id} deletado com sucesso!");
        }
    }
}

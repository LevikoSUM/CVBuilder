using CVBuilder.Data;
using CVBuilder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;

namespace CVBuilder.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/cvs")]
    public class CVEndpoints : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CVEndpoints(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/cvs
        [HttpGet]
        public IActionResult GetCVs()
        {
            //var header = Request.Headers["Authorization"].ToString();
            //var encodedCreds = header.Substring(6);
            //var creds = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCreds));
            //string[] uipwd = creds.Split(':');
            //var uiname = uipwd[0];
            //var user = _context.Users.FirstOrDefault(x => x.Email == uiname);
            //var userid = user.Id;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get the current user's ID
            var cvs = _context.CVs.Where(cv => cv.UserId == userId).ToList();
            return Ok(cvs);
        }

        // GET: api/cvs/5
        [HttpGet("{id}")]
        public IActionResult GetCV(int id)
        {
            var cv = _context.CVs/*.Include(c => c.User)*/.FirstOrDefault(c => c.CVId == id);
            if (cv == null)
            {
                return NotFound();
            }

            return Ok(cv);
        }

        // POST: api/cvs
        [HttpPost, Authorize]
        public IActionResult CreateCV([FromBody] CV cv)
        {
            if (ModelState.IsValid)
            {
                //var header = Request.Headers["Authorization"].ToString();
                //var encodedCreds = header.Substring(6);
                //var creds = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCreds));
                //string[] uipwd = creds.Split(':');
                //var uiname = uipwd[0];
                //var user = _context.Users.FirstOrDefault(x => x.Email == uiname);
                //cv.User = user;
                //var userid = user?.Id;
                //cv.UserId = userid;
                // Add the CV to the context and save changes
                _context.Add(cv);
                _context.SaveChanges();
                var cvid = cv.CVId;
                return CreatedAtAction(nameof(GetCV), new { id = cv.CVId }, cv);
            }


            return BadRequest(ModelState);
        }

        // PUT: api/cvs/5
        [HttpPut("{id}")]
        public IActionResult UpdateCV(int id, [FromBody] CV cv)
        {
            if (id != cv.CVId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Update(cv);
                _context.SaveChanges();
                return NoContent();
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/cvs/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCV(int id)
        {
            var cv = _context.CVs.Find(id);
            if (cv == null)
            {
                return NotFound();
            }

            _context.CVs.Remove(cv);
            _context.SaveChanges();
            return NoContent();
        }       
    }

}


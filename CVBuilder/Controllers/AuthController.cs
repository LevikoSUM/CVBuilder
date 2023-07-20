using CVBuilder.Data;
using CVBuilder.Dto;
using CVBuilder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CVBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static ApplicationUser user = new ApplicationUser();
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(IConfiguration configuration, ApplicationDbContext context/* IUserService userService*/)
        {
            _configuration = configuration;
            _context = context;
            //_userService = userService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UserDto request)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(request.Password, out passwordHash, out passwordSalt);

            var newUser = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.Email,
                NewPasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //[HttpPost("register")]
        //public async Task<ActionResult<ApplicationUser>> Register(UserDto request)
        //{
        //    CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        //    user.Email = request.Email;
        //    user.NewPasswordHash = passwordHash;
        //    user.PasswordSalt = passwordSalt;

        //    _context.Add(user);
        //    await _context.SaveChangesAsync();
        //    return Ok(user);
        //}
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var user1 = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);
            if (user1 == null)
            {
                return BadRequest("User not found.");
            }

            if (!VerifyPasswordHash(request.Password, user1.NewPasswordHash, user1.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user1);

            //var refreshToken = GenerateRefreshToken();
            //SetRefreshToken(refreshToken);

            return Ok(token);
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        private string CreateToken(ApplicationUser user)
        {
            List<Claim> claims = new List<Claim>
                {
                  new Claim(ClaimTypes.Email, user.Email),
                  new Claim(ClaimTypes.NameIdentifier, user.Id)
                };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            //HttpContext.Session.SetString("token", jwt);

            return jwt;
        }

    }
}

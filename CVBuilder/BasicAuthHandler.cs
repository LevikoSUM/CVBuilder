using System.Text;

namespace CVBuilder
{
    public class BasicAuthHandler
    {
        private readonly RequestDelegate next;
        private readonly string relm;
        public BasicAuthHandler(RequestDelegate next, string relm) 
        {
            this.next = next;
            this.relm = relm;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.ContainsKey("Authorization"))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }
            var header = context.Request.Headers["Authorization"].ToString();
            var encodedCreds = header.Substring(6);
            var creds = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCreds));
            string[] uipwd = creds.Split(':');
            var uiname = uipwd[0];
            var password = uipwd[1];

            if (uiname != "Test@gmail.com" || password != "Test#123")
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            await next(context);
        }
    }
}

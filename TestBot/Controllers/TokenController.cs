using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TestBot.Controllers
{
    [Route("api/token/generate")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public TokenController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        [HttpPost]
        public async Task<object> GenerateToken()
        {
            string HTMLResult;
            JObject response;
            var body = new
            {
                user = new
                {
                    id = $"dl_{Guid.NewGuid()}"
                }
            };
            var bodyJson = JsonConvert.SerializeObject(body);

            String URL_GENERATE_TOKEN = "https://directline.botframework.com/v3/directline/tokens/generate";
            using (WebClient wc = new WebClient())
            {
                wc.Headers.Add(HttpRequestHeader.Authorization, $"Bearer {Configuration["DirectLineSecret"]}");
                wc.Headers.Add(HttpRequestHeader.ContentType, "application/json");
                HTMLResult = await wc.UploadStringTaskAsync(URL_GENERATE_TOKEN, bodyJson);
                response = JObject.Parse(HTMLResult);
                object rsp = new
                {
                    token = response["token"]
                };
                return rsp;
            }
        }
    }
}

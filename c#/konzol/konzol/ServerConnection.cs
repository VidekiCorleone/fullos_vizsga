using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace konzol
{
    public class ServerConnection
    {
        HttpClient client = new HttpClient();
        public async Task<List<artData>> getArtwork()
        {
            List<artData> artwork = new List<artData>();
            string url = "http://127.1.1.1:3000/artworks";
            try
            {
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                artwork = JsonConvert.DeserializeObject<List<artData>>(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return artwork;
        }

        public async Task<bool> register(string uName, string uPass)
        {
            string url = "http://127.1.1.1:3000/register";
            artData artWork = new artData();
            try
            {
                var Json = new 
                {
                    regUser = uName,
                    regPass = uPass
                };
                string jsonString = JsonConvert.SerializeObject(Json);
                StringContent sendThis = new StringContent(jsonString, Encoding.UTF8, "Application/json");
                HttpResponseMessage response = await client.PostAsync(url, sendThis);

                string result = await response.Content.ReadAsStringAsync();
                artWork = JsonConvert.DeserializeObject<artData>(result);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

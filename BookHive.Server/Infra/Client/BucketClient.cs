using System.Text;
using BookHive.Server.Dtos;
using BookHive.Server.Infra.Client.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace BookHive.Server.Infra.Client
{
    public class BucketClient : IBucketClient
    {
        private readonly IConfiguration configuration;
        public BucketClient(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> UploadImagem(CadastroImagemDTO imagem, string uuid)
        {
            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration), "Configuration cannot be null.");

            string? credentialFile = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
            var bucket = configuration["GCPCredentials:BucketName"];

            if (string.IsNullOrWhiteSpace(credentialFile))
                throw new ArgumentException("GCPCredentials:CredentialFile is not configured properly.");

            if (string.IsNullOrWhiteSpace(bucket))
                throw new ArgumentException("GCPCredentials:BucketName is not configured properly.");

            var googleCredential = GoogleCredential.FromFile(credentialFile);
            var storage = StorageClient.Create(googleCredential);
            var bucketName = bucket;
 
            byte[] byteArray = System.Convert.FromBase64String(imagem.imageBase64);
            MemoryStream stream = new MemoryStream(byteArray);
            var contentType = ObterMimeType(imagem.extensaoImagem);
            await storage.UploadObjectAsync(bucketName, uuid, contentType, stream);

            return bucketName + "/" + uuid;
        }


        private string ObterMimeType(string extensao)
        {
            var ext = extensao.ToLowerInvariant().TrimStart('.');

            return ext switch
            {
                "png" => "image/png",
                "jpg" or "jpeg" => "image/jpeg",
                "gif" => "image/gif",
                "webp" => "image/webp",
                "bmp" => "image/bmp",
                "svg" => "image/svg+xml",
                _ => "application/octet-stream" // fallback
            };
        }

    }
}
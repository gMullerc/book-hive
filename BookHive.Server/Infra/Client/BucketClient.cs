using System.Text;
using BookHive.Server.Dtos;
using BookHive.Server.Infra.Client.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace BookHive.Server.Infra.Client
{
    public class BucketClient : IBucketClient
    {
        private readonly GoogleCredential googleCredential;
        private readonly StorageClient storageClient;
        private readonly string bucketName;

        public BucketClient(IConfiguration configuration)
        {
            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration), "Configuration cannot be null.");

            var credentialFile = configuration["GCPCredentials:CredentialFile"];
            var bucket = configuration["GCPCredentials:BucketName"];

            if (string.IsNullOrWhiteSpace(credentialFile))
                throw new ArgumentException("GCPCredentials:CredentialFile is not configured properly.");

            if (string.IsNullOrWhiteSpace(bucket))
                throw new ArgumentException("GCPCredentials:BucketName is not configured properly.");

            googleCredential = GoogleCredential.FromFile(credentialFile);
            storageClient = StorageClient.Create(googleCredential);
            bucketName = bucket;
        }

        public async Task<string> UploadImagem(CadastroImagemDTO imagem, string uuid)
        {
            var storage = StorageClient.Create();
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
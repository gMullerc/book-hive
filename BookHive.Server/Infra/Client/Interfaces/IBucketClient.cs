using BookHive.Server.Dtos;

namespace BookHive.Server.Infra.Client.Interfaces {
       public interface IBucketClient {
            public Task<string> UploadImagem(CadastroImagemDTO imagem, string uuid);
       }
}
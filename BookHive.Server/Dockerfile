# Etapa de Build
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ARG TARGETARCH
WORKDIR /source

# Copiar o csproj e restaurar dependências
COPY *.csproj . 
RUN dotnet restore -a $TARGETARCH

# Copiar o código e publicar o app
COPY . . 
RUN dotnet publish -o /app

# Etapa Final (usando a imagem com o ASP.NET Core runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app

# Copiar a aplicação publicada
COPY --from=build /app .

# Garantir permissões de execução para o arquivo
RUN chmod +x /app/BookHive.Server

USER $APP_UID
EXPOSE 5135
# Usar dotnet para iniciar a aplicação
ENTRYPOINT ["dotnet", "/app/BookHive.Server.dll"]

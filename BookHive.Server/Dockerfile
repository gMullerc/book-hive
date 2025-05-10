FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /app
EXPOSE 8080

COPY BookHive.Server.csproj ./
RUN dotnet restore

COPY ./ ./
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}
EXPOSE 8080

COPY --from=builder /app/publish .

# ENV ASPNETCORE_URLS=http://+:8080


ENTRYPOINT ["dotnet", "BookHive.Server.dll"]


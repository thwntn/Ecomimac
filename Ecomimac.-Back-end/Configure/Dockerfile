FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

COPY .env /app/out
COPY Common/Metadata/ /app/out/Common/Metadata/

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "TitanCo.-Back-end.dll"]

EXPOSE 6501
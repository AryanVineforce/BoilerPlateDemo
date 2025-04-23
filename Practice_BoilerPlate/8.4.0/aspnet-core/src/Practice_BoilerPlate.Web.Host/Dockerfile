FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/Practice_BoilerPlate.Web.Host/Practice_BoilerPlate.Web.Host.csproj", "src/Practice_BoilerPlate.Web.Host/"]
COPY ["src/Practice_BoilerPlate.Web.Core/Practice_BoilerPlate.Web.Core.csproj", "src/Practice_BoilerPlate.Web.Core/"]
COPY ["src/Practice_BoilerPlate.Application/Practice_BoilerPlate.Application.csproj", "src/Practice_BoilerPlate.Application/"]
COPY ["src/Practice_BoilerPlate.Core/Practice_BoilerPlate.Core.csproj", "src/Practice_BoilerPlate.Core/"]
COPY ["src/Practice_BoilerPlate.EntityFrameworkCore/Practice_BoilerPlate.EntityFrameworkCore.csproj", "src/Practice_BoilerPlate.EntityFrameworkCore/"]
WORKDIR "/src/src/Practice_BoilerPlate.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Practice_BoilerPlate.Web.Host", "src/Practice_BoilerPlate.Web.Host"]
COPY ["src/Practice_BoilerPlate.Web.Core", "src/Practice_BoilerPlate.Web.Core"]
COPY ["src/Practice_BoilerPlate.Application", "src/Practice_BoilerPlate.Application"]
COPY ["src/Practice_BoilerPlate.Core", "src/Practice_BoilerPlate.Core"]
COPY ["src/Practice_BoilerPlate.EntityFrameworkCore", "src/Practice_BoilerPlate.EntityFrameworkCore"]
WORKDIR "/src/src/Practice_BoilerPlate.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Practice_BoilerPlate.Web.Host.dll"]

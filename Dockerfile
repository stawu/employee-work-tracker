FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN apt update
RUN apt-get install --yes nodejs

WORKDIR /app-src

ENV APP_ROOT=EWT-dotnet/employee-work-tracker

COPY ${APP_ROOT}/*.sln .
COPY ${APP_ROOT}/src/EWT-Application/*.csproj ./src/EWT-Application/
COPY ${APP_ROOT}/src/EWT-Domain/*.csproj ./src/EWT-Domain/
COPY ${APP_ROOT}/src/EWT-Persistence/*.csproj ./src/EWT-Persistence/
COPY ${APP_ROOT}/src/EWT-Web/*.csproj ./src/EWT-Web/
COPY ${APP_ROOT}/tests/EWT-Domain-Tests/*.csproj ./tests/EWT-Domain-Tests/
RUN dotnet restore

COPY ${APP_ROOT}/src/. ./src/
COPY ${APP_ROOT}/tests/. ./tests/
RUN dotnet publish -c release -o /app-release



FROM node as spaBuild
WORKDIR /app
COPY EWT-dotnet/employee-work-tracker/src/EWT-Web/SPA .
RUN npm install
RUN npm run-script build



FROM mcr.microsoft.com/dotnet/aspnet:5.0
RUN apt update
RUN apt-get install --yes nodejs npm

WORKDIR /app
COPY --from=build /app-release ./
COPY --from=spaBuild /app/dist ./SPA/dist
CMD ["dotnet", "EWT-Web.dll", "--urls=http://0.0.0.0:5000"]
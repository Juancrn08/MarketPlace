# setup_simple.ps1
Write-Host "Configurando CubaLocal Marketplace..." -ForegroundColor Green

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
node --version
npm --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "Instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install

# Crear .env si no existe
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Archivo .env creado" -ForegroundColor Green
}

Write-Host "Configuracion completada!" -ForegroundColor Green

Write-Host "Configurando base de datos..." -ForegroundColor Yellow
npm run setup-db

Write-Host "Iniciando la aplicación..." -ForegroundColor Yellow
npm run dev

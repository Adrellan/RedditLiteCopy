param(
    [string]$envFilePath
)

# Ellenőrizze, hogy a .env fájl létezik-e
if (-not (Test-Path -Path $envFilePath)) {
    Write-Host "A megadott .env fájl nem található: $envFilePath"
    exit
}




# Beolvasás a .env fájlból és Heroku környezeti változók létrehozása
$envLines = Get-Content -Path $envFilePath
foreach ($line in $envLines) {
    if ($line -match '^(.*?)=(.*?)$') {
        $name = $Matches[1]
        $value = $Matches[2]
        $env_var = "$name=$value"
        Invoke-Expression "heroku config:set `"$env_var`" -a rlc-backend"
    }
}

Write-Host "Heroku környezeti változók beállítva a .env fájlból: $envFilePath"

param(
    [string]$p1,
    [string]$p2
)

[System.Environment]::SetEnvironmentVariable('HEROKU_API_KEY', 'eaf0cffa-e252-4578-993b-c4e57ea4c8a0')
Write-Host "$env:HEROKU_API_KEY"
if ($args.Count > 2){
    Write-Host "Használata deploy.ps1 <client, api>"
    exit
}
Write-Host "Services being deployed..." -ForegroundColor yellow

if($p1 -eq "client" || $p2 -eq "client"){
    Write-Host "⚠️ Client deploying..."
    heroku container:push web --recursive -a rlc-client
    heroku container:release web -a rlc-cleint
    Write-Host "✅ Client successfully deployed!"
}

if($p1 -eq "api" || $p2 -eq "api"){
    Write-Host "⚠️ API deploying..."
    heroku container:push web --recursive --app rlc-backend
    heroku container:release web -a rlc-backend
    Write-Host "✅ API successfully deployed!"
}





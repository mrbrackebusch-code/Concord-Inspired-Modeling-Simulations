param(
  [int]$Port = 8123
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
Write-Host "Serving Concord Lab studio from $root"
Write-Host "Open http://localhost:$Port/apps/studio/index.html"
python -m http.server $Port
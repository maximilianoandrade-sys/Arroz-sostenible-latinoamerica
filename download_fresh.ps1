# Create directory if not exists
$dir = "c:\Users\Pasante\Desktop\Arroz sostenible latinoamerica\assets\img"
if (-not (Test-Path -Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

# Reliable Image Sources (Picsum - redirects to real clean JPGs)
$downloads = @{
    "hero-chile.jpg"   = "https://picsum.photos/seed/ricefield/1600/900"
    "bg-rice.jpg"      = "https://picsum.photos/seed/texture/1600/900"
    "news-finance.jpg" = "https://picsum.photos/seed/meeting/800/600"
    "news-iica.jpg"    = "https://picsum.photos/seed/conference/800/600"
    "news-sica.jpg"    = "https://picsum.photos/seed/farm/800/600"
    "project-1.jpg"    = "https://picsum.photos/seed/map/800/600"
    "project-2.jpg"    = "https://picsum.photos/seed/chart/800/600"
    "project-3.jpg"    = "https://picsum.photos/seed/tech/800/600"
    "hero-bg.jpg"      = "https://picsum.photos/seed/nature/800/600"
}

foreach ($name in $downloads.Keys) {
    $out = Join-Path $dir $name
    $url = $downloads[$name]
    try {
        Write-Host "Downloading $name..."
        Invoke-WebRequest -Uri $url -OutFile $out -UserAgent "Mozilla/5.0"
        Write-Host "Saved $name" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed $name : $_" -ForegroundColor Red
    }
}
Write-Host "All images downloaded."

$images = @{
    "bg-rice.jpg"       = "https://picsum.photos/seed/ricefield/1600/900"
    "hero-bg.jpg"       = "https://picsum.photos/seed/bali/1600/900"
    "news-iica.jpg"     = "https://picsum.photos/seed/meeting/800/600"
    "news-platform.jpg" = "https://picsum.photos/seed/technology/800/600"
    "news-finance.jpg"  = "https://picsum.photos/seed/finance/800/600"
    "news-sica.jpg"     = "https://picsum.photos/seed/agriculture/800/600"
    "project-1.jpg"     = "https://picsum.photos/seed/map/800/600"
    "project-2.jpg"     = "https://picsum.photos/seed/chart/800/600"
    "project-3.jpg"     = "https://picsum.photos/seed/workshop/800/600"
}

$dir = "assets\img"
if (-not (Test-Path -Path $dir)) {
    New-Item -ItemType Directory -Path $dir | Out-Null
}

foreach ($name in $images.Keys) {
    Write-Host "Downloading $name from Picsum..."
    $url = $images[$name]
    $output = "$dir\$name"
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0" -ErrorAction Stop
        Write-Host "Success: $name" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download $name. Error: $_" -ForegroundColor Red
    }
}
Write-Host "Fallback download complete."

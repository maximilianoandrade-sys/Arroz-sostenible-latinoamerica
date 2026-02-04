$sourceDir = "C:\Users\Pasante\.gemini\antigravity\brain\951e4bd3-8d29-4861-99f0-a0c11d192736"
$destDir = "c:\Users\Pasante\Desktop\Arroz sostenible latinoamerica\assets\img"

if (-not (Test-Path -Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$mapping = @{
    "generated_bg_rice_1770217796769.png"         = "bg-rice.jpg"
    "generated_hero_bg_1770217812202.png"         = "hero-bg.jpg"
    "generated_news_iica_1770217924276.png"       = "news-iica.jpg"
    "generated_meeting_1770217831452.png"         = "news-finance.jpg"
    "bali_rice_field_1770217707322.png"           = "news-sica.jpg"
    "generated_tech_1770217866087.png"            = "news-platform.jpg"
    "generated_map_1770217850660.png"             = "project-1.jpg"
    "generated_bg_rice_1770217891883.png"         = "project-2.jpg"
    "generated_rice_technology_1770217956679.png" = "project-3.jpg"
}

foreach ($key in $mapping.Keys) {
    $src = Join-Path $sourceDir $key
    $dest = Join-Path $destDir $mapping[$key]
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "Success: Copied $key to $dest" -ForegroundColor Green
    }
    else {
        Write-Host "Error: Source file $key not found!" -ForegroundColor Red
    }
}

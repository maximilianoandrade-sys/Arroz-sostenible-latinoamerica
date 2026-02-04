$sourceDir = "C:\Users\Pasante\.gemini\antigravity\brain\951e4bd3-8d29-4861-99f0-a0c11d192736"
$destDir = "c:\Users\Pasante\Desktop\Arroz sostenible latinoamerica\assets\img"

# We will use 'generated_hero_bg_1770217908000.png' which is a large high quality rice field image we generated earlier
# We will copy it to 'hero-chile.png' to differentiate it
$src = Join-Path $sourceDir "generated_hero_bg_1770217908000.png"
$dest = Join-Path $destDir "hero-chile.png"

if (Test-Path $src) {
    Copy-Item -Path $src -Destination $dest -Force
    Write-Host "Success: Copied high-res rice field to $dest" -ForegroundColor Green
}
else {
    Write-Host "Error: Source file not found!" -ForegroundColor Red
}

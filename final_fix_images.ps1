$images = @{
    "bg-rice.jpg"      = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Rice_ears.jpg/1600px-Rice_ears.jpg"
    "hero-bg.jpg"      = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rice_Field_-_Bali.jpg/1600px-Rice_Field_-_Bali.jpg"
    "news-iica.jpg"    = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/IICA_logo.png/640px-IICA_logo.png"
    "news-finance.jpg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Handshake.jpg/800px-Handshake.jpg"
    "news-sica.jpg"    = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Rice_Cultivation_Sri_Lanka.jpg/800px-Rice_Cultivation_Sri_Lanka.jpg"
    "project-1.jpg"    = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rice_Layout_Philippines.jpg/800px-Rice_Layout_Philippines.jpg"
}

foreach ($name in $images.Keys) {
    echo "Downloading stable image for $name..."
    $url = $images[$name]
    $output = "assets\img\$name"
    Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
}
echo "Final fix complete!"

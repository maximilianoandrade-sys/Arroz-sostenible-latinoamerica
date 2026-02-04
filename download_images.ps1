$baseUrl = "https://images.unsplash.com"
$images = @{
    "bg-rice.jpg" = "photo-1579169830154-159677329971?q=80&w=1920"
    "news-iica.jpg" = "photo-1591965824987-97593c6f4970?q=80&w=800"
    "news-platform.jpg" = "photo-1530507629858-e4977d30e9e0?q=80&w=800"
    "news-finance.jpg" = "photo-1621961458348-15320d3725b8?q=80&w=800"
    "news-sica.jpg" = "photo-1589923188900-85dae5233c78?q=80&w=800"
    "project-1.jpg" = "photo-1595246140625-573b715d98e7?q=80&w=600"
    "project-2.jpg" = "photo-1551288049-bebda4e38f71?q=80&w=600"
    "project-3.jpg" = "photo-1605000797499-95a51c5269ae?q=80&w=600"
    "hero-bg.jpg" = "photo-1536657235019-030712638400?q=80&w=1600"
}

foreach ($name in $images.Keys) {
    echo "Downloading $name..."
    $url = "$baseUrl/$($images[$name])"
    $output = "assets\img\$name"
    Invoke-WebRequest -Uri $url -OutFile $output
}
echo "Download complete!"

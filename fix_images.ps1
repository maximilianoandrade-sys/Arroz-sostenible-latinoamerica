$images = @{
    "bg-rice.jpg"      = "https://images.unsplash.com/photo-1598254427265-5d9c2409f87b?q=80&w=1920"
    "news-iica.jpg"    = "https://images.unsplash.com/photo-1595246140625-573b715d98e7?q=80&w=800"
    "news-finance.jpg" = "https://images.unsplash.com/photo-1554224155-9736b5aac778?q=80&w=800"
    "news-sica.jpg"    = "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?q=80&w=800"
    "project-1.jpg"    = "https://images.unsplash.com/photo-1625246333195-bfca7f8ebc4c?q=80&w=600"
    "hero-bg.jpg"      = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600"
}

foreach ($name in $images.Keys) {
    echo "Redownloading $name..."
    $url = $images[$name]
    $output = "assets\img\$name"
    Invoke-WebRequest -Uri $url -OutFile $output
}
echo "Fix complete!"

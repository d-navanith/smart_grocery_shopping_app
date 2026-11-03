$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$destDir = "D:\smart_grocery_shopping_app\screenshots"
if (-not (Test-Path $destDir)) {
  New-Item -ItemType Directory -Path $destDir | Out-Null
}

$targets = @(
  @{
    File = "01_ceylonfoods_splash_screen.png"
    Url = "http://localhost:3000/?splash=true"
    Size = "1280,820"
  },
  @{
    File = "02_ceylonfoods_storefront_home.png"
    Url = "http://localhost:3000/?splash=false&page=home"
    Size = "1366,880"
  },
  @{
    File = "03_ceylonfoods_shop_catalog.png"
    Url = "http://localhost:3000/?splash=false&page=shop"
    Size = "1366,950"
  },
  @{
    File = "04_ceylonfoods_about_us.png"
    Url = "http://localhost:3000/?splash=false&page=about-us"
    Size = "1366,880"
  },
  @{
    File = "05_ceylonfoods_contact_us.png"
    Url = "http://localhost:3000/?splash=false&page=contact"
    Size = "1366,920"
  },
  @{
    File = "06_ceylonfoods_cart_checkout.png"
    Url = "http://localhost:3000/?splash=false&page=checkout"
    Size = "1366,880"
  },
  @{
    File = "07_ceylonfoods_order_tracking.png"
    Url = "http://localhost:3000/?splash=false&page=track"
    Size = "1366,880"
  },
  @{
    File = "08_ceylonfoods_deliveries_view.png"
    Url = "http://localhost:3000/?splash=false&page=deliveries"
    Size = "1366,880"
  },
  @{
    File = "09_ceylonfoods_storefront_dark.png"
    Url = "http://localhost:3000/?splash=false&page=home&theme=dark"
    Size = "1366,880"
  }
)

foreach ($item in $targets) {
  $outFile = Join-Path $destDir $item.File
  Write-Host "Capturing $($item.File) from $($item.Url)..."
  if (Test-Path $outFile) { Remove-Item $outFile -Force }
  Start-Process -FilePath $chrome -ArgumentList @(
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=$($item.Size)",
    "--screenshot=$outFile",
    $item.Url
  ) -Wait
  Write-Host "-> Success: $(Test-Path $outFile)"
}

Write-Host "All screenshots captured successfully!"

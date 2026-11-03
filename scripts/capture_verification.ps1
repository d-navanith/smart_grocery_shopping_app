$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"

# 1. Shop Page (Attachment 3 verification)
$outShop = "$artDir\verify_updated_shop.png"
if (Test-Path $outShop) { Remove-Item $outShop }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,950",
  "--screenshot=$outShop",
  "http://localhost:3000/?splash=false&page=shop"
) -Wait

# 2. About Page (Attachment 2 verification)
$outAbout = "$artDir\verify_updated_about.png"
if (Test-Path $outAbout) { Remove-Item $outAbout }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,900",
  "--screenshot=$outAbout",
  "http://localhost:3000/?splash=false&page=about-us"
) -Wait

Write-Host "Shop:" (Test-Path $outShop)
Write-Host "About:" (Test-Path $outAbout)

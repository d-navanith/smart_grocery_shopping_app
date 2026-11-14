$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"

$outHome = "$artDir\verify_matched_products_home.png"
if (Test-Path $outHome) { Remove-Item $outHome }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--virtual-time-budget=3000",
  "--window-size=1440,1200",
  "--screenshot=$outHome",
  "http://localhost:3000/?splash=false"
) -Wait

Write-Host "Home screenshot captured:" (Test-Path $outHome)

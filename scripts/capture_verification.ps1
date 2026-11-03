$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"

# 1. Home Page
$outHome = "$artDir\verify_final_home.png"
if (Test-Path $outHome) { Remove-Item $outHome }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,900",
  "--screenshot=$outHome",
  "http://localhost:3000/?splash=false&page=home"
) -Wait

# 2. About Us Page
$outAbout = "$artDir\verify_final_about.png"
if (Test-Path $outAbout) { Remove-Item $outAbout }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,900",
  "--screenshot=$outAbout",
  "http://localhost:3000/?splash=false&page=about-us"
) -Wait

# 3. Contact Us Page
$outContact = "$artDir\verify_final_contact.png"
if (Test-Path $outContact) { Remove-Item $outContact }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,900",
  "--screenshot=$outContact",
  "http://localhost:3000/?splash=false&page=contact"
) -Wait

Write-Host "Home:" (Test-Path $outHome)
Write-Host "About:" (Test-Path $outAbout)
Write-Host "Contact:" (Test-Path $outContact)

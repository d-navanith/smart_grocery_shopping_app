$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"

$outContact = "$artDir\verify_clean_contact.png"
if (Test-Path $outContact) { Remove-Item $outContact }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,1050",
  "--screenshot=$outContact",
  "http://localhost:3000/?splash=false&page=contact"
) -Wait

Write-Host "Contact:" (Test-Path $outContact)

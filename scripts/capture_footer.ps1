$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"

$outFooter = "$artDir\verify_final_footer.png"
if (Test-Path $outFooter) { Remove-Item $outFooter }
Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,1100",
  "--screenshot=$outFooter",
  "http://localhost:3000/?splash=false&page=contact"
) -Wait

Write-Host "Footer screenshot:" (Test-Path $outFooter)

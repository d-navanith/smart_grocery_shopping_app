$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }

$artDir = "C:\Users\USER\.gemini\antigravity\brain\2240ee31-5164-4177-87cb-6d9a31b80e4d"
$out = "$artDir\verify_seo_knowledge_panel.png"
if (Test-Path $out) { Remove-Item $out }

Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1280,3600",
  "--screenshot=$out",
  "http://localhost:3000/?splash=false&page=home"
) -Wait

Write-Host "Success:" (Test-Path $out)

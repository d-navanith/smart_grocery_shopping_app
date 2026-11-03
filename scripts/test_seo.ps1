$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }

$proc = Start-Process -FilePath $chrome -ArgumentList @(
  "--headless=new",
  "--dump-dom",
  "http://localhost:3000/?splash=false&page=about-us"
) -NoNewWindow -PassThru -RedirectStandardOutput "scripts/seo_output.txt"
$proc.WaitForExit()

$dom = Get-Content "scripts/seo_output.txt" -Raw
Write-Host "About Us Title matched:" ($dom -match "About Us")
Write-Host "Structured Data matched:" ($dom -match "schema.org")
Write-Host "FAQPage Schema matched:" ($dom -match "FAQPage")
Write-Host "BreadcrumbList matched:" ($dom -match "BreadcrumbList")
Write-Host "GroceryStore matched:" ($dom -match "GroceryStore")

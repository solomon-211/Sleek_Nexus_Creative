$rootDir = "c:\Users\HP\OneDrive\Desktop\Sleek Tech\frontend"
$files = Get-ChildItem "$rootDir" -Recurse -Include *.html, *.css, *.js, *.json -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -match "Sleek Technology") {
        $content = $content -replace "Sleek Technology", "CodeBridge Bootcamp"
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

# Also update backend and root level files
$extraDirs = @(
    "c:\Users\HP\OneDrive\Desktop\Sleek Tech\backend",
    "c:\Users\HP\OneDrive\Desktop\Sleek Tech\database"
)
foreach ($dir in $extraDirs) {
    $extraFiles = Get-ChildItem "$dir" -Recurse -Include *.js, *.json, *.env -File -ErrorAction SilentlyContinue
    foreach ($file in $extraFiles) {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
        if ($content -and $content -match "Sleek Technology") {
            $content = $content -replace "Sleek Technology", "CodeBridge Bootcamp"
            Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
            Write-Host "Updated: $($file.FullName)"
        }
    }
}

Write-Host "All done."

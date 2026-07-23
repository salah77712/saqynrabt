$dirs = @("frontend/app", "frontend/components")
$changes = 0
$changed = @()

$replacements = @(
    @("-ml-", "-ms-"),
    @("-mr-", "-me-"),
    @("ml-", "ms-"),
    @("mr-", "me-"),
    @("-pl-", "-ps-"),
    @("-pr-", "-pe-"),
    @("pl-", "ps-"),
    @("pr-", "pe-"),
    @("border-r-", "border-e-"),
    @("border-l-", "border-s-"),
    @("-right-", "-end-"),
    @("-left-", "-start-"),
    @("right-", "end-"),
    @("left-", "start-")
)

$fileList = @()
foreach ($dir in $dirs) {
    $fileList += Get-ChildItem -LiteralPath $dir -Recurse -Filter "*.tsx" -File | Where-Object {
        $_.FullName -notmatch 'node_modules|\.bak|\.next'
    } | ForEach-Object { $_.FullName }
}

foreach ($file in $fileList) {
    try { $content = [System.IO.File]::ReadAllText($file) } catch { continue }
    $original = $content

    foreach ($rep in $replacements) {
        $content = $content -replace [regex]::Escape($rep[0]), $rep[1]
    }

    $content = $content -replace 'border-r(?!\w)', 'border-e'
    $content = $content -replace 'border-l(?!\w)', 'border-s'

    $content = $content -replace 'rounded-tl-', 'rounded-ts-'
    $content = $content -replace 'rounded-tr-', 'rounded-te-'
    $content = $content -replace 'rounded-bl-', 'rounded-bs-'
    $content = $content -replace 'rounded-br-', 'rounded-be-'

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
        $changed += $file
        $changes++
    }
}

Write-Output "=== BATCH 2 COMPLETE ==="
Write-Output "Files changed: $changes"
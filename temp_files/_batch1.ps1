param([string]$baseDir = ".")
$files = Get-ChildItem -LiteralPath $baseDir -Recurse -Filter "*.tsx" -File | Where-Object { 
    $_.FullName -notmatch 'node_modules|\.bak$|\.next'
} | ForEach-Object { $_.FullName }

$replacements = @(
    @('text-\[#141F33\]/(\d+)', 'text-primary/$1'),
    @('text-\[#141F33\]', 'text-primary'),
    @('bg-\[#141F33\]/(\d+)', 'bg-primary/$1'),
    @('bg-\[#141F33\]', 'bg-primary'),
    @('text-\[#2A5CFF\]/(\d+)', 'text-accent/$1'),
    @('text-\[#2A5CFF\]', 'text-accent'),
    @('bg-\[#2A5CFF\]/(\d+)', 'bg-accent/$1'),
    @('bg-\[#2A5CFF\]', 'bg-accent'),
    @('bg-\[#F8F9FB\]/(\d+)', 'bg-surface/$1'),
    @('bg-\[#F8F9FB\]', 'bg-surface'),
    @('text-\[#F8F9FB\]/(\d+)', 'text-surface/$1'),
    @('text-\[#F8F9FB\]', 'text-surface'),
    @('border-\[#141F33\]/(\d+)', 'border-primary/$1'),
    @('border-\[#141F33\]', 'border-primary'),
    @('border-\[#F8F9FB\]/(\d+)', 'border-surface/$1'),
    @('border-\[#F8F9FB\]', 'border-surface'),
    @('border-\[#2A5CFF\]/(\d+)', 'border-accent/$1'),
    @('border-\[#2A5CFF\]', 'border-accent')
)

$changedFiles = @()
$totalChanges = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file)
    $original = $content
    $fileChanges = 0

    foreach ($rep in $replacements) {
        $pattern = $rep[0]
        $replacement = $rep[1]
        $newContent = $content -replace $pattern, $replacement
        if ($newContent -ne $content) {
            $diffCount = ([regex]::Matches($original, $pattern)).Count - ([regex]::Matches($newContent, $pattern)).Count
            $fileChanges += [Math]::Max(0, $diffCount)
            $content = $newContent
        }
    }

    if ($fileChanges -gt 0) {
        Copy-Item -LiteralPath $file -Destination "$file.bak" -Force
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
        $changedFiles += @{ File = $file; Changes = $fileChanges }
        $totalChanges += $fileChanges
    }
}

Write-Output "=== BATCH 1 COMPLETE ==="
Write-Output "Files changed: $($changedFiles.Count)"
Write-Output "Total replacements: $totalChanges"

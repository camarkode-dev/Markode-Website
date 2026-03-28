Add-Type -AssemblyName System.Drawing
$srcPath = 'piuter-optimized.jpg'
$dstPath = 'piuter-optimized-720.jpg'
$width = 720
$height = 894
$src = [System.Drawing.Image]::FromFile($srcPath)
$dst = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($dst)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, $width, $height)
$src.Dispose()
$g.Dispose()
$dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$dst.Dispose()
Write-Host "created $dstPath"

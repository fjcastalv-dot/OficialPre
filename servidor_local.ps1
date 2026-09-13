$port = 8080
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    $port = 8085
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  UNIFORMES PRE - SERVIDOR LOCAL ACTIVO" -ForegroundColor Green
Write-Host "  URL: http://localhost:$port/docs/index.html" -ForegroundColor Yellow
Write-Host "  (Presiona Ctrl+C en esta ventana para detener el servidor)" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

Start-Process "http://localhost:$port/docs/index.html"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8";
    ".htm"  = "text/html; charset=utf-8";
    ".js"   = "application/javascript; charset=utf-8";
    ".mjs"  = "application/javascript; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".webp" = "image/webp";
    ".svg"  = "image/svg+xml";
    ".json" = "application/json; charset=utf-8";
    ".ico"  = "image/x-icon";
    ".woff" = "font/woff";
    ".woff2"= "font/woff2";
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq "docs") {
            $localPath = "docs/index.html"
        }

        $filePath = Join-Path $baseDir ($localPath -replace '/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Cache-Control", "no-cache")
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }
        $response.Close()
    } catch {
    }
}

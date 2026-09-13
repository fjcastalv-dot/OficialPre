@echo off
chcp 65001 >nul
title Sincronizar Uniformes PRE con GitHub
cd /d "C:\Users\fjcas\antigravity\Remix-Remix-Uniformes-PRE"

echo ======================================================
echo    SINCRONIZAR PROYECTO CON GITHUB - UNIFORMES PRE
echo ======================================================
echo.
echo Repositorio: https://github.com/fjcastalv-dot/OficialPre.git
echo Directorio:   C:\Users\fjcas\antigravity\Remix-Remix-Uniformes-PRE
echo.
echo [1/3] Verificando cambios locales...
"C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe" add -A

echo [2/3] Creando paquete de actualizacion...
"C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe" diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    "C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe" commit -m "Actualizacion automatica del proyecto"
) else (
    echo No habia cambios nuevos sin confirmar.
)

echo.
echo [3/3] Subiendo cambios a GitHub (origin/main)...
echo NOTA: Si es la primera vez, se abrira una ventana de tu navegador
echo para autorizar el acceso con tu cuenta de GitHub (1 solo clic).
echo.
"C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe" push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================
    echo   SINCRONIZACION COMPLETADA CON EXITO EN GITHUB!
    echo ======================================================
) else (
    echo.
    echo ======================================================
    echo   Hubo un detalle al sincronizar. Revisa tu conexion.
    echo ======================================================
)

echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul

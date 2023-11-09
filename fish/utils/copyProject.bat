@echo off

setlocal enabledelayedexpansion

rem set adb path
set ADB_PATH=C:\adb

rem set pc folder
set PC_FOLDER_PATH=E:\code\fisher-robot\fish

rem set phone path
set PHONE_FOLDER_PATH=/storage/emulated/0/脚本/fish/

rem concect to phone
%ADB_PATH%\adb devices

rem sure connection
:devicecheck
%ADB_PATH%\adb get-state | find "device"
if %errorlevel% neq 0 (
    echo can not find phone
    pause
    exit
)

rem create dir in phone
%ADB_PATH%\adb shell mkdir -p "%PHONE_FOLDER_PATH%"

rem sync 
%ADB_PATH%\adb push "%PC_FOLDER_PATH%" "%PHONE_FOLDER_PATH%"

@REM rem disconnect
@REM %ADB_PATH%\adb disconnect

endlocal

@echo off
for /f "tokens=3,6,8 delims=: " %%i in ('handle -p eclipse e:\git\') do echo Releasing %%k & handle -c %%j -y -p %%i
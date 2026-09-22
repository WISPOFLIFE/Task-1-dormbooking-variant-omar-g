@echo off
rem Maven wrapper script for Windows

setlocal

set MAVEN_WRAPPER_VERSION=0.5.6
set MAVEN_HOME=%~dp0.mvn\apache-maven-%MAVEN_WRAPPER_VERSION%
set MAVEN_OPTS=-Xmx1024m

if not exist "%MAVEN_HOME%\bin\mvn" (
    echo "Maven not found. Please install Maven or ensure the wrapper is correctly set up."
    exit /b 1
)

"%MAVEN_HOME%\bin\mvn" %* 

endlocal
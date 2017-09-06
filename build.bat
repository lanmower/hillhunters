
meteor build ../build --server http://10.0.0.3:3000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1  ..\build\android\release-unsigned.apk your-app-name
del ..\build\android\hh.apk
zipalign 4 ..\build\android\release-unsigned.apk ..\build\android\hh.apk


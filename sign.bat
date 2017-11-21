jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1  ..\build\android\release-unsigned.apk hillhunters
del ..\build\android\hh.apk
zipalign 4 ..\build\android\release-unsigned.apk ..\build\android\hh.apk


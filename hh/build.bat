meteor build ../build --server https://minnowschool.dnsd.info
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1  ..\build\android\android\release-unsigned.apk hillhunters
del ..\build\android\hh.apk
zipalign 4 ..\build\android\release-unsigned.apk ..\build\android\hh.apk


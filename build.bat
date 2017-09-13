
meteor build ../build --server http://beanscount.dedicated.co.za:3000 --debug
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1  ..\build\android\release-unsigned.apk your-app-name
del ..\build\android\hh.apk
zipalign 4 ..\build\android\release-unsigned.apk ..\build\android\hh.apk


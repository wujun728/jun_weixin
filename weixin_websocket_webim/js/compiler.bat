java -jar compiler.jar --js=chat.js --js_output_file=atwasoft.app.im.js

xcopy atwasoft.app.im.js "\\192.168.0.7\public\app\Mixky Application Portal\WebRoot\resources\js\portal\commonapp" /Y

ping 192.168.0.7
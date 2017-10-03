if [ -f tmp/report.json ]
  then
    rm tmp/report.json
fi
node launcher.js

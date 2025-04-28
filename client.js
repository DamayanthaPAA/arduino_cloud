const { ArduinoIoTCloud } = require('arduino-iot-js');

(async () => {
  const client = await ArduinoIoTCloud.connect({
    deviceId: '-',
    secretKey: '0',
    onDisconnect: (message) => console.error(message),
  });

  const value = 30;
  let cloudVar = "temperature"
  let cloudVarhumidity = "humidity"
  let cloudVartimestamp = "timestamp"

  client.sendProperty(cloudVar, value);
  console.log(cloudVar, ":", value);

  client.sendProperty(cloudVarhumidity, 60);
  console.log(cloudVar, ":", value);

  let timestamp= new Date().toISOString()

  client.sendProperty(cloudVartimestamp, timestamp);
  console.log(cloudVar, ":", timestamp);

  client.onPropertyValue(cloudVar, (value) => console.log(cloudVar, ":", value));
})();
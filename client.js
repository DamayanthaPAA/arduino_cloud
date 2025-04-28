const { ArduinoIoTCloud } = require('arduino-iot-js');

(async () => {
  const client = await ArduinoIoTCloud.connect({
    deviceId: '9f760824-645c-4d53-ab13-78eec5822f84',
    secretKey: 'xx?5z0mjsTTk60kF63ywtPH?5',
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
const { ArduinoIoTCloud } = require('arduino-iot-js');

(async () => {
  const client = await ArduinoIoTCloud.connect({
    deviceId: '[]',
    secretKey: 'insert_your_secret_key_here',
    onDisconnect: (message) => console.error(message),
  });

  // Define variable names
  const variables = {
    temperature: () => Math.floor(Math.random() * 40) + 10, // Random temperature between 10-50°C
    humidity: () => Math.floor(Math.random() * 60) + 20,    // Random humidity between 20-80%
    timestamp: () => new Date().toISOString()
  };

  // Intervals in milliseconds for each variable
  const intervals = {
    temperature: 5000,  // Send temperature every 5 seconds
    humidity: 8000,     // Send humidity every 8 seconds
    timestamp: 10000    // Send timestamp every 10 seconds
  };

  // Set up continuous sending for each variable
  const setupContinuousSending = (varName) => {
    const sendData = () => {
      const value = variables[varName]();
      client.sendProperty(varName, value);
      console.log(`Sent ${varName}: ${value}`);
    };

    // Send initial data immediately
    sendData();
    
    // Then send at regular intervals
    setInterval(sendData, intervals[varName]);
  };

  // Start continuous sending for all variables
  Object.keys(variables).forEach(setupContinuousSending);

  // Set up listeners for all variables
  Object.keys(variables).forEach(varName => {
    client.onPropertyValue(varName, (value) => console.log(`Received ${varName}: ${value}`));
  });

  console.log("Data transmission started. Press Ctrl+C to stop.");
})();
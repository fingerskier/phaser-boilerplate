export default class MQTTClient {
  constructor({
    topic="my/test/topic",
    clientId='testor',
    host='test.mosquitto.org',
    port=1883,
  }) {
    this.topic = topic
    this.client = new Paho.MQTT.Client(host, +port, 'testor')

    console.log('new mqtt client')
    
    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.onMessageDelivered = this.onMessageDelivered;
    
    const config = {
      onSuccess: event=>{
        console.log("MQTT Client  connected: ", this.topic)
        
        this.client.subscribe(this.topic)
        this.send('present')
      },
      userName: 'admin',
      password: 'admin',
    }

    this.client.connect(config);

    this.data = ''
  }


  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("MQTT Client disconnected: ", responseObject);
    }
  }


  onMessageArrived(message) {
    try {
      this.data = JSON.parse(message.payloadString)
    } catch (error) {
      this.data = message.payloadString
    }

    console.log("MQTT Client recieved: ", this.data);
  }


  onMessageDelivered(message) {
    console.log('message delivered:', message)
  }


  send(msg, qos=2, retained=false) {
    this.client.send(this.topic, msg, qos, retained);
  }
}
import Phaser from 'phaser'
import MQTTClient from "../lib/MQTTClient"


export default class MqttButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, style) {
    super(scene, x, y, 'MQTT', style)

    this.setText('MQTT')
    this.setInteractive()
    this.on('pointerdown', this.click)

    this.client = new MQTTClient({
      clientId: 'client'+(new Date()),
      host: '127.0.0.1',
      port: 1884,
    })

    console.log('MQTT client', this.client)
  }


  click(event) {
    this.client.send('test')
  }
}
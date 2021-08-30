import Phaser from 'phaser'
import {subscribe} from "../lib/pushNotifications";


export default class PushNotificationButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style)

    this.setText('Push Subscribe')
    this.setInteractive()
    this.on('pointerdown', this.click)

    
  }


  click(event) {
    subscribe()
  }
}
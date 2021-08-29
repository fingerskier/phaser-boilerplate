import Phaser from 'phaser';
import logo from './assets/logo.png'
import red from './assets/red.png'
import space from './assets/space.png'


export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(logo, red, space);

    this.load.image('space', space);
    this.load.image('logo', logo);
    this.load.image('red', red);

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update () {
    this.scene.start('menu');
    // this.scene.start('play');
    // this.scene.remove();
  }
}

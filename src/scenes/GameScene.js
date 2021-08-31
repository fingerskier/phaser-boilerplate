import Phaser from 'phaser'
import BombSpawner from "./BombSpawner";
import ScoreLabel from "../ui/ScoreLabel"
import MqttButton from '../ui/MqttButton';


const BOMB = 'BOMB'
const DUDE = 'DUDE'
const GROUND = 'GROUND'
const SKY = 'SKY'
const STAR = 'STAR'


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene')
    
    this.cursors = undefined
    this.gameOver = false
    this.platforms = undefined
    this.player = undefined
    this.stars = undefined
  }


  preload() {
    // this path is relative to the 'dist' folder
		this.load.image(SKY, './assets/sky.png')
		this.load.image(GROUND, './assets/platform.png')
		this.load.image(STAR, './assets/star.png')
		this.load.image(BOMB, './assets/bomb.png')

		this.load.spritesheet(DUDE, 
			'./assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)

  }


  create() {
		this.add.image(400, 300, SKY)
    this.add.image(400, 300, STAR)

    this.platforms = this.createPlatforms()
    this.stars = this.createStars()
    
    this.player = this.createPlayer()

    this.ScoreLabel = this.createScoreLabel(16, 16, 0)
    this.clientButton = this.createMQTTButton(300, 300)

    this.bombSpawner = new BombSpawner(this, BOMB)

    const bombGroup = this.bombSpawner.group

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    this.physics.add.collider(bombGroup, this.platforms)
    this.physics.add.collider(this.player, bombGroup, this.hitBomb, null, this)

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    this.cursors = this.input.keyboard.createCursorKeys()
  }


  collectStar(player, star) {
    star.disableBody(true, true)

    this.ScoreLabel.add(10)

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(child=>{
        child.enableBody(true, child.x, 0, true, true)
      })
    }
    
    this.bombSpawner.spawn(player.x)
  }


  createPlatforms() {
    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, GROUND).setScale(2).refreshBody()

    platforms.create(600, 400, GROUND)
    platforms.create(50, 250, GROUND)
    platforms.create(50, 250, GROUND)

    return platforms
  }


  createPlayer() {
		const player = this.physics.add.sprite(100, 450, DUDE)
		
    player.setBounce(0.2)
		player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

    return player
	}


  createMQTTButton(x, y) {
    const style = {fontSize: '32px', fill: '#000'}
    const label = new MqttButton(this, x, y, style)

    this.add.existing(label)  // add is an inherited method

    return label
  }


  createScoreLabel(x, y, score) {
    const style = {fontSize: '32px', fill: '#000'}
    const label = new ScoreLabel(this, x, y, score, style)

    this.add.existing(label)  // add is an inherited method

    return label
  }


  createSubscriptionButton(x, y, score) {
    const style = {fontSize: '24px', fill: '#FFF'}
    const button = new PushNotificationButton(this, x, y, style)

    this.add.existing(button)  // add is an inherited method

    return button
  }
  

  createStars() {
    const stars = this.physics.add.group({
      key: STAR,
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70},
    })

    stars.children.iterate(child=>{
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    return stars
  }


  hitBomb(player, bomb) {
    this.physics.pause()

    player.setTint(0xFF0000)
    player.anims.play('turn')

    this.gameOver = true
  }


  subscriptionButtonClick() {
    console.log('sub button clicked')
  }


  update() {
    if (this.gameOver) return


		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		} else {
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330)
		}
	}
}
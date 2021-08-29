import Phaser from 'phaser'

const formatScore = (strings,...keys)=>`Score ${keys[0]}`


export default class ScoreLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, score=0, style) {
    super(scene, x, y, formatScore(score), style)

    this.score = score || 0

    this.updateScoreText()
  }


  add(points) {
    this.setScore(this.score + points)
  }


  setScore(score) {
    this.score = score
    this.updateScoreText()
  }


  updateScoreText() {
    this.setText(formatScore`${this.score}`)
  }
}
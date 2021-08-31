import './lib/mqttws31.min.js'
import Phaser from 'phaser';
import gameConfig from './gameConfig.js';

import './windowConfig.js'


const serviceWorker = './service-worker.js'


function newGame () {
  if (game) return;
  game = new Phaser.Game(gameConfig);
}

function destroyGame () {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}

let game;


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register(serviceWorker);
  });
}


if (module.hot) {
  module.hot.dispose(destroyGame);
  module.hot.accept(newGame);
}


if (!game) newGame();
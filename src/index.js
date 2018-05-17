//index.js



import Phaser from "phaser";

import RaceScene from "./scenes/racescene";



const config = {

    type: Phaser.AUTO,

    width: 800,

    height: 600,

    background: "white",

    physics: {

        default: 'arcade',

        gravity: { y: 300 },

        debug: false

    },

    scene: (RaceScene)

};



const theGame = new Phaser.Game(config);
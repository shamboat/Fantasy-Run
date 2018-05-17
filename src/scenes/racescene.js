//racescene.js

import Phaser from "phaser";
import deer from "../assets/emoji.png";
import deer2 from "../assets/emoji2.png";
import wolf from "../assets/bomb.png";
import sheet1 from "../assets/deer.png";
import sheet2 from "../assets/wolf3.png";
import snow from "../assets/snow.png"

var keypress1;

var keypress2;

var keypress3;

var keypress4;




export default class RaceScene extends Phaser.Scene {

    constructor() {

        super({ key: 'RaceScene' });

    }




    preload() {

        this.load.image('deer', deer);

        this.load.image('wolf', wolf);

        this.load.image('deer2', deer2);

        this.load.image('snow', snow);

        this.load.spritesheet('runningdeer', sheet1, { frameWidth: 32, frameHeight: 32, endFrame: 15 });
        this.load.spritesheet('runningwolf', sheet2, { frameWidth: 64, frameHeight: 32});
    }




    create() {

        this.add.image(400, 300, 'snow').setScale(200, 200);
        this.line = new Phaser.Geom.Line(750, 700, 750, 0);
        this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } }).strokeLineShape(this.line);

        var adconfig = {
            key: 'deerrun',
            frames: this.anims.generateFrameNumbers('runningdeer', { start: 10, end: 14, first: 14 }),
            frameRate: 5,
            repeat: -1
        };

        var awconfig = {
            key: 'wolfrun',
            frames: this.anims.generateFrameNumbers('runningwolf', { start: 0, end: 4, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        this.anims.create(adconfig);
        this.anims.create(awconfig);

        this.deerSprite1 = this.physics.add.sprite(40, 200, 'runningdeer')
            .setScale(1.5, 1.5)
            .play('deerrun')
            ;

        this.deerSprite2 = this.physics.add.sprite(40, 400, 'runningdeer')
            .setScale(1.5, 1.5)
            .play('deerrun')
            ;

        this.wolfSprite1 = this.physics.add.sprite(-60, 200, "runningwolf")
            .setScale(1.5, 1.5)
            .play('wolfrun')
            ;

        this.wolfSprite2 = this.physics.add.sprite(-60, 400, "runningwolf")
            .setScale(1.5, 1.5)
            .play('wolfrun')
            ;

        keypress1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keypress2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keypress3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        keypress4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    }




    update() {

        this.wolfSprite1.x+= 0.3;

        this.wolfSprite2.x+= 0.3;

        this.checkState(this.deerSprite1, this.wolfSprite1);
        this.checkState(this.deerSprite2, this.wolfSprite2);

        if (Phaser.Input.Keyboard.JustDown(keypress1)) {
            this.deerSprite1.x += 10;
        }

        if (Phaser.Input.Keyboard.JustDown(keypress2)) {
            this.deerSprite2.x += 10;
        }

        if (Phaser.Input.Keyboard.JustDown(keypress3)) {
            this.deerSprite2.x -= 10;
        }

        if (Phaser.Input.Keyboard.JustDown(keypress4)) {
            this.deerSprite1.x -= 10;
        }

    }

    checkState(deer, wolf){
        if(deer.x <= wolf.x){
            this.add.text(deer.x, deer.y, 'Wolf got you!!!', { fontFamily: 'Arial', fontSize: 52, color: 'red' });
            deer.destroy();
        }
        else if(deer.x >= 750){
            wolf.destroy();
            this.add.text(200, deer.y, 'You got to the finish!', { fontFamily: 'Arial', fontSize: 52, color: 'green' });
        }
    }

}
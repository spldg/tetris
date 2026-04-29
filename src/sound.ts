import { Howl } from 'howler'
import bgMusic from '../assets/sounds/backgroundMusic.mp3'
import lvlChangeFx from '../assets/sounds/nextlevel.mp3'
import clearLinefx from '../assets/sounds/clearLineFx.mp3'
import FX from '../assets/sounds/fx.mp3'

export const music = new Howl({
    src: bgMusic,
    loop: true,
    volume: 0.125,
})

export const levelChangeFx = new Howl ({
    src: lvlChangeFx,
})

export const clearLineFx = new Howl ({
    src: clearLinefx
})

export const fx = new Howl ({
    src: FX
})
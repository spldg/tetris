import { Howl } from 'howler'
import bgMusic from '../assets/sounds/backgroundMusic.mp3'
import lvlChangeFx from '../assets/sounds/nextLevel.mp3'
import clearLinefx from '../assets/sounds/clearLineFx.mp3'
import FX from '../assets/sounds/fx.mp3'

function loadSound(sound: Howl): Promise<void> {
    return new Promise((resolve, reject) => {
        if (sound.state() === 'loaded') {
            resolve()
            return
        }

        sound.once('load', () => {
            resolve()
        })

        sound.once('loaderror', (_, error) => {
            reject(error)
        })

        sound.load()
    })
}

export const music = new Howl({
    src: [bgMusic],
    loop: true,
    volume: 0.125,
    preload: false,
})

export const levelChangeFx = new Howl({
    src: [lvlChangeFx],
    preload: false,
})

export const clearLineFx = new Howl({
    src: [clearLinefx],
    preload: false,
})

export const fx = new Howl({
    src: [FX],
    preload: false,
})

export function loadSounds(): Promise<void> {
    return Promise
        .all([
            music,
            levelChangeFx,
            clearLineFx,
            fx,
        ].map(loadSound))
        .then(() => undefined)
}
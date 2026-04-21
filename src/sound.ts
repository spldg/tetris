import { Howl } from 'howler'
import bgMusic from '../assets/sounds/backgroundMusic.mp3'
import malangaSound from '../assets/sounds/malanga.mp3'

export const music = new Howl({
    src: bgMusic,
    loop: true,
    volume: 0.125,
    preload: true,
})

export const malanga = new Howl({
    src: malangaSound,
    volume: 0.2
})
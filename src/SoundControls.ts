import * as PIXI from 'pixi.js'
import { FX_ROW_Y, LABEL_X, MUSIC_ROW_Y, START_MENU_VOLUME_ACTIVE_COLOR, START_MENU_VOLUME_BAR_H, START_MENU_VOLUME_BAR_W, START_MENU_VOLUME_GAP, START_MENU_VOLUME_INACTIVE_COLOR, START_MENU_VOLUME_STEPS, START_MENU_VOLUME_X } from './constants'
import { music } from './sound'

export class SoundControls extends PIXI.Container {
    private musicText = new PIXI.Text('Music', {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0x000000
    })
    private musicLevel = 0
    private musicBars: PIXI.Graphics[] = []
    private fxText = new PIXI.Text('FX', {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0x000000
    })
    private fxLevel = 0
    private fxBars: PIXI.Graphics[] = []

    constructor() {
        super()
        this.musicLevel = Number(localStorage.getItem('musicLevel')) || 0
        this.musicText.anchor.set(0, 0.5)
        this.musicText.position.set(LABEL_X, MUSIC_ROW_Y)
        this.drawBars(this.musicBars, this.musicLevel, MUSIC_ROW_Y, 'music')

        this.fxLevel = Number(localStorage.getItem('fxLevel')) || 0
        this.fxText.anchor.set(0, 0.5)
        this.fxText.position.set(LABEL_X, FX_ROW_Y)
        this.drawBars(this.fxBars, this.fxLevel, FX_ROW_Y, 'fx')

        this.addChild(
            this.musicText,
            this.fxText,
        )
    }

    private drawBars(bars: PIXI.Graphics[], volLevel: number, rowY: number, kind: 'music' | 'fx'): void {
        for (let i = 0; i < START_MENU_VOLUME_STEPS; i++) {
            const bar = new PIXI.Graphics()
            const x = START_MENU_VOLUME_X + i * (START_MENU_VOLUME_BAR_W + START_MENU_VOLUME_GAP)
            const y = rowY - START_MENU_VOLUME_BAR_H / 2

            const color = i < volLevel
                ? START_MENU_VOLUME_ACTIVE_COLOR
                : START_MENU_VOLUME_INACTIVE_COLOR
            bar
                .beginFill(color)
                .drawRect(x, y, START_MENU_VOLUME_BAR_W, START_MENU_VOLUME_BAR_H)
                .endFill()
            bar.interactive = true
            bar.on('pointertap', () => {
                if (kind === 'music') {
                    this.musicLevel = i + 1
                    this.onMusicChange(this.musicLevel)
                    this.redrawMusicBars()
                } else {
                    this.fxLevel = i + 1
                    this.onFxChange(this.fxLevel)
                    this.redrawFxBars()
                }
            })
            bars.push(bar)
            this.addChild(bar)
        }
    }
    private clearBars(bars: PIXI.Graphics[]): void {
        for (const bar of bars) {
            this.removeChild(bar)
        }
        bars.length = 0
    }

    private redrawMusicBars(): void {
        this.clearBars(this.musicBars)
        this.drawBars(this.musicBars, this.musicLevel, MUSIC_ROW_Y, 'music')
    }

    private redrawFxBars(): void {
        this.clearBars(this.fxBars)
        this.drawBars(this.fxBars, this.fxLevel, FX_ROW_Y, 'fx')
    }

    private onMusicChange(level: number): void {
        const volume = level / 5
        music.volume(volume)
        localStorage.setItem('musicLevel', String(level))
    }

    private onFxChange(level: number): void {
        const volume = level / 5
        localStorage.setItem('fxLevel', String(level))
    }
}
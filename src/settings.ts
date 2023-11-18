import RpgClock from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export interface RpgClockSettings {
    clockSize: number;
    clockColor: Color
}

export const DefaultSettings: RpgClockSettings = {
    clockSize: 150,
    clockColor: '#ff5757',
}

export class SettingsTab extends PluginSettingTab {
    plugin: RpgClock;

    constructor(app: App, plugin: RpgClock){
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        let { settings } = this.plugin;
        
        containerEl.empty();
        
        new Setting(containerEl)
            .setName('Clock Size')
            .setDesc('How big the clock should be')
            .addText((text) => {
                text
                    .setValue(settings.clockSize.toString())
                    .onChange(async (value) => {
                        settings.clockSize = Number(value);
                        await this.plugin.saveSettings();
                    })
                })

        new Setting(containerEl)
            .setName('Clock Color')
            .setDesc('Which color should be the clock')
            .addColorPicker((colorPicker) => {
                colorPicker
                    .setValue(settings.clockColor)
                    .onChange(async (value) => {
                        settings.clockColor = value as Color;
                        await this.plugin.saveSettings();
                    })
            })
    }

    hide() {
        if(this.plugin?.clocks){
            for(let palette of this.plugin.clocks){
                palette.refresh();
            }
        }
    }
}
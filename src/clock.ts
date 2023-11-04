import { MarkdownRenderChild, Notice } from "obsidian";
//import colorsea from 'colorsea';
import RpgClock, { urlRegex } from "./main";
import { RpgClockSettings } from "./settings";

export class Clock extends MarkdownRenderChild {
    plugin: RpgClock;
    settings: RpgClockSettings;
	input: string;
	colors: string[];

	constructor(plugin: RpgClock, settings: RpgClockSettings, containerEl: HTMLElement, input: string) {
	  super(containerEl);
      this.plugin = plugin;
      this.settings = settings;
	  this.input = input;
	  this.colors = [];
	}
  
	onload() {
		// Check if link & contains dashes (coolor url)
		this.input.match(urlRegex) && this.input.contains('-') ? 
        this.colors = this.input.substring(this.input.lastIndexOf('/') + 1).split('-').map(i => '#' + i)
		:
        // Check if link (colorhunt)
        this.input.match(urlRegex) ?
        this.colors = this.input.substring(this.input.lastIndexOf('/') + 1).match(/.{1,6}/g)?.map(i => '#' + i) || ['Invalid Palette']
        :
        // Check for comma newline
        this.input.contains(',\n') ?
        this.colors = this.input.split(',\n')
        :
        // Check for just newline
        this.input.contains('\n') ?
        this.colors = this.input.split('\n')
        :
        // Just comma
        this.input.contains(',') ?
        this.colors = this.input.split(',')
        :
        // Check if hex color
        this.input.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) ?
        this.colors[0] = this.input
        :
        // Not matching
        this.colors[0] = 'Invalid Clock'

        // Add new palette to state
        if(this.colors[0] !== 'Invalid Clock'){
            this.plugin.clocks?.push(this);
        }

        this.createClock();
	}

    unload() {
        // Remove palette from state
        if(this.colors[0] !== 'Invalid Clock'){
            this.plugin.clocks?.remove(this);
        }
    }

    public refresh(){
        this.containerEl.empty();
        this.createClock()
    }
    

    public createClock(){
        this.containerEl.innerHTML=`<div class="clock" bad="" n="6" style="--n: 6;">
        <div class="widget">
            <div class="core">
                <div class="slice" i="0" filled style="--i: 0;"></div>
                <div class="slice" i="1" filled style="--i: 1;"></div>
                <div class="slice" i="2" filled style="--i: 2;"></div>
                <div class="slice" i="3" filled style="--i: 3;"></div>
                <div class="slice" i="4" style="--i: 4;"></div>
                <div class="slice" i="5" style="--i: 5;"></div>
                
                <div class="bar" i="0" style="--i: 0;">
                    <div class="paint"></div>
                </div>
                <div class="bar" i="1" style="--i: 1;">
                    <div class="paint"></div>
                </div>
                <div class="bar" i="2" style="--i: 2;">
                    <div class="paint"></div>
                </div>
                <div class="bar" i="3" style="--i: 3;">
                    <div class="paint"></div>
                </div>
                <div class="bar" i="4" style="--i: 4;">
                    <div class="paint"></div>
                </div>
            </div>
            <!--div class="disc"></-div-->
        </div>
        </div>`
    }



    /*
    public createClock(){
        console.log("nrsat");
        this.containerEl.addClass('palette')
        //this.containerEl.toggleClass('paletteColumn', this.settings.paletteDirection === 'column');
        // set --palette-height css variable
        this.containerEl.style.setProperty('--clock-size', this.settings.clockSize.toString() + 'px')
		for(const color of this.colors){
            const csColor = color;//colorsea(color);

			let child = this.containerEl.createEl('div');
            // set --palette-background-color css variable
            child.style.setProperty('--palette-background-color', color);
            // set --palette-column-flex-basis css variable
            child.style.setProperty('--palette-column-flex-basis', (this.settings.clockSize / this.colors.length / 2).toString() + 'px');

            const invalidPalette =  this.colors[0] === "Invalid Palette"
            
            let childText = child.createEl('span', { text: color.toUpperCase() });
            childText.toggleClass('invalid', invalidPalette);
            // set --palette-color css variable
            childText.style.setProperty(
                '--palette-color', 
                'blue'
                //(csColor.rgb()[0]*0.299 + csColor.rgb()[1]*0.587 + csColor.rgb()[2]*0.114) > 186 ? '#000000' : '#ffffff'
            )

            child.onClickEvent((e) => {
                if(invalidPalette) return;
                new Notice(`Copied ${color}`);
                navigator.clipboard.writeText(color)
            });
		}
    }
    */
}
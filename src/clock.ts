import { MarkdownRenderChild } from "obsidian";
import RpgClock from "./main";
import { Color, RpgClockSettings } from "./settings";

export class Clock extends MarkdownRenderChild {
    plugin: RpgClock;
    settings: RpgClockSettings;
	input: string;
	clocks: string[];

	constructor(plugin: RpgClock, settings: RpgClockSettings, containerEl: HTMLElement, input: string) {
	  super(containerEl);
      this.plugin = plugin;
      this.settings = settings;
	  this.input = input;
	  this.clocks = [];
	}
  
	onload() {
        console.log("onload: clean");
        this.containerEl.innerHTML = "";

        // multiple definitions
        this.clocks = this.input.split("\n");
        
        this.clocks.forEach((clock)=>{
            const [clockName,clockValue,clockColor] = clock.split(":");
            const [filled, total] = clockValue? clockValue.split("/"):clockName.split("/");
            this.createClock(clockValue? clockName:"", parseInt(filled,10),parseInt(total,10),clockColor as Color);
        });
	}

    unload() {
        // Remove palette from state
        if(this.clocks[0] !== 'Invalid Clock'){
            this.plugin.clocks?.remove(this);
        }
    }

    public refresh(){
        this.containerEl.empty();
        console.log("refresh");
        //this.createClock()
    }
    
    /**
     * Add a new clock to html element
     * @param clockName 
     * @param filled 
     * @param totalCount 
     */
    public createClock(clockName:string, filled:number,totalCount:number,color:Color){
        let {clockColor} = this.settings;
        if(color){
            clockColor=color;
        }
        console.log("Create clock: ", clockName , `${filled}/${totalCount}`);
        this.containerEl.innerHTML+=`<div class="clock" n="${totalCount}" style="--n: ${totalCount}; --clock-color:${clockColor}">
        <div class="description">${clockName}</div>
            <div class="widget">
                <div class="core">
                    ${this._slices(totalCount, filled)}
                    ${this._bars(totalCount)}
                </div>
            </div>
        </div>`
    }


    /**
     * Generate slices
     * @param count 
     * @param filled 
     * @returns 
     */
    private _slices(count:number,filled:number){
        return new Array(count)
            .fill(0)
            .reduce((a,_,i) => [...a, `<div class="slice" i="${i}" ${filled<=i?"":"filled"} style="--i: ${i};"></div>`],[])
            .join("\n");
    }

    /**
     * Generate Bars
     * @param count 
     * @returns 
     */
    private _bars(count:number){
        return new Array(count)
            .fill(0)
            //.reduce((a,_,i) => [...a, `<div class="slice" i="${i}" ${filled<=i?"":"filled"} style="--i: ${i};"></div>`],[])
            .reduce((a,_,i) => [...a, ` <div class="bar" i="${i}" style="--i: ${i};">
                                            <div class="paint"></div>
                                        </div>`],[])
            .join("\n");
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
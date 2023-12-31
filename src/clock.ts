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

}
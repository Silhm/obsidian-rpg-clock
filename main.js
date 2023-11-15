/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => RpgClock,
  urlRegex: () => urlRegex
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/clock.ts
var import_obsidian = require("obsidian");
var Clock = class extends import_obsidian.MarkdownRenderChild {
  constructor(plugin, settings, containerEl, input) {
    super(containerEl);
    this.plugin = plugin;
    this.settings = settings;
    this.input = input;
    this.clocks = [];
  }
  onload() {
    console.log("onload: clean");
    this.containerEl.innerHTML = "";
    this.clocks = this.input.split("\n");
    this.clocks.forEach((clock) => {
      const [clockName, clockValue] = clock.split(":");
      const [filled, total] = clockValue ? clockValue.split("/") : clockName.split("/");
      this.createClock(clockValue ? clockName : "", parseInt(filled, 10), parseInt(total, 10));
    });
  }
  unload() {
    var _a;
    if (this.clocks[0] !== "Invalid Clock") {
      (_a = this.plugin.clocks) == null ? void 0 : _a.remove(this);
    }
  }
  refresh() {
    this.containerEl.empty();
    console.log("refresh");
  }
  /**
   * Add a new clock to html element
   * @param clockName 
   * @param filled 
   * @param totalCount 
   */
  createClock(clockName, filled, totalCount) {
    console.log("Create clock: ", clockName, `${filled}/${totalCount}`);
    this.containerEl.innerHTML += `<div class="clock" bad="" n="${totalCount}" style="--n: ${totalCount};">
        <div class="description">${clockName}</div>
            <div class="widget">
                <div class="core">
                    ${this._slices(totalCount, filled)}
                    ${this._bars(totalCount)}
                </div>
            </div>
        </div>`;
  }
  /**
   * Generate slices
   * @param count 
   * @param filled 
   * @returns 
   */
  _slices(count, filled) {
    return new Array(count).fill(0).reduce((a, _, i) => [...a, `<div class="slice" i="${i}" ${filled <= i ? "" : "filled"} style="--i: ${i};"></div>`], []).join("\n");
  }
  /**
   * Generate Bars
   * @param count 
   * @returns 
   */
  _bars(count) {
    return new Array(count).fill(0).reduce((a, _, i) => [...a, ` <div class="bar" i="${i}" style="--i: ${i};">
                                            <div class="paint"></div>
                                        </div>`], []).join("\n");
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
};

// src/settings.ts
var import_obsidian2 = require("obsidian");
var DefaultSettings = {
  clockSize: 150,
  clockColor: "#0f96ff"
};
var SettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    let { settings } = this.plugin;
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setName("Clock Size").setDesc("How big the clock should be").addText((text) => {
      text.setValue(settings.clockSize.toString()).onChange(async (value) => {
        settings.clockSize = Number(value);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(containerEl).setName("Clock Color").setDesc("Which color should be the clock").addDropdown((dropdown) => {
      dropdown.addOptions({ "row": "column", "column": "row" }).setValue(settings.clockColor).onChange(async (value) => {
        settings.clockColor = value;
        await this.plugin.saveSettings();
      });
    });
  }
  hide() {
    var _a;
    if ((_a = this.plugin) == null ? void 0 : _a.clocks) {
      for (let palette of this.plugin.clocks) {
        palette.refresh();
      }
    }
  }
};

// src/main.ts
var urlRegex = /\/([^\/]+)\/?$/;
var RpgClock = class extends import_obsidian3.Plugin {
  async onload() {
    this.clocks = [];
    await this.loadSettings();
    this.registerMarkdownCodeBlockProcessor(
      "clock",
      async (source, el, ctx) => {
        ctx.addChild(new Clock(this, this.settings, el, source.trim()));
      }
    );
    this.addCommand({
      id: "convert-link",
      name: "Convert Link",
      editorCallback: (editor) => {
        try {
          const link = editor.getSelection();
          if (!link.match(urlRegex))
            throw new Error("Selected text is not a link.");
          const codeBlock = `\`\`\`palette
${link}
\`\`\`
`;
          const cursor = editor.getCursor();
          editor.replaceSelection(codeBlock);
          editor.setCursor({
            line: cursor.line + codeBlock.split("\n").length,
            ch: 0
          });
          new import_obsidian3.Notice(`Converted ${editor.getSelection()}`);
        } catch (error) {
          new import_obsidian3.Notice(error);
        }
      }
    });
    this.addCommand({
      id: "convert-codeblock-link-to-hex",
      name: "Convert codeblock link to hex",
      editorCallback: (editor) => {
        var _a;
        try {
          const codeBlock = editor.getSelection();
          const split = codeBlock.split("\n");
          const link = split[1];
          let colors = [];
          link.match(urlRegex) && link.contains("-") ? colors = link.substring(link.lastIndexOf("/") + 1).split("-").map((i) => "#" + i) : (
            // Check if link (colorhunt)
            link.match(urlRegex) ? colors = ((_a = link.substring(link.lastIndexOf("/") + 1).match(/.{1,6}/g)) == null ? void 0 : _a.map((i) => "#" + i)) || ["Invalid Palette"] : colors = ["Invalid Palette"]
          );
          if (colors[0] === "Invalid Palette")
            throw new Error("Selected codeblock could not be converted to hex.");
          const newBlock = `\`\`\`palette
${colors.toString()}
\`\`\``;
          editor.replaceSelection(newBlock);
          new import_obsidian3.Notice(`Converted codeblock link to hex`);
        } catch (error) {
          new import_obsidian3.Notice(error);
        }
      }
    });
    this.addSettingTab(new SettingsTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DefaultSettings, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2Nsb2NrLnRzIiwgInNyYy9zZXR0aW5ncy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgRWRpdG9yLCBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0LCBOb3RpY2UsIFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJ1xuaW1wb3J0IHsgQ2xvY2sgfSBmcm9tICdzcmMvY2xvY2snO1xuaW1wb3J0IHsgUnBnQ2xvY2tTZXR0aW5ncywgRGVmYXVsdFNldHRpbmdzLCBTZXR0aW5nc1RhYiB9IGZyb20gJ3NyYy9zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCB1cmxSZWdleCA9IC9cXC8oW15cXC9dKylcXC8/JC9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnBnQ2xvY2sgZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogUnBnQ2xvY2tTZXR0aW5ncztcblx0Y2xvY2tzPzogQ2xvY2tbXTtcblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0dGhpcy5jbG9ja3MgPSBbXTtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0dGhpcy5yZWdpc3Rlck1hcmtkb3duQ29kZUJsb2NrUHJvY2Vzc29yKFxuXHRcdFx0J2Nsb2NrJyxcblx0XHRcdGFzeW5jIChzb3VyY2U6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50LCBjdHg6IE1hcmtkb3duUG9zdFByb2Nlc3NvckNvbnRleHQpID0+IHtcblx0XHRcdFx0Y3R4LmFkZENoaWxkKG5ldyBDbG9jayh0aGlzLCB0aGlzLnNldHRpbmdzLCBlbCwgc291cmNlLnRyaW0oKSkpO1xuXHRcdFx0fVxuXHRcdClcblxuXHRcdC8qXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnaW5zZXJ0LWxpbmsnLFxuXHRcdFx0bmFtZTogJ0luc2VydCBMaW5rJyxcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IpID0+IHtcblx0XHRcdFx0bmV3IENvbW1hbmRJbnB1dCh0aGlzLmFwcCwgKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZighcmVzdWx0Py5tYXRjaCh1cmxSZWdleCkpIHRocm93IG5ldyBFcnJvcignRW50ZXJlZCB0ZXh0IGlzIG5vdCBhIGxpbmsuJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBjb2RlQmxvY2sgPSBgXFxgXFxgXFxgcGFsZXR0ZVxcbiR7cmVzdWx0fVxcblxcYFxcYFxcYFxcbmA7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0XHRcdFx0XHRlZGl0b3IudHJhbnNhY3Rpb24oe1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VzOiBbeyBmcm9tOiBjdXJzb3IsIHRleHQ6IGNvZGVCbG9jayB9XVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdGVkaXRvci5zZXRDdXJzb3Ioe1xuXHRcdFx0XHRcdFx0XHRsaW5lOiBjdXJzb3IubGluZSArIGNvZGVCbG9jay5zcGxpdCgnXFxuJykubGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRjaDogMFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFkZGVkICR7cmVzdWx0fWApO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHQqL1xuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogJ2NvbnZlcnQtbGluaycsXG5cdFx0XHRuYW1lOiAnQ29udmVydCBMaW5rJyxcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuXHRcdFx0XHRcdGlmKCFsaW5rLm1hdGNoKHVybFJlZ2V4KSkgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZCB0ZXh0IGlzIG5vdCBhIGxpbmsuJyk7XG5cdFx0XHRcdFx0Y29uc3QgY29kZUJsb2NrID0gYFxcYFxcYFxcYHBhbGV0dGVcXG4ke2xpbmt9XFxuXFxgXFxgXFxgXFxuYDtcblx0XHRcdFx0XHRjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oY29kZUJsb2NrKTtcblx0XHRcdFx0XHRlZGl0b3Iuc2V0Q3Vyc29yKHtcblx0XHRcdFx0XHRcdGxpbmU6IGN1cnNvci5saW5lICsgY29kZUJsb2NrLnNwbGl0KCdcXG4nKS5sZW5ndGgsXG5cdFx0XHRcdFx0XHRjaDogMFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0bmV3IE5vdGljZShgQ29udmVydGVkICR7ZWRpdG9yLmdldFNlbGVjdGlvbigpfWApXG5cdFx0XHRcdH0gXG5cdFx0XHRcdGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdG5ldyBOb3RpY2UoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogJ2NvbnZlcnQtY29kZWJsb2NrLWxpbmstdG8taGV4Jyxcblx0XHRcdG5hbWU6ICdDb252ZXJ0IGNvZGVibG9jayBsaW5rIHRvIGhleCcsXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3QgY29kZUJsb2NrID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuXHRcdFx0XHRcdGNvbnN0IHNwbGl0ID0gY29kZUJsb2NrLnNwbGl0KCdcXG4nKVxuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSBzcGxpdFsxXTtcblx0XHRcdFx0XHRsZXQgY29sb3JzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRcdC8vIENoZWNrIGlmIGxpbmsgJiBjb250YWlucyBkYXNoZXMgKGNvb2xvciB1cmwpXG5cdFx0XHRcdFx0bGluay5tYXRjaCh1cmxSZWdleCkgJiYgbGluay5jb250YWlucygnLScpID8gXG5cdFx0XHRcdFx0Y29sb3JzID0gbGluay5zdWJzdHJpbmcobGluay5sYXN0SW5kZXhPZignLycpICsgMSkuc3BsaXQoJy0nKS5tYXAoaSA9PiAnIycgKyBpKVxuXHRcdFx0XHRcdDpcblx0XHRcdFx0XHQvLyBDaGVjayBpZiBsaW5rIChjb2xvcmh1bnQpXG5cdFx0XHRcdFx0bGluay5tYXRjaCh1cmxSZWdleCkgP1xuXHRcdFx0XHRcdGNvbG9ycyA9IGxpbmsuc3Vic3RyaW5nKGxpbmsubGFzdEluZGV4T2YoJy8nKSArIDEpLm1hdGNoKC8uezEsNn0vZyk/Lm1hcChpID0+ICcjJyArIGkpIHx8IFsnSW52YWxpZCBQYWxldHRlJ11cblx0XHRcdFx0XHQ6IFxuXHRcdFx0XHRcdGNvbG9ycyA9IFsnSW52YWxpZCBQYWxldHRlJ11cblx0XG5cdFx0XHRcdFx0aWYoY29sb3JzWzBdID09PSAnSW52YWxpZCBQYWxldHRlJykgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZCBjb2RlYmxvY2sgY291bGQgbm90IGJlIGNvbnZlcnRlZCB0byBoZXguJyk7XG5cdFxuXHRcdFx0XHRcdGNvbnN0IG5ld0Jsb2NrID0gYFxcYFxcYFxcYHBhbGV0dGVcXG4ke2NvbG9ycy50b1N0cmluZygpfVxcblxcYFxcYFxcYGA7XG5cdFx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24obmV3QmxvY2spXG5cdFx0XHRcdFx0bmV3IE5vdGljZShgQ29udmVydGVkIGNvZGVibG9jayBsaW5rIHRvIGhleGApXG5cdFx0XHRcdH0gXG5cdFx0XHRcdGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdG5ldyBOb3RpY2UoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblx0fVxuXHRcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0U2V0dGluZ3MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxufSIsICJpbXBvcnQgeyBNYXJrZG93blJlbmRlckNoaWxkIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgUnBnQ2xvY2sgZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgUnBnQ2xvY2tTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBDbG9jayBleHRlbmRzIE1hcmtkb3duUmVuZGVyQ2hpbGQge1xuICAgIHBsdWdpbjogUnBnQ2xvY2s7XG4gICAgc2V0dGluZ3M6IFJwZ0Nsb2NrU2V0dGluZ3M7XG5cdGlucHV0OiBzdHJpbmc7XG5cdGNsb2Nrczogc3RyaW5nW107XG5cblx0Y29uc3RydWN0b3IocGx1Z2luOiBScGdDbG9jaywgc2V0dGluZ3M6IFJwZ0Nsb2NrU2V0dGluZ3MsIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudCwgaW5wdXQ6IHN0cmluZykge1xuXHQgIHN1cGVyKGNvbnRhaW5lckVsKTtcbiAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHQgIHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0ICB0aGlzLmNsb2NrcyA9IFtdO1xuXHR9XG4gIFxuXHRvbmxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25sb2FkOiBjbGVhblwiKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIC8vIG11bHRpcGxlIGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuY2xvY2tzID0gdGhpcy5pbnB1dC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2xvY2tzLmZvckVhY2goKGNsb2NrKT0+e1xuICAgICAgICAgICAgY29uc3QgW2Nsb2NrTmFtZSxjbG9ja1ZhbHVlXSA9IGNsb2NrLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIGNvbnN0IFtmaWxsZWQsIHRvdGFsXSA9IGNsb2NrVmFsdWU/IGNsb2NrVmFsdWUuc3BsaXQoXCIvXCIpOmNsb2NrTmFtZS5zcGxpdChcIi9cIik7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNsb2NrKGNsb2NrVmFsdWU/IGNsb2NrTmFtZTpcIlwiLCBwYXJzZUludChmaWxsZWQsMTApLHBhcnNlSW50KHRvdGFsLDEwKSk7XG4gICAgICAgIH0pO1xuXHR9XG5cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIC8vIFJlbW92ZSBwYWxldHRlIGZyb20gc3RhdGVcbiAgICAgICAgaWYodGhpcy5jbG9ja3NbMF0gIT09ICdJbnZhbGlkIENsb2NrJyl7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5jbG9ja3M/LnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWZyZXNoXCIpO1xuICAgICAgICAvL3RoaXMuY3JlYXRlQ2xvY2soKVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBZGQgYSBuZXcgY2xvY2sgdG8gaHRtbCBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsb2NrTmFtZSBcbiAgICAgKiBAcGFyYW0gZmlsbGVkIFxuICAgICAqIEBwYXJhbSB0b3RhbENvdW50IFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVDbG9jayhjbG9ja05hbWU6c3RyaW5nLCBmaWxsZWQ6bnVtYmVyLHRvdGFsQ291bnQ6bnVtYmVyKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGUgY2xvY2s6IFwiLCBjbG9ja05hbWUgLCBgJHtmaWxsZWR9LyR7dG90YWxDb3VudH1gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5pbm5lckhUTUwrPWA8ZGl2IGNsYXNzPVwiY2xvY2tcIiBiYWQ9XCJcIiBuPVwiJHt0b3RhbENvdW50fVwiIHN0eWxlPVwiLS1uOiAke3RvdGFsQ291bnR9O1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Nsb2NrTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3aWRnZXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29yZVwiPlxuICAgICAgICAgICAgICAgICAgICAke3RoaXMuX3NsaWNlcyh0b3RhbENvdW50LCBmaWxsZWQpfVxuICAgICAgICAgICAgICAgICAgICAke3RoaXMuX2JhcnModG90YWxDb3VudCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgc2xpY2VzXG4gICAgICogQHBhcmFtIGNvdW50IFxuICAgICAqIEBwYXJhbSBmaWxsZWQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2xpY2VzKGNvdW50Om51bWJlcixmaWxsZWQ6bnVtYmVyKXtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjb3VudClcbiAgICAgICAgICAgIC5maWxsKDApXG4gICAgICAgICAgICAucmVkdWNlKChhLF8saSkgPT4gWy4uLmEsIGA8ZGl2IGNsYXNzPVwic2xpY2VcIiBpPVwiJHtpfVwiICR7ZmlsbGVkPD1pP1wiXCI6XCJmaWxsZWRcIn0gc3R5bGU9XCItLWk6ICR7aX07XCI+PC9kaXY+YF0sW10pXG4gICAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBCYXJzXG4gICAgICogQHBhcmFtIGNvdW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByaXZhdGUgX2JhcnMoY291bnQ6bnVtYmVyKXtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjb3VudClcbiAgICAgICAgICAgIC5maWxsKDApXG4gICAgICAgICAgICAvLy5yZWR1Y2UoKGEsXyxpKSA9PiBbLi4uYSwgYDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCIke2l9XCIgJHtmaWxsZWQ8PWk/XCJcIjpcImZpbGxlZFwifSBzdHlsZT1cIi0taTogJHtpfTtcIj48L2Rpdj5gXSxbXSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGEsXyxpKSA9PiBbLi4uYSwgYCA8ZGl2IGNsYXNzPVwiYmFyXCIgaT1cIiR7aX1cIiBzdHlsZT1cIi0taTogJHtpfTtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhaW50XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YF0sW10pXG4gICAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIHB1YmxpYyBjcmVhdGVDbG9jaygpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5yc2F0XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmFkZENsYXNzKCdwYWxldHRlJylcbiAgICAgICAgLy90aGlzLmNvbnRhaW5lckVsLnRvZ2dsZUNsYXNzKCdwYWxldHRlQ29sdW1uJywgdGhpcy5zZXR0aW5ncy5wYWxldHRlRGlyZWN0aW9uID09PSAnY29sdW1uJyk7XG4gICAgICAgIC8vIHNldCAtLXBhbGV0dGUtaGVpZ2h0IGNzcyB2YXJpYWJsZVxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KCctLWNsb2NrLXNpemUnLCB0aGlzLnNldHRpbmdzLmNsb2NrU2l6ZS50b1N0cmluZygpICsgJ3B4Jylcblx0XHRmb3IoY29uc3QgY29sb3Igb2YgdGhpcy5jb2xvcnMpe1xuICAgICAgICAgICAgY29uc3QgY3NDb2xvciA9IGNvbG9yOy8vY29sb3JzZWEoY29sb3IpO1xuXG5cdFx0XHRsZXQgY2hpbGQgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcbiAgICAgICAgICAgIC8vIHNldCAtLXBhbGV0dGUtYmFja2dyb3VuZC1jb2xvciBjc3MgdmFyaWFibGVcbiAgICAgICAgICAgIGNoaWxkLnN0eWxlLnNldFByb3BlcnR5KCctLXBhbGV0dGUtYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vIHNldCAtLXBhbGV0dGUtY29sdW1uLWZsZXgtYmFzaXMgY3NzIHZhcmlhYmxlXG4gICAgICAgICAgICBjaGlsZC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYWxldHRlLWNvbHVtbi1mbGV4LWJhc2lzJywgKHRoaXMuc2V0dGluZ3MuY2xvY2tTaXplIC8gdGhpcy5jb2xvcnMubGVuZ3RoIC8gMikudG9TdHJpbmcoKSArICdweCcpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnZhbGlkUGFsZXR0ZSA9ICB0aGlzLmNvbG9yc1swXSA9PT0gXCJJbnZhbGlkIFBhbGV0dGVcIlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2hpbGRUZXh0ID0gY2hpbGQuY3JlYXRlRWwoJ3NwYW4nLCB7IHRleHQ6IGNvbG9yLnRvVXBwZXJDYXNlKCkgfSk7XG4gICAgICAgICAgICBjaGlsZFRleHQudG9nZ2xlQ2xhc3MoJ2ludmFsaWQnLCBpbnZhbGlkUGFsZXR0ZSk7XG4gICAgICAgICAgICAvLyBzZXQgLS1wYWxldHRlLWNvbG9yIGNzcyB2YXJpYWJsZVxuICAgICAgICAgICAgY2hpbGRUZXh0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICctLXBhbGV0dGUtY29sb3InLCBcbiAgICAgICAgICAgICAgICAnYmx1ZSdcbiAgICAgICAgICAgICAgICAvLyhjc0NvbG9yLnJnYigpWzBdKjAuMjk5ICsgY3NDb2xvci5yZ2IoKVsxXSowLjU4NyArIGNzQ29sb3IucmdiKClbMl0qMC4xMTQpID4gMTg2ID8gJyMwMDAwMDAnIDogJyNmZmZmZmYnXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGNoaWxkLm9uQ2xpY2tFdmVudCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRQYWxldHRlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShgQ29waWVkICR7Y29sb3J9YCk7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29sb3IpXG4gICAgICAgICAgICB9KTtcblx0XHR9XG4gICAgfVxuICAgICovXG59IiwgImltcG9ydCBScGdDbG9jayBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxudHlwZSBSR0IgPSBgcmdiKCR7bnVtYmVyfSwgJHtudW1iZXJ9LCAke251bWJlcn0pYDtcbnR5cGUgUkdCQSA9IGByZ2JhKCR7bnVtYmVyfSwgJHtudW1iZXJ9LCAke251bWJlcn0sICR7bnVtYmVyfSlgO1xudHlwZSBIRVggPSBgIyR7c3RyaW5nfWA7XG5cbnR5cGUgQ29sb3IgPSBSR0IgfCBSR0JBIHwgSEVYO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJwZ0Nsb2NrU2V0dGluZ3Mge1xuICAgIGNsb2NrU2l6ZTogbnVtYmVyO1xuICAgIGNsb2NrQ29sb3I6IENvbG9yXG59XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0U2V0dGluZ3M6IFJwZ0Nsb2NrU2V0dGluZ3MgPSB7XG4gICAgY2xvY2tTaXplOiAxNTAsXG4gICAgY2xvY2tDb2xvcjogJyMwZjk2ZmYnLFxufVxuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IFJwZ0Nsb2NrO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogUnBnQ2xvY2spe1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGRpc3BsYXkoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGxldCB7IHNldHRpbmdzIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIFxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdDbG9jayBTaXplJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdIb3cgYmlnIHRoZSBjbG9jayBzaG91bGQgYmUnKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZXR0aW5ncy5jbG9ja1NpemUudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuY2xvY2tTaXplID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnQ2xvY2sgQ29sb3InKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doaWNoIGNvbG9yIHNob3VsZCBiZSB0aGUgY2xvY2snKVxuICAgICAgICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgIC8vIEludmVydGVkIHRvIG1hdGNoIHVzZXIgZXhwZWN0YXRpb25zXG4gICAgICAgICAgICAgICAgICAgIC5hZGRPcHRpb25zKHsncm93JzogJ2NvbHVtbicsICdjb2x1bW4nOiAncm93J30pXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZXR0aW5ncy5jbG9ja0NvbG9yKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jbG9ja0NvbG9yID0gdmFsdWUgYXMgQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYodGhpcy5wbHVnaW4/LmNsb2Nrcyl7XG4gICAgICAgICAgICBmb3IobGV0IHBhbGV0dGUgb2YgdGhpcy5wbHVnaW4uY2xvY2tzKXtcbiAgICAgICAgICAgICAgICBwYWxldHRlLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSxtQkFBcUU7OztBQ0FyRSxzQkFBb0M7QUFJN0IsSUFBTSxRQUFOLGNBQW9CLG9DQUFvQjtBQUFBLEVBTTlDLFlBQVksUUFBa0IsVUFBNEIsYUFBMEIsT0FBZTtBQUNqRyxVQUFNLFdBQVc7QUFDZCxTQUFLLFNBQVM7QUFDZCxTQUFLLFdBQVc7QUFDbkIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxTQUFTLENBQUM7QUFBQSxFQUNqQjtBQUFBLEVBRUEsU0FBUztBQUNGLFlBQVEsSUFBSSxlQUFlO0FBQzNCLFNBQUssWUFBWSxZQUFZ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O0FBQUE7QUFBQTtBQUN4QyxnQkFBTSxTQUFTLE9BQU8sVUFBVTtBQUNoQyxpQkFBTyxpQkFBaUIsU0FBUztBQUNqQyxpQkFBTyxVQUFVO0FBQUEsWUFDaEIsTUFBTSxPQUFPLE9BQU8sVUFBVSxNQUFNLElBQUksRUFBRTtBQUFBLFlBQzFDLElBQUk7QUFBQSxVQUNMLENBQUM7QUFDRCxjQUFJLHdCQUFPLGFBQWEsT0FBTyxhQUFhLENBQUMsRUFBRTtBQUFBLFFBQ2hELFNBQ08sT0FBTztBQUNiLGNBQUksd0JBQU8sS0FBSztBQUFBLFFBQ2pCO0FBQUEsTUFDRDtBQUFBLElBQ0QsQ0FBQztBQUVELFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLENBQUMsV0FBbUI7QUF6RXZDO0FBMEVJLFlBQUk7QUFDSCxnQkFBTSxZQUFZLE9BQU8sYUFBYTtBQUN0QyxnQkFBTSxRQUFRLFVBQVUsTUFBTSxJQUFJO0FBQ2xDLGdCQUFNLE9BQU8sTUFBTSxDQUFDO0FBQ3BCLGNBQUksU0FBbUIsQ0FBQztBQUV4QixlQUFLLE1BQU0sUUFBUSxLQUFLLEtBQUssU0FBUyxHQUFHLElBQ3pDLFNBQVMsS0FBSyxVQUFVLEtBQUssWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksT0FBSyxNQUFNLENBQUM7QUFBQTtBQUFBLFlBRzlFLEtBQUssTUFBTSxRQUFRLElBQ25CLFdBQVMsVUFBSyxVQUFVLEtBQUssWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLE1BQU0sU0FBUyxNQUF6RCxtQkFBNEQsSUFBSSxPQUFLLE1BQU0sT0FBTSxDQUFDLGlCQUFpQixJQUU1RyxTQUFTLENBQUMsaUJBQWlCO0FBQUE7QUFFM0IsY0FBRyxPQUFPLENBQUMsTUFBTTtBQUFtQixrQkFBTSxJQUFJLE1BQU0sbURBQW1EO0FBRXZHLGdCQUFNLFdBQVc7QUFBQSxFQUFrQixPQUFPLFNBQVMsQ0FBQztBQUFBO0FBQ3BELGlCQUFPLGlCQUFpQixRQUFRO0FBQ2hDLGNBQUksd0JBQU8saUNBQWlDO0FBQUEsUUFDN0MsU0FDTyxPQUFPO0FBQ2IsY0FBSSx3QkFBTyxLQUFLO0FBQUEsUUFDakI7QUFBQSxNQUNEO0FBQUEsSUFDRCxDQUFDO0FBRUQsU0FBSyxjQUFjLElBQUksWUFBWSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQUEsRUFDbkQ7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUMsR0FBRyxpQkFBaUIsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQ3pFO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDcEIsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUFDRDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K

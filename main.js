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
  default: () => RpgClock2,
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
    this.colors = [];
  }
  onload() {
    var _a, _b;
    this.input.match(urlRegex) && this.input.contains("-") ? this.colors = this.input.substring(this.input.lastIndexOf("/") + 1).split("-").map((i) => "#" + i) : (
      // Check if link (colorhunt)
      this.input.match(urlRegex) ? this.colors = ((_a = this.input.substring(this.input.lastIndexOf("/") + 1).match(/.{1,6}/g)) == null ? void 0 : _a.map((i) => "#" + i)) || ["Invalid Palette"] : (
        // Check for comma newline
        this.input.contains(",\n") ? this.colors = this.input.split(",\n") : (
          // Check for just newline
          this.input.contains("\n") ? this.colors = this.input.split("\n") : (
            // Just comma
            this.input.contains(",") ? this.colors = this.input.split(",") : (
              // Check if hex color
              this.input.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) ? this.colors[0] = this.input : (
                // Not matching
                this.colors[0] = "Invalid Clock"
              )
            )
          )
        )
      )
    );
    if (this.colors[0] !== "Invalid Clock") {
      (_b = this.plugin.clocks) == null ? void 0 : _b.push(this);
    }
    this.createClock();
  }
  unload() {
    var _a;
    if (this.colors[0] !== "Invalid Clock") {
      (_a = this.plugin.clocks) == null ? void 0 : _a.remove(this);
    }
  }
  refresh() {
    this.containerEl.empty();
    this.createClock();
  }
  createClock() {
    this.containerEl.innerHTML = `<div class="clock" bad="" n="6" style="--n: 6;">
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
        </div>`;
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
var RpgClock2 = class extends import_obsidian3.Plugin {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2Nsb2NrLnRzIiwgInNyYy9zZXR0aW5ncy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgRWRpdG9yLCBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0LCBOb3RpY2UsIFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJ1xuLy9pbXBvcnQgeyBDb21tYW5kSW5wdXQgfSBmcm9tICdzcmMvY29tbWFuZElucHV0JztcbmltcG9ydCB7IENsb2NrIH0gZnJvbSAnc3JjL2Nsb2NrJztcbmltcG9ydCB7IFJwZ0Nsb2NrU2V0dGluZ3MsIERlZmF1bHRTZXR0aW5ncywgU2V0dGluZ3NUYWIgfSBmcm9tICdzcmMvc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgdXJsUmVnZXggPSAvXFwvKFteXFwvXSspXFwvPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJwZ0Nsb2NrIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IFJwZ0Nsb2NrU2V0dGluZ3M7XG5cdGNsb2Nrcz86IENsb2NrW107XG5cblx0YXN5bmMgb25sb2FkKCkge1xuXHRcdHRoaXMuY2xvY2tzID0gW107XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJNYXJrZG93bkNvZGVCbG9ja1Byb2Nlc3Nvcihcblx0XHRcdCdjbG9jaycsXG5cdFx0XHRhc3luYyAoc291cmNlOiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgY3R4OiBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0KSA9PiB7XG5cdFx0XHRcdGN0eC5hZGRDaGlsZChuZXcgQ2xvY2sodGhpcywgdGhpcy5zZXR0aW5ncywgZWwsIHNvdXJjZS50cmltKCkpKTtcblx0XHRcdH1cblx0XHQpXG5cblx0XHQvKlxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogJ2luc2VydC1saW5rJyxcblx0XHRcdG5hbWU6ICdJbnNlcnQgTGluaycsXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yKSA9PiB7XG5cdFx0XHRcdG5ldyBDb21tYW5kSW5wdXQodGhpcy5hcHAsIChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0aWYoIXJlc3VsdD8ubWF0Y2godXJsUmVnZXgpKSB0aHJvdyBuZXcgRXJyb3IoJ0VudGVyZWQgdGV4dCBpcyBub3QgYSBsaW5rLicpO1xuXHRcdFx0XHRcdFx0Y29uc3QgY29kZUJsb2NrID0gYFxcYFxcYFxcYHBhbGV0dGVcXG4ke3Jlc3VsdH1cXG5cXGBcXGBcXGBcXG5gO1xuXHRcdFx0XHRcdFx0Y29uc3QgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuXHRcdFx0XHRcdFx0ZWRpdG9yLnRyYW5zYWN0aW9uKHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlczogW3sgZnJvbTogY3Vyc29yLCB0ZXh0OiBjb2RlQmxvY2sgfV1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRlZGl0b3Iuc2V0Q3Vyc29yKHtcblx0XHRcdFx0XHRcdFx0bGluZTogY3Vyc29yLmxpbmUgKyBjb2RlQmxvY2suc3BsaXQoJ1xcbicpLmxlbmd0aCxcblx0XHRcdFx0XHRcdFx0Y2g6IDBcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBZGRlZCAke3Jlc3VsdH1gKTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0bmV3IE5vdGljZShlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQub3BlbigpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0Ki9cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6ICdjb252ZXJ0LWxpbmsnLFxuXHRcdFx0bmFtZTogJ0NvbnZlcnQgTGluaycsXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3QgbGluayA9IGVkaXRvci5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdFx0XHRpZighbGluay5tYXRjaCh1cmxSZWdleCkpIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWQgdGV4dCBpcyBub3QgYSBsaW5rLicpO1xuXHRcdFx0XHRcdGNvbnN0IGNvZGVCbG9jayA9IGBcXGBcXGBcXGBwYWxldHRlXFxuJHtsaW5rfVxcblxcYFxcYFxcYFxcbmA7XG5cdFx0XHRcdFx0Y29uc3QgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuXHRcdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKGNvZGVCbG9jayk7XG5cdFx0XHRcdFx0ZWRpdG9yLnNldEN1cnNvcih7XG5cdFx0XHRcdFx0XHRsaW5lOiBjdXJzb3IubGluZSArIGNvZGVCbG9jay5zcGxpdCgnXFxuJykubGVuZ3RoLFxuXHRcdFx0XHRcdFx0Y2g6IDBcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdG5ldyBOb3RpY2UoYENvbnZlcnRlZCAke2VkaXRvci5nZXRTZWxlY3Rpb24oKX1gKVxuXHRcdFx0XHR9IFxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRuZXcgTm90aWNlKGVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6ICdjb252ZXJ0LWNvZGVibG9jay1saW5rLXRvLWhleCcsXG5cdFx0XHRuYW1lOiAnQ29udmVydCBjb2RlYmxvY2sgbGluayB0byBoZXgnLFxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvcikgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IGNvZGVCbG9jayA9IGVkaXRvci5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdFx0XHRjb25zdCBzcGxpdCA9IGNvZGVCbG9jay5zcGxpdCgnXFxuJylcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gc3BsaXRbMV07XG5cdFx0XHRcdFx0bGV0IGNvbG9yczogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiBsaW5rICYgY29udGFpbnMgZGFzaGVzIChjb29sb3IgdXJsKVxuXHRcdFx0XHRcdGxpbmsubWF0Y2godXJsUmVnZXgpICYmIGxpbmsuY29udGFpbnMoJy0nKSA/IFxuXHRcdFx0XHRcdGNvbG9ycyA9IGxpbmsuc3Vic3RyaW5nKGxpbmsubGFzdEluZGV4T2YoJy8nKSArIDEpLnNwbGl0KCctJykubWFwKGkgPT4gJyMnICsgaSlcblx0XHRcdFx0XHQ6XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgbGluayAoY29sb3JodW50KVxuXHRcdFx0XHRcdGxpbmsubWF0Y2godXJsUmVnZXgpID9cblx0XHRcdFx0XHRjb2xvcnMgPSBsaW5rLnN1YnN0cmluZyhsaW5rLmxhc3RJbmRleE9mKCcvJykgKyAxKS5tYXRjaCgvLnsxLDZ9L2cpPy5tYXAoaSA9PiAnIycgKyBpKSB8fCBbJ0ludmFsaWQgUGFsZXR0ZSddXG5cdFx0XHRcdFx0OiBcblx0XHRcdFx0XHRjb2xvcnMgPSBbJ0ludmFsaWQgUGFsZXR0ZSddXG5cdFxuXHRcdFx0XHRcdGlmKGNvbG9yc1swXSA9PT0gJ0ludmFsaWQgUGFsZXR0ZScpIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWQgY29kZWJsb2NrIGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gaGV4LicpO1xuXHRcblx0XHRcdFx0XHRjb25zdCBuZXdCbG9jayA9IGBcXGBcXGBcXGBwYWxldHRlXFxuJHtjb2xvcnMudG9TdHJpbmcoKX1cXG5cXGBcXGBcXGBgO1xuXHRcdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKG5ld0Jsb2NrKVxuXHRcdFx0XHRcdG5ldyBOb3RpY2UoYENvbnZlcnRlZCBjb2RlYmxvY2sgbGluayB0byBoZXhgKVxuXHRcdFx0XHR9IFxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRuZXcgTm90aWNlKGVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cdH1cblx0XG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdFNldHRpbmdzLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn0iLCAiaW1wb3J0IHsgTWFya2Rvd25SZW5kZXJDaGlsZCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG4vL2ltcG9ydCBjb2xvcnNlYSBmcm9tICdjb2xvcnNlYSc7XG5pbXBvcnQgUnBnQ2xvY2ssIHsgdXJsUmVnZXggfSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBScGdDbG9ja1NldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcblxuZXhwb3J0IGNsYXNzIENsb2NrIGV4dGVuZHMgTWFya2Rvd25SZW5kZXJDaGlsZCB7XG4gICAgcGx1Z2luOiBScGdDbG9jaztcbiAgICBzZXR0aW5nczogUnBnQ2xvY2tTZXR0aW5ncztcblx0aW5wdXQ6IHN0cmluZztcblx0Y29sb3JzOiBzdHJpbmdbXTtcblxuXHRjb25zdHJ1Y3RvcihwbHVnaW46IFJwZ0Nsb2NrLCBzZXR0aW5nczogUnBnQ2xvY2tTZXR0aW5ncywgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50LCBpbnB1dDogc3RyaW5nKSB7XG5cdCAgc3VwZXIoY29udGFpbmVyRWwpO1xuICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdCAgdGhpcy5pbnB1dCA9IGlucHV0O1xuXHQgIHRoaXMuY29sb3JzID0gW107XG5cdH1cbiAgXG5cdG9ubG9hZCgpIHtcblx0XHQvLyBDaGVjayBpZiBsaW5rICYgY29udGFpbnMgZGFzaGVzIChjb29sb3IgdXJsKVxuXHRcdHRoaXMuaW5wdXQubWF0Y2godXJsUmVnZXgpICYmIHRoaXMuaW5wdXQuY29udGFpbnMoJy0nKSA/IFxuICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHRoaXMuaW5wdXQubGFzdEluZGV4T2YoJy8nKSArIDEpLnNwbGl0KCctJykubWFwKGkgPT4gJyMnICsgaSlcblx0XHQ6XG4gICAgICAgIC8vIENoZWNrIGlmIGxpbmsgKGNvbG9yaHVudClcbiAgICAgICAgdGhpcy5pbnB1dC5tYXRjaCh1cmxSZWdleCkgP1xuICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHRoaXMuaW5wdXQubGFzdEluZGV4T2YoJy8nKSArIDEpLm1hdGNoKC8uezEsNn0vZyk/Lm1hcChpID0+ICcjJyArIGkpIHx8IFsnSW52YWxpZCBQYWxldHRlJ11cbiAgICAgICAgOlxuICAgICAgICAvLyBDaGVjayBmb3IgY29tbWEgbmV3bGluZVxuICAgICAgICB0aGlzLmlucHV0LmNvbnRhaW5zKCcsXFxuJykgP1xuICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuaW5wdXQuc3BsaXQoJyxcXG4nKVxuICAgICAgICA6XG4gICAgICAgIC8vIENoZWNrIGZvciBqdXN0IG5ld2xpbmVcbiAgICAgICAgdGhpcy5pbnB1dC5jb250YWlucygnXFxuJykgP1xuICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuaW5wdXQuc3BsaXQoJ1xcbicpXG4gICAgICAgIDpcbiAgICAgICAgLy8gSnVzdCBjb21tYVxuICAgICAgICB0aGlzLmlucHV0LmNvbnRhaW5zKCcsJykgP1xuICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuaW5wdXQuc3BsaXQoJywnKVxuICAgICAgICA6XG4gICAgICAgIC8vIENoZWNrIGlmIGhleCBjb2xvclxuICAgICAgICB0aGlzLmlucHV0Lm1hdGNoKC9eIyhbMC05YS1mXXszfXxbMC05YS1mXXs2fSkkL2kpID9cbiAgICAgICAgdGhpcy5jb2xvcnNbMF0gPSB0aGlzLmlucHV0XG4gICAgICAgIDpcbiAgICAgICAgLy8gTm90IG1hdGNoaW5nXG4gICAgICAgIHRoaXMuY29sb3JzWzBdID0gJ0ludmFsaWQgQ2xvY2snXG5cbiAgICAgICAgLy8gQWRkIG5ldyBwYWxldHRlIHRvIHN0YXRlXG4gICAgICAgIGlmKHRoaXMuY29sb3JzWzBdICE9PSAnSW52YWxpZCBDbG9jaycpe1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uY2xvY2tzPy5wdXNoKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVDbG9jaygpO1xuXHR9XG5cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIC8vIFJlbW92ZSBwYWxldHRlIGZyb20gc3RhdGVcbiAgICAgICAgaWYodGhpcy5jb2xvcnNbMF0gIT09ICdJbnZhbGlkIENsb2NrJyl7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5jbG9ja3M/LnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVDbG9jaygpXG4gICAgfVxuICAgIFxuXG4gICAgcHVibGljIGNyZWF0ZUNsb2NrKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwuaW5uZXJIVE1MPWA8ZGl2IGNsYXNzPVwiY2xvY2tcIiBiYWQ9XCJcIiBuPVwiNlwiIHN0eWxlPVwiLS1uOiA2O1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2lkZ2V0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29yZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCIwXCIgZmlsbGVkIHN0eWxlPVwiLS1pOiAwO1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCIxXCIgZmlsbGVkIHN0eWxlPVwiLS1pOiAxO1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCIyXCIgZmlsbGVkIHN0eWxlPVwiLS1pOiAyO1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCIzXCIgZmlsbGVkIHN0eWxlPVwiLS1pOiAzO1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbGljZVwiIGk9XCI0XCIgc3R5bGU9XCItLWk6IDQ7XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNsaWNlXCIgaT1cIjVcIiBzdHlsZT1cIi0taTogNTtcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgaT1cIjBcIiBzdHlsZT1cIi0taTogMDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhaW50XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIGk9XCIxXCIgc3R5bGU9XCItLWk6IDE7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWludFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBpPVwiMlwiIHN0eWxlPVwiLS1pOiAyO1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFpbnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgaT1cIjNcIiBzdHlsZT1cIi0taTogMztcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhaW50XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIGk9XCI0XCIgc3R5bGU9XCItLWk6IDQ7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWludFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tZGl2IGNsYXNzPVwiZGlzY1wiPjwvLWRpdi0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxuICAgIH1cblxuXG5cbiAgICAvKlxuICAgIHB1YmxpYyBjcmVhdGVDbG9jaygpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5yc2F0XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmFkZENsYXNzKCdwYWxldHRlJylcbiAgICAgICAgLy90aGlzLmNvbnRhaW5lckVsLnRvZ2dsZUNsYXNzKCdwYWxldHRlQ29sdW1uJywgdGhpcy5zZXR0aW5ncy5wYWxldHRlRGlyZWN0aW9uID09PSAnY29sdW1uJyk7XG4gICAgICAgIC8vIHNldCAtLXBhbGV0dGUtaGVpZ2h0IGNzcyB2YXJpYWJsZVxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KCctLWNsb2NrLXNpemUnLCB0aGlzLnNldHRpbmdzLmNsb2NrU2l6ZS50b1N0cmluZygpICsgJ3B4Jylcblx0XHRmb3IoY29uc3QgY29sb3Igb2YgdGhpcy5jb2xvcnMpe1xuICAgICAgICAgICAgY29uc3QgY3NDb2xvciA9IGNvbG9yOy8vY29sb3JzZWEoY29sb3IpO1xuXG5cdFx0XHRsZXQgY2hpbGQgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcbiAgICAgICAgICAgIC8vIHNldCAtLXBhbGV0dGUtYmFja2dyb3VuZC1jb2xvciBjc3MgdmFyaWFibGVcbiAgICAgICAgICAgIGNoaWxkLnN0eWxlLnNldFByb3BlcnR5KCctLXBhbGV0dGUtYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vIHNldCAtLXBhbGV0dGUtY29sdW1uLWZsZXgtYmFzaXMgY3NzIHZhcmlhYmxlXG4gICAgICAgICAgICBjaGlsZC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYWxldHRlLWNvbHVtbi1mbGV4LWJhc2lzJywgKHRoaXMuc2V0dGluZ3MuY2xvY2tTaXplIC8gdGhpcy5jb2xvcnMubGVuZ3RoIC8gMikudG9TdHJpbmcoKSArICdweCcpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnZhbGlkUGFsZXR0ZSA9ICB0aGlzLmNvbG9yc1swXSA9PT0gXCJJbnZhbGlkIFBhbGV0dGVcIlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2hpbGRUZXh0ID0gY2hpbGQuY3JlYXRlRWwoJ3NwYW4nLCB7IHRleHQ6IGNvbG9yLnRvVXBwZXJDYXNlKCkgfSk7XG4gICAgICAgICAgICBjaGlsZFRleHQudG9nZ2xlQ2xhc3MoJ2ludmFsaWQnLCBpbnZhbGlkUGFsZXR0ZSk7XG4gICAgICAgICAgICAvLyBzZXQgLS1wYWxldHRlLWNvbG9yIGNzcyB2YXJpYWJsZVxuICAgICAgICAgICAgY2hpbGRUZXh0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICctLXBhbGV0dGUtY29sb3InLCBcbiAgICAgICAgICAgICAgICAnYmx1ZSdcbiAgICAgICAgICAgICAgICAvLyhjc0NvbG9yLnJnYigpWzBdKjAuMjk5ICsgY3NDb2xvci5yZ2IoKVsxXSowLjU4NyArIGNzQ29sb3IucmdiKClbMl0qMC4xMTQpID4gMTg2ID8gJyMwMDAwMDAnIDogJyNmZmZmZmYnXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGNoaWxkLm9uQ2xpY2tFdmVudCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRQYWxldHRlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShgQ29waWVkICR7Y29sb3J9YCk7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29sb3IpXG4gICAgICAgICAgICB9KTtcblx0XHR9XG4gICAgfVxuICAgICovXG59IiwgImltcG9ydCBScGdDbG9jayBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxudHlwZSBSR0IgPSBgcmdiKCR7bnVtYmVyfSwgJHtudW1iZXJ9LCAke251bWJlcn0pYDtcbnR5cGUgUkdCQSA9IGByZ2JhKCR7bnVtYmVyfSwgJHtudW1iZXJ9LCAke251bWJlcn0sICR7bnVtYmVyfSlgO1xudHlwZSBIRVggPSBgIyR7c3RyaW5nfWA7XG5cbnR5cGUgQ29sb3IgPSBSR0IgfCBSR0JBIHwgSEVYO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJwZ0Nsb2NrU2V0dGluZ3Mge1xuICAgIGNsb2NrU2l6ZTogbnVtYmVyO1xuICAgIGNsb2NrQ29sb3I6IENvbG9yXG59XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0U2V0dGluZ3M6IFJwZ0Nsb2NrU2V0dGluZ3MgPSB7XG4gICAgY2xvY2tTaXplOiAxNTAsXG4gICAgY2xvY2tDb2xvcjogJyMwZjk2ZmYnLFxufVxuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IFJwZ0Nsb2NrO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogUnBnQ2xvY2spe1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGRpc3BsYXkoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGxldCB7IHNldHRpbmdzIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIFxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdDbG9jayBTaXplJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdIb3cgYmlnIHRoZSBjbG9jayBzaG91bGQgYmUnKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZXR0aW5ncy5jbG9ja1NpemUudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuY2xvY2tTaXplID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnQ2xvY2sgQ29sb3InKVxuICAgICAgICAgICAgLnNldERlc2MoJ1doaWNoIGNvbG9yIHNob3VsZCBiZSB0aGUgY2xvY2snKVxuICAgICAgICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgIC8vIEludmVydGVkIHRvIG1hdGNoIHVzZXIgZXhwZWN0YXRpb25zXG4gICAgICAgICAgICAgICAgICAgIC5hZGRPcHRpb25zKHsncm93JzogJ2NvbHVtbicsICdjb2x1bW4nOiAncm93J30pXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZXR0aW5ncy5jbG9ja0NvbG9yKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jbG9ja0NvbG9yID0gdmFsdWUgYXMgQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYodGhpcy5wbHVnaW4/LmNsb2Nrcyl7XG4gICAgICAgICAgICBmb3IobGV0IHBhbGV0dGUgb2YgdGhpcy5wbHVnaW4uY2xvY2tzKXtcbiAgICAgICAgICAgICAgICBwYWxldHRlLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsaUJBQUFBO0FBQUEsRUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQyxtQkFBcUU7OztBQ0FyRSxzQkFBNEM7QUFLckMsSUFBTSxRQUFOLGNBQW9CLG9DQUFvQjtBQUFBLEVBTTlDLFlBQVksUUFBa0IsVUFBNEIsYUFBMEIsT0FBZTtBQUNqRyxVQUFNLFdBQVc7QUFDZCxTQUFLLFNBQVM7QUFDZCxTQUFLLFdBQVc7QUFDbkIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxTQUFTLENBQUM7QUFBQSxFQUNqQjtBQUFBLEVBRUEsU0FBUztBQW5CVjtBQXFCRSxTQUFLLE1BQU0sTUFBTSxRQUFRLEtBQUssS0FBSyxNQUFNLFNBQVMsR0FBRyxJQUMvQyxLQUFLLFNBQVMsS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLE9BQUssTUFBTSxDQUFDO0FBQUE7QUFBQSxNQUcvRixLQUFLLE1BQU0sTUFBTSxRQUFRLElBQ3pCLEtBQUssV0FBUyxVQUFLLE1BQU0sVUFBVSxLQUFLLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLE1BQU0sU0FBUyxNQUFyRSxtQkFBd0UsSUFBSSxPQUFLLE1BQU0sT0FBTSxDQUFDLGlCQUFpQjtBQUFBO0FBQUEsUUFHN0gsS0FBSyxNQUFNLFNB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QUFVLE1BQU0sSUFBSTtBQUNsQyxnQkFBTSxPQUFPLE1BQU0sQ0FBQztBQUNwQixjQUFJLFNBQW1CLENBQUM7QUFFeEIsZUFBSyxNQUFNLFFBQVEsS0FBSyxLQUFLLFNBQVMsR0FBRyxJQUN6QyxTQUFTLEtBQUssVUFBVSxLQUFLLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLE9BQUssTUFBTSxDQUFDO0FBQUE7QUFBQSxZQUc5RSxLQUFLLE1BQU0sUUFBUSxJQUNuQixXQUFTLFVBQUssVUFBVSxLQUFLLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxNQUFNLFNBQVMsTUFBekQsbUJBQTRELElBQUksT0FBSyxNQUFNLE9BQU0sQ0FBQyxpQkFBaUIsSUFFNUcsU0FBUyxDQUFDLGlCQUFpQjtBQUFBO0FBRTNCLGNBQUcsT0FBTyxDQUFDLE1BQU07QUFBbUIsa0JBQU0sSUFBSSxNQUFNLG1EQUFtRDtBQUV2RyxnQkFBTSxXQUFXO0FBQUEsRUFBa0IsT0FBTyxTQUFTO0FBQUE7QUFDbkQsaUJBQU8saUJBQWlCLFFBQVE7QUFDaEMsY0FBSSx3QkFBTyxpQ0FBaUM7QUFBQSxRQUM3QyxTQUNPLE9BQVA7QUFDQyxjQUFJLHdCQUFPLEtBQUs7QUFBQSxRQUNqQjtBQUFBLE1BQ0Q7QUFBQSxJQUNELENBQUM7QUFFRCxTQUFLLGNBQWMsSUFBSSxZQUFZLEtBQUssS0FBSyxJQUFJLENBQUM7QUFBQSxFQUNuRDtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ3BCLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGlCQUFpQixNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDekU7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixVQUFNLEtBQUssU0FBUyxLQUFLLFFBQVE7QUFBQSxFQUNsQztBQUNEOyIsCiAgIm5hbWVzIjogWyJScGdDbG9jayIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIlJwZ0Nsb2NrIl0KfQo=

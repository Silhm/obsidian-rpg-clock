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
var import_obsidian4 = require("obsidian");

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
      const [clockName, clockValue, clockColor] = clock.split(":");
      const [filled, total] = clockValue ? clockValue.split("/") : clockName.split("/");
      this.createClock(clockValue ? clockName : "", parseInt(filled, 10), parseInt(total, 10), clockColor);
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
  createClock(clockName, filled, totalCount, color) {
    let { clockColor } = this.settings;
    if (color) {
      clockColor = color;
    }
    console.log("Create clock: ", clockName, `${filled}/${totalCount}`);
    this.containerEl.innerHTML += `<div class="clock" n="${totalCount}" style="--n: ${totalCount}; --clock-color:${clockColor}">
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
};

// src/settings.ts
var import_obsidian2 = require("obsidian");
var DefaultSettings = {
  clockSize: 150,
  clockColor: "#ff5757"
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
    new import_obsidian2.Setting(containerEl).setName("Clock Color").setDesc("Which color should be the clock").addColorPicker((colorPicker) => {
      colorPicker.setValue(settings.clockColor).onChange(async (value) => {
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

// src/commandInput.ts
var import_obsidian3 = require("obsidian");
var CommandInput = class extends import_obsidian3.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h1", { text: "Clock name" });
    new import_obsidian3.Setting(contentEl).setName("name").addText((text) => {
      text.onChange((value) => {
        this.result = value;
      });
    });
    new import_obsidian3.Setting(contentEl).addButton(
      (btn) => btn.setButtonText("enter").setCta().onClick(() => {
        this.close();
        this.onSubmit(this.result);
      })
    );
  }
  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
};

// src/main.ts
var urlRegex = /\/([^\/]+)\/?$/;
var RpgClock = class extends import_obsidian4.Plugin {
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
      id: "insert-clock",
      name: "Insert Clock",
      editorCallback: (editor) => {
        new CommandInput(this.app, (result) => {
          console.log("aniuest");
          try {
            const codeBlock = `\`\`\`clock
${result}:0/4
\`\`\`
`;
            const cursor = editor.getCursor();
            editor.transaction({
              changes: [{ from: cursor, text: codeBlock }]
            });
            editor.setCursor({
              line: cursor.line + codeBlock.split("\n").length,
              ch: 0
            });
            new import_obsidian4.Notice(`Added ${result}`);
          } catch (error) {
            new import_obsidian4.Notice(error);
          }
        }).open();
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

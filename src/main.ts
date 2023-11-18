import { Editor, MarkdownPostProcessorContext, Notice, Plugin } from 'obsidian'
import { Clock } from 'src/clock';
import { RpgClockSettings, DefaultSettings, SettingsTab } from 'src/settings';
import { CommandInput } from './commandInput';

export const urlRegex = /\/([^\/]+)\/?$/

export default class RpgClock extends Plugin {
	settings: RpgClockSettings;
	clocks?: Clock[];

	async onload() {
		this.clocks = [];
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			'clock',
			async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
				ctx.addChild(new Clock(this, this.settings, el, source.trim()));
			}
		)

		
		this.addCommand({
			id: 'insert-clock',
			name: 'Insert Clock',
			editorCallback: (editor: Editor) => {
				new CommandInput(this.app, (result) => {
					console.log("aniuest");
					try {
						const codeBlock = `\`\`\`clock\n${result}:0/4\n\`\`\`\n`;
						const cursor = editor.getCursor();
						editor.transaction({
							changes: [{ from: cursor, text: codeBlock }]
						})
						editor.setCursor({
							line: cursor.line + codeBlock.split('\n').length,
							ch: 0
						})
						new Notice(`Added ${result}`);
					} 
					catch (error) {
						new Notice(error);
					}
				})
				.open();
			}
	
		})

		this.addSettingTab(new SettingsTab(this.app, this));
	}
	
	async loadSettings() {
		this.settings = Object.assign({}, DefaultSettings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
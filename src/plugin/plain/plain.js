import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import PlainEditing from './plainedition';
import PlainUI from './plainui';

export default class Plain extends Plugin {
	static get requires() {
		return [ PlainUI, PlainEditing ];
	}

	static get pluginName() {
		return 'Plain';
	}
}
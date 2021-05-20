import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import plainIcon from '@ckeditor/ckeditor5-code-block/theme/icons/my_block.svg';
// import '@ckeditor/ckeditor5-code-block/theme/codeblock.css';

export default class PlainUI extends Plugin {
	init() {

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'plain', locale => {
				const command = editor.commands.get( 'plain' );
				const buttonView = new ButtonView( locale );

				buttonView.set( {
						label: t( '텍스트 박스' ),
						icon: plainIcon,
						tooltip: true,
						isToggleable: true
				} );

				// Bind the state of the button to the command.
				buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

				// Execute the command when the button is clicked (executed).
				this.listenTo( buttonView, 'execute', () => editor.execute( 'plain' ) );

				return buttonView;
		} );
	}
}

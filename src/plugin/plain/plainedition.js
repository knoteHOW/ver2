import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import priorities from '@ckeditor/ckeditor5-utils/src/priorities';

import PlainCommand from './plaincommand';

export default class PlainEditing extends Plugin {
	static get pluginName() {
		return 'PlainEditing';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		editor.commands.add( 'plain', new PlainCommand( editor ) );

		schema.register( 'plain', {
			allowIn: '$root',
			allowContentOf: '$root',
			isBlock: true
		});
		schema.addChildCheck( ( ctx, childDef ) => {
			if ( ctx.endsWith( 'plain' ) && childDef.name == 'plain' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'blockQuote' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'table' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'codeBlock' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'horizontalLine' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'heading1' ) {
				return false;
			}
			else if ( ctx.endsWith( 'plain' ) && childDef.name == 'heading2' ) {
				return false;
			}
		} );

		editor.conversion.elementToElement( { model: 'plain', view: 'plain' } );

		editor.model.document.registerPostFixer( writer => {
			const changes = editor.model.document.differ.getChanges();

			for ( const entry of changes ) {
				if ( entry.type == 'insert' ) {
					const element = entry.position.nodeAfter;

					if ( !element ) {
						continue;
					}

					if ( element.is( 'element', 'plain' ) && element.isEmpty ) {
						writer.remove( element );

						return true;
					} else if ( element.is( 'element', 'plain' ) && !schema.checkChild( entry.position, element ) ) {
						writer.unwrap( element );

						return true;
					} else if ( element.is( 'element' ) ) {
						const range = writer.createRangeIn( element );

						for ( const child of range.getItems() ) {
							if (
								child.is( 'element', 'plain' ) &&
								!schema.checkChild( writer.createPositionBefore( child ), child )
							) {
								writer.unwrap( child );

								return true;
							}
						}
					}
				} else if ( entry.type == 'remove' ) {
					const parent = entry.position.parent;

					if ( parent.is( 'element', 'plain' ) && parent.isEmpty ) {
						writer.remove( parent );

						return true;
					}
				}
			}

			return false;
		} );

		

		const viewDocument = this.editor.editing.view.document;
		const selection = editor.model.document.selection;
		const plainCommand = editor.commands.get( 'plain' );

		this.listenTo( viewDocument, 'enter', ( evt, data ) => {
			if ( !selection.isCollapsed || !plainCommand.value ) {
				return;
			}

			const positionParent = selection.getLastPosition().parent;

			if ( positionParent.isEmpty ) {
				editor.execute( 'plain' );
				editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
		}, { priority: priorities.normal - 10 } );

		this.listenTo( viewDocument, 'delete', ( evt, data ) => {
			if ( data.direction != 'backward' || !selection.isCollapsed || !plainCommand.value ) {
				return;
			}

			const positionParent = selection.getLastPosition().parent;

			if ( positionParent.isEmpty && !positionParent.previousSibling ) {
				editor.execute( 'plain' );
				editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
		}, { priority: priorities.high + 5 } );
	}
}

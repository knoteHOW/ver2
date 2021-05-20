import Command from '@ckeditor/ckeditor5-core/src/command';

import first from '@ckeditor/ckeditor5-utils/src/first';

export default class PlainCommand extends Command {
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}

	execute( options = {} ) {
		const model = this.editor.model;
		const schema = model.schema;
		const selection = model.document.selection;

		const blocks = Array.from( selection.getSelectedBlocks() );

		const value = ( options.forceValue === undefined ) ? !this.value : options.forceValue;

		model.change( writer => {
			if ( !value ) {
				this._removePlain( writer, blocks.filter( findPlain ) );
			} else {
				const blocksToPlain = blocks.filter( block => {
					// Already quoted blocks needs to be considered while quoting too
					// in order to reuse their <bQ> elements.
					return findPlain( block ) || checkCanBePlain( schema, block );
				} );

				this._applyPlain( writer, blocksToPlain );
			}
		} );
	}

	_getValue() {
		const selection = this.editor.model.document.selection;

		const firstBlock = first( selection.getSelectedBlocks() );

		// In the current implementation, the block quote must be an immediate parent of a block element.
		return !!( firstBlock && findPlain( firstBlock ) );
	}

	_checkEnabled() {
		if ( this.value ) {
			return true;
		}

		const selection = this.editor.model.document.selection;
		const schema = this.editor.model.schema;

		const firstBlock = first( selection.getSelectedBlocks() );

		if ( !firstBlock ) {
			return false;
		}

		return checkCanBePlain( schema, firstBlock );
	}

	_removePlain( writer, blocks ) {
		// Unquote all groups of block. Iterate in the reverse order to not break following ranges.
		getRangesOfBlockGroups( writer, blocks ).reverse().forEach( groupRange => {
			if ( groupRange.start.isAtStart && groupRange.end.isAtEnd ) {
				writer.unwrap( groupRange.start.parent );

				return;
			}

			// The group of blocks are at the beginning of an <bQ> so let's move them left (out of the <bQ>).
			if ( groupRange.start.isAtStart ) {
				const positionBefore = writer.createPositionBefore( groupRange.start.parent );

				writer.move( groupRange, positionBefore );

				return;
			}

			// The blocks are in the middle of an <bQ> so we need to split the <bQ> after the last block
			// so we move the items there.
			if ( !groupRange.end.isAtEnd ) {
				writer.split( groupRange.end );
			}

			// Now we are sure that groupRange.end.isAtEnd is true, so let's move the blocks right.

			const positionAfter = writer.createPositionAfter( groupRange.end.parent );

			writer.move( groupRange, positionAfter );
		} );
	}

	_applyPlain( writer, blocks ) {
		const plainToMerge = [];

		// Quote all groups of block. Iterate in the reverse order to not break following ranges.
		getRangesOfBlockGroups( writer, blocks ).reverse().forEach( groupRange => {
			let plain = findPlain( groupRange.start );

			if ( !plain ) {
				plain = writer.createElement( 'plain' );

				writer.wrap( groupRange, plain );
			}

			plainToMerge.push( plain );
		} );

		// Merge subsequent <bQ> elements. Reverse the order again because this time we want to go through
		// the <bQ> elements in the source order (due to how merge works – it moves the right element's content
		// to the first element and removes the right one. Since we may need to merge a couple of subsequent `<bQ>` elements
		// we want to keep the reference to the first (furthest left) one.
		plainToMerge.reverse().reduce( ( currentPlain, nextPlain ) => {
			if ( currentPlain.nextSibling == nextPlain ) {
				writer.merge( writer.createPositionAfter( currentPlain ) );

				return currentPlain;
			}

			return nextPlain;
		} );
	}
}

function findPlain( elementOrPosition ) {
	return elementOrPosition.parent.name == 'plain' ? elementOrPosition.parent : null;
}

// Returns a minimal array of ranges containing groups of subsequent blocks.
//
// content:         abcdefgh
// blocks:          [ a, b, d, f, g, h ]
// output ranges:   [ab]c[d]e[fgh]
//
// @param {Array.<module:engine/model/element~Element>} blocks
// @returns {Array.<module:engine/model/range~Range>}
function getRangesOfBlockGroups( writer, blocks ) {
	let startPosition;
	let i = 0;
	const ranges = [];

	while ( i < blocks.length ) {
		const block = blocks[ i ];
		const nextBlock = blocks[ i + 1 ];

		if ( !startPosition ) {
			startPosition = writer.createPositionBefore( block );
		}

		if ( !nextBlock || block.nextSibling != nextBlock ) {
			ranges.push( writer.createRange( startPosition, writer.createPositionAfter( block ) ) );
			startPosition = null;
		}

		i++;
	}

	return ranges;
}

// Checks whether <bQ> can wrap the block.
function checkCanBePlain( schema, block ) {
	// TMP will be replaced with schema.checkWrap().
	const isPlainAllowed = schema.checkChild( block.parent, 'plain' );
	const isBlockAllowedInPlain = schema.checkChild( [ '$root', 'plain' ], block );

	return isPlainAllowed && isBlockAllowedInPlain;
}

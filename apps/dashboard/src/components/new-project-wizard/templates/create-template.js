/**
 * External dependencies
 */
import { each, startsWith } from 'lodash';
import { v4 as uuid } from 'uuid';

const addBlockMetadata = ( blocks ) => {
	return blocks.map( ( block ) => {
		if ( startsWith( block.name, 'crowdsignal-forms/' ) ) {
			block.attributes.clientId = uuid();
		}

		if ( startsWith( block.name, 'crowdsignal-forms/dropdown-input' ) ) {
			each( block.attributes.options, ( o ) => {
				o.clientId = uuid();
			} );
		}

		return {
			clientId: uuid(),
			isValid: true,
			...block,
			innerBlocks: addBlockMetadata( block.innerBlocks ),
		};
	} );
};

export const createTemplate = ( name, description, content, preview ) => ( {
	name,
	description,
	project: {
		draftContent: {
			pages: content.map( addBlockMetadata ),
		},
	},
	preview,
} );

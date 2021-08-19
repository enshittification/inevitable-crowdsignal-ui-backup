/**
 * External dependencies
 */
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { includes, round } from 'lodash';

/**
 * Internal dependencies
 */
import { useClientId } from '@crowdsignal/hooks';
import { useBorderStyles, useColorStyles } from '@crowdsignal/styles';
import Sidebar from './sidebar';

/**
 * Style dependencies
 */
import { EditorWrapper, PollWrapper } from './styles/poll';

const ALLOWED_BLOCKS = [ 'crowdsignal-forms/poll-answer', 'core/paragraph' ];

const PollBlock = ( props ) => {
	const { attributes, className, isSelected, setAttributes } = props;

	useClientId( props );

	const handleChangeQuestion = ( question ) => setAttributes( { question } );

	const handleResize = ( event, handle, element ) => {
		if ( ! includes( [ 'right', 'left' ], handle ) ) {
			return;
		}

		setAttributes( {
			width: round(
				( element.offsetWidth /
					element.parentNode.parentNode.offsetWidth ) *
					100
			),
		} );
	};

	const isResizable = isSelected && attributes.align !== 'full';
	const blockWidth =
		attributes.align !== 'full' ? `${ attributes.width }%` : 'auto';

	return (
		<EditorWrapper>
			<Sidebar { ...props } />

			<ResizableBox
				size={ { height: 'auto', width: blockWidth } }
				minWidth="25%"
				maxWidth="100%"
				enable={ { left: true, right: true } }
				onResizeStop={ handleResize }
				showHandle={ isResizable }
				resizeRatio={ 2 }
			>
				<PollWrapper
					className={ className }
					style={ {
						...useColorStyles( attributes ),
						...useBorderStyles( attributes ),
					} }
				>
					<RichText
						tagName="h3"
						placeholder={ __( 'Enter your question', 'blocks' ) }
						onChange={ handleChangeQuestion( 'question' ) }
					/>

					<InnerBlocks
						template={ [
							[ 'crowdsignal-forms/poll-answer', {} ],
							[ 'crowdsignal-forms/poll-answer', {} ],
							[ 'crowdsignal-forms/poll-answer', {} ],
						] }
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS }
						orientation="vertical"
						__experimentalMoverDirection="vertical"
					/>
				</PollWrapper>
			</ResizableBox>
		</EditorWrapper>
	);
};

export default PollBlock;

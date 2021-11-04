/**
 * External dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import { Button, FormCheckbox } from '@crowdsignal/blocks';

const ButtonContent = styled.div`
	align-items: center;
	cursor: text;
	display: flex;

	.rich-text {
		flex: 1;
		text-align: left;
	}
`;

const EditButtonAnswer = ( {
	attributes,
	className,
	multipleChoice,
	onChange,
	onReplace,
	onSplit,
} ) => {
	const width = attributes.width ? `${ attributes.width }%` : null;

	return (
		<Button
			attributes={ attributes }
			as={ 'div' }
			className={ className }
			style={ {
				width,
			} }
		>
			<ButtonContent>
				{ multipleChoice && <FormCheckbox type="checkbox" /> }

				<RichText
					placeholder={ __( 'Enter an answer', 'blocks-editor' ) }
					onChange={ onChange }
					onReplace={ onReplace }
					onSplit={ onSplit }
					value={ attributes.label }
					multiline={ false }
					preserveWhiteSpace={ false }
					allowedFormats={ [] }
					withoutInteractiveFormatting
				/>
			</ButtonContent>
		</Button>
	);
};

export default EditButtonAnswer;
/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { map } from 'lodash';
import { useRef } from '@wordpress/element';
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import { withClassName } from '../../util';
import Button from '../button';

const FileInputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	input[type='file'] {
		display: none;
	}
`;

const FileInputButton = styled( Button )`
	margin-top: 16px;
`;

const FileInputMessage = withClassName(
	styled.span`
		padding: 10px 16px;
		border: 1px solid var( --color-neutral-40 );
		border-radius: 2px;
		font-weight: 400;
		font-size: 13px;
		line-height: 150%;
		color: var( --color-neutral-40 );
	`,
	'crowdsignal-forms-file-input__message'
);

const FileInputFile = styled( FileInputMessage )`
	display: flex;
	justify-content: space-between;
	color: var( --color-text );
`;

const FileInputFileRemove = styled.a`
	display: block;
`;

const FormFileInput = ( { attributes, files, onChange } ) => {
	const inputFile = useRef( null );

	const handleFileInputClick = ( event ) => {
		event.preventDefault();
		inputFile.current.click();
	};

	const handleFileRemove = () => {
		inputFile.current.value = '';
		// This will remove all selected files.
		// It doesn't seem easy to manage files individually on an input file field.
		// Since we only support single files ATM, this is not a problem.
		// We'll need to figure out how to handle this to add support for multiple files
		onChange( null );
	};

	let outputMessage = attributes.message;

	if ( ! attributes.message ) {
		outputMessage = sprintf(
			// translators: %s: allowed file types e.g: pdf, jpg, png
			__( 'Supported file formats: %s - max. size 5 mb', 'blocks' ),
			attributes.allowedTypes.join( ', ' )
		);
	}

	return (
		<FileInputWrapper>
			<input
				onChange={ ( event ) => onChange( event.target.files ) }
				ref={ inputFile }
				type="file"
			/>
			<FileInputButton onClick={ handleFileInputClick } outline>
				{ attributes.buttonLabel }
			</FileInputButton>
			{ files.length > 0 &&
				map( Array.from( files ), ( file, index ) => (
					<FileInputFile key={ index }>
						<span>{ file.name }</span>
						<FileInputFileRemove onClick={ handleFileRemove }>
							{ __( 'remove', 'blocks' ) }
						</FileInputFileRemove>
					</FileInputFile>
				) ) }
			{ ! files.length && (
				<FileInputMessage>{ outputMessage }</FileInputMessage>
			) }
		</FileInputWrapper>
	);
};

FormFileInput.Wrapper = FileInputWrapper;
FormFileInput.Button = FileInputButton;
FormFileInput.Message = FileInputMessage;

export default FormFileInput;

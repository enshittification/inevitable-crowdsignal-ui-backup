/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import {
	ModalDialog,
	ModalNavigation,
	ModalHeader,
	ModalHeaderNote,
	ModalWrapper,
	ModalCloseButton,
} from '../modal';
import { themes } from '../../util/theme/themes';
import ThemePreview from './theme-preview/theme-preview';

/**
 * Style dependencies
 */
import { ThemesTemplateGrid } from './styles';

const ThemesModal = ( { activeTheme, onSelect, onClose } ) => {
	return (
		<ModalWrapper>
			<ModalDialog id="crowdsignal-themes-modal">
				<ModalNavigation>
					<ModalCloseButton onClick={ onClose } />
				</ModalNavigation>
				<ModalHeader>
					{ __( 'Pick a design theme', 'dashboard' ) }
				</ModalHeader>
				<ModalHeaderNote>
					{ __(
						'Choose your favorite theme and customize it in the editor. And no worries, you can change your theme later.',
						'dashboard'
					) }
				</ModalHeaderNote>
				<ThemesTemplateGrid>
					{ map( themes, ( theme ) => (
						<ThemePreview
							key={ theme.name }
							activeTheme={ activeTheme }
							theme={ theme }
							onSelect={ onSelect }
						/>
					) ) }
				</ThemesTemplateGrid>
			</ModalDialog>
		</ModalWrapper>
	);
};

export default ThemesModal;

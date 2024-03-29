/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	EditablePageHeader,
	TabNavigation,
	PopoverNotice,
} from '@crowdsignal/components';
import { STORE_NAME } from '../../data';

/**
 * Style dependencies
 */
import './style.scss';

const Tab = {
	EDITOR: 'editor',
	RESULTS: 'results',
};

const ProjectNavigation = ( {
	activeTab,
	disableTitleEditor,
	onChangeTitle,
	projectId,
} ) => {
	const [ displayNotice, setDisplayNotice ] = useState( false );
	const noteRef = useRef();
	const [ editorTitle, projectTitle ] = useSelect(
		( select ) => [
			select( STORE_NAME ).getEditorTitle(),
			select( STORE_NAME ).getProjectTitle( projectId ),
		],
		[ projectId ]
	);

	return (
		<div className="project-navigation">
			<EditablePageHeader
				onChange={ onChangeTitle }
				text={
					editorTitle ||
					projectTitle ||
					__( 'Untitled Project', 'dashboard' )
				}
				disabled={ disableTitleEditor }
			/>

			<TabNavigation>
				<TabNavigation.Tab
					isSelected={ activeTab === Tab.EDITOR }
					href={ `/project/${ projectId }` }
					isDisabled={ ! projectId }
				>
					{ __( 'Editor', 'dashboard' ) }
				</TabNavigation.Tab>

				<TabNavigation.Tab
					ref={ noteRef }
					onMouseEnter={ () => setDisplayNotice( true ) }
					onMouseLeave={ () => setDisplayNotice( false ) }
					isSelected={ activeTab === Tab.RESULTS }
					isDisabled={ ! projectId }
					href={ `/project/${ projectId }/results` }
				>
					{ __( 'Results', 'dashboard' ) }
				</TabNavigation.Tab>
			</TabNavigation>
			<PopoverNotice
				context={ noteRef }
				onClose={ () => setDisplayNotice( false ) }
				isVisible={ displayNotice && ! projectId }
				position={ 'bottom left' }
			>
				{ __(
					'Please save draft or publish project to view results',
					'dashboard'
				) }
			</PopoverNotice>
		</div>
	);
};

ProjectNavigation.Tab = Tab;

export default ProjectNavigation;

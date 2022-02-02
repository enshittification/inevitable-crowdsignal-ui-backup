/**
 * External dependencies
 */
import {
	Button,
	Dropdown,
	ExternalLink,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line import/named
import { DocumentSection } from 'isolated-block-editor';

/**
 * Internal dependencies
 */
import { FormFieldset, FormRadio } from '@crowdsignal/components';
import { STORE_NAME } from '../../data';
import { timestampToDate } from '../../util/date';
import { isPublic, getLastUpdatedDate } from '../../util/project';

const DocumentSettings = ( { project } ) => {
	const { openGeneralSidebar } = useDispatch( 'isolated/editor' );
	const { saveAndUpdateProject, saveEditorChanges } = useDispatch(
		STORE_NAME
	);

	useEffect( () => {
		openGeneralSidebar( 'edit-post/document' );
	}, [] );

	const updateProjectVisibility = ( event ) => {
		if ( event.target.value === 'private' ) {
			saveAndUpdateProject( project.id, { public: false } );
			return;
		}

		// We need to serialize and re-parse blocks before making the request
		// to keep originalContent prop up to date.
		saveEditorChanges( { public: true } );
	};

	const visibility = isPublic( project )
		? __( 'Public', 'dashboard' )
		: __( 'Private', 'dashboard' );

	const currentTimestamp = parseInt( new Date().getTime() / 1000 );

	return (
		<DocumentSection>
			<PanelBody title={ __( 'Status & Visibility', 'dashboard' ) }>
				<PanelRow className="project-visibility">
					<span>{ __( 'Visibility', 'dashboard' ) }</span>
					<Dropdown
						popoverProps={ {
							className: 'editor__project-visibility-popover',
						} }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								aria-expanded={ isOpen }
								onClick={ onToggle }
								variant="tertiary"
							>
								{ visibility }
							</Button>
						) }
						renderContent={ () => (
							<>
								<FormFieldset
									name="project-visibility"
									inputComponent={ FormRadio }
									label={ __( 'Public', 'dashboard' ) }
									explanation={ __(
										'Visible to everyone',
										'dashboard'
									) }
									onChange={ updateProjectVisibility }
									value="public"
									defaultChecked={ isPublic( project ) }
								/>
								<FormFieldset
									name="project-visibility"
									inputComponent={ FormRadio }
									label={ __( 'Private', 'dashboard' ) }
									explanation={ __(
										'Visible only to you',
										'dashboard'
									) }
									onChange={ updateProjectVisibility }
									value="private"
									defaultChecked={ ! isPublic( project ) }
								/>
							</>
						) }
					/>
				</PanelRow>
				<PanelRow className="project-created-date">
					<span>{ __( 'Created', 'dashboard' ) }</span>
					<span>
						{ timestampToDate(
							project?.created || currentTimestamp
						) }
					</span>
				</PanelRow>
				<PanelRow className="project-updated-date">
					<span>{ __( 'Updated', 'dashboard' ) }</span>
					<span>
						{ timestampToDate(
							getLastUpdatedDate( project ) || currentTimestamp
						) }
					</span>
				</PanelRow>
			</PanelBody>
			{ project && (
				<PanelBody title={ __( 'Permalink', 'dashboard' ) }>
					<PanelRow>
						<span>{ __( 'View Project', 'dashboard' ) }</span>
					</PanelRow>
					<ExternalLink
						href={ project.permalink }
						title={ project.permalink }
					>
						<span className="components-external-link__text">
							{ project.permalink }
						</span>
					</ExternalLink>
				</PanelBody>
			) }
		</DocumentSection>
	);
};

export default DocumentSettings;

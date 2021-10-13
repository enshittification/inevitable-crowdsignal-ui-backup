/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ToolbarSlot } from 'isolated-block-editor'; // eslint-disable-line import/named

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../data';
import { useDispatch, useSelect } from '@wordpress/data';

const Toolbar = ( { projectId } ) => {
	const { saveAndUpdateProject } = useDispatch( STORE_NAME );

	const [ project, isSaving ] = useSelect( ( select ) => {
		return [
			select( STORE_NAME ).getProject( projectId ),
			select( STORE_NAME ).isProjectSaving(),
		];
	} );

	const syncProject = () => {
		saveAndUpdateProject( projectId, {
			...project,
		} );
	};

	const publishProject = () => {
		const payload = { publish: true };
		saveAndUpdateProject( projectId, {
			...project,
			content: {
				...project.content,
				published: {
					...project.content.draft,
				},
			},
			...payload,
		} );
	};

	const shareHandler = () => {
		if ( project.permalink ) {
			window.navigator.clipboard.writeText( project.permalink ).then(
				() => {
					// eslint-disable-next-line
					window.alert(
						`Project's public URL ( ${ project.permalink } ) has been copied to clipboard`
					);
				},
				( err ) => {
					// eslint-disable-next-line
					window.alert(
						'Share URL could not be copied to clipboard'
					);
					// eslint-disable-next-line
					console.error( err );
				}
			);
		} else {
			// eslint-disable-next-line
			window.alert(
				'Share URL will is only available for published projects'
			);
		}
		return false;
	};

	const isPublished = project && project.content && project.content.published;

	return (
		<ToolbarSlot className="block-editor__crowdsignal-toolbar">
			<Button
				className="is-crowdsignal"
				href={ `/project/${ projectId }/preview` }
				target="_blank"
				disabled={ ! projectId }
			>
				{ __( 'Preview', 'block-editor' ) }
			</Button>
			<Button
				className="is-crowdsignal"
				variant="secondary"
				onClick={ shareHandler }
				disabled={ ! isPublished }
			>
				{ __( 'Share', 'block-editor' ) }
			</Button>
			<Button
				className="is-crowdsignal"
				variant="secondary"
				onClick={ syncProject }
				disabled={ isSaving }
			>
				{ __( 'Save draft', 'dashboard' ) }
			</Button>
			<Button
				className="is-crowdsignal"
				variant="primary"
				onClick={ publishProject }
				disabled={ isSaving }
			>
				{ __( 'Publish', 'dashboard' ) }
			</Button>
		</ToolbarSlot>
	);
};

export default Toolbar;

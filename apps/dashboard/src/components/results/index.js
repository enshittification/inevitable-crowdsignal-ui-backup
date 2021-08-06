/**
 * Internal dependencies
 */
import ProjectNavigation from 'components/project-navigation';

const Results = ( { projectId } ) => {
	return (
		<div className="results">
			<ProjectNavigation
				activeTab={ ProjectNavigation.Tab.RESULTS }
				projectId={ projectId }
			/>
			Results
		</div>
	);
};

export default Results;

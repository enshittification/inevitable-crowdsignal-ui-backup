/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ButtonAnswer from '../components/button-answer';
import { DragHandle } from '@crowdsignal/icons';

const RankingAnswer = ( { attributes, className, draggable } ) => {
	const classes = classnames(
		'crowdsignal-forms-ranking-answer-block',
		className
	);

	if ( ! attributes.label ) {
		return null;
	}

	return (
		<div
			className={ classes }
			ref={ draggable.innerRef }
			{ ...draggable.draggableProps }
		>
			<span
				{ ...draggable.dragHandleProps }
				style={ { display: 'flex' } }
			>
				<DragHandle />
			</span>
			<ButtonAnswer
				attributes={ attributes }
				className={ { 'is-selected': draggable.isDragging } }
				isMultiSelect={ false }
			>
				{ attributes.label }
			</ButtonAnswer>
		</div>
	);
};

export default RankingAnswer;

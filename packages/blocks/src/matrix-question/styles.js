/**
 * External dependencies
 */
import styled from '@emotion/styled';

export const MatrixTable = styled.div`
	border: 0;
	display: grid;
`;

export const MatrixCell = styled.div`
	align-items: center;
	border: 1px solid;
	border-color: var(
		--crowdsignal-forms-question-border-color,
		var( --wp--preset--color--foreground, #ccc )
	);
	border-top-width: 0;
	border-left-width: 0;
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	min-width: 0;
	padding: 16px;
	text-align: center;

	&.crowdsignal-forms-matrix-question-block__column-label {
		border-top-width: 1px;
	}

	&.crowdsignal-forms-matrix-question-block__row-label {
		border-left-width: 1px;
	}
`;

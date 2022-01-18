/**
 * External dependencies
 */
import styled from '@emotion/styled';

export const PageNavigationWrapper = styled.div`
	background-color: var( --color-surface );
	border-right: 1px solid var( --color-border );
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol';
	position: absolute;
	bottom: 0;
	left: 0;
	top: 65px;
	width: 180px;
`;

export const PageNavigationHeader = styled.div`
	align-items: center;
	border-bottom: 1px solid var( --color-border );
	box-sizing: border-box;
	color: var( --color-text-subtle );
	display: flex;
	font-size: 11px;
	padding: 0 16px;
	height: 61px;
	text-transform: uppercase;
	width: 100%;

	svg {
		margin-right: 16px;
	}
`;

export const PageNavigationAddButton = styled.button`
	background-color: transparent;
	box-sizing: border-box;
	border: 1px solid var( --color-border );
	border-radius: 2px;
	color: var( --color-text );
	height: 40px;
	margin: 16px 16px 0 63px;
	width: 100px;
`;

/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const pageStyles = css`
	@font-face {
		font-family: Recoleta;
		font-weight: normal;
		src: url( 'https://crowdsignal.com/wp-content/themes/a8c/crowd-signal/assets/fonts/recoleta-regular-webfont.woff' );
	}

	@font-face {
		font-family: Recoleta;
		font-weight: bold;
		src: url( 'https://crowdsignal.com/wp-content/themes/a8c/crowd-signal/assets/fonts/recoleta-bold-webfont.woff' );
	}

	html {
		display: table;
		margin: 0;
		height: 100%;
		padding: 0;
		width: 100%;
	}

	body {
		display: table-cell;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	#crowdsignal-dashboard {
		display: flex;
		flex-direction: column;
		height: 100%;
		height: 100vh;
		width: 100%;
	}
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

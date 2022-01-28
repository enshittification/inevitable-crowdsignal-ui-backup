/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';
import { map, filter, slice, tap } from 'lodash';

/**
 * Internal dependencies
 */
import {
	CURRENT_PAGE_INDEX_SET,
	EDITOR_INIT,
	EDITOR_SAVE,
	EDITOR_SAVE_ERROR,
	EDITOR_SAVE_SUCCESS,
	PAGE_DELETE,
	PAGE_INSERT,
	PAGE_UPDATE,
	PAGE_ORDER_UPDATE,
	TITLE_UPDATE,
} from './action-types';

/**
 * Tracks which project properties have changed since the last save.
 *
 * @param  {Object} state  Editor state.
 * @param  {Object} action Action object.
 * @return {Object}        Updated properties.
 */
const changes = ( state = {}, action ) => {
	if ( action.type === EDITOR_INIT || action.type === EDITOR_SAVE ) {
		return {};
	}

	if ( action.type === EDITOR_SAVE_ERROR ) {
		return {
			...state,
			...action.changes,
		};
	}

	if (
		action.type === PAGE_INSERT ||
		action.type === PAGE_DELETE ||
		action.type === PAGE_UPDATE ||
		action.type === PAGE_ORDER_UPDATE
	) {
		return {
			...state,
			content: true,
		};
	}

	if ( action.type === TITLE_UPDATE ) {
		return {
			...state,
			title: true,
		};
	}

	return false;
};

/**
 * Currently edited page index.
 *
 * @param  {number} state  App state.
 * @param  {Object} action Action object.
 * @return {number}        Page index.
 */
const currentPage = ( state = 0, action ) => {
	if ( action.type === CURRENT_PAGE_INDEX_SET ) {
		return action.pageIndex;
	}

	if (
		action.type === PAGE_DELETE &&
		action.pageIndex === state &&
		state > 0
	) {
		return state - 1;
	}

	return state;
};

/**
 * True when editor is saving.
 *
 * @param  {boolean} state  App state.
 * @param  {Object}  action Action object.
 * @return {boolean}        Saving flag.
 */
const isSaving = ( state = false, action ) => {
	if ( action.type === EDITOR_SAVE ) {
		return true;
	}

	if (
		action.type === EDITOR_SAVE_SUCCESS ||
		action.type === EDITOR_SAVE_ERROR
	) {
		return false;
	}

	return state;
};

/**
 * Project's pages.
 *
 * @param  {Array}  state  App state.
 * @param  {Object} action Action object.
 * @return {Array}         Pages.
 */
const pages = ( state = [], action ) => {
	if ( action.type === EDITOR_INIT ) {
		return action.pages;
	}

	if ( action.type === PAGE_INSERT ) {
		return [
			...slice( state, 0, action.pageIndex ),
			action.pageContent,
			...slice( state, action.pageIndex ),
		];
	}

	if ( action.type === PAGE_DELETE && 1 < state.length ) {
		return filter( state, ( _, index ) => index !== action.pageIndex );
	}

	if ( action.type === PAGE_UPDATE ) {
		return tap(
			[ ...state ],
			( pageArray ) =>
				( pageArray[ action.pageIndex ] = action.pageContent )
		);
	}

	if ( action.type === PAGE_ORDER_UPDATE ) {
		return map( action.order, ( originalIndex ) => state[ originalIndex ] );
	}

	return state;
};

/**
 * Project ID of the project that's currently loaded into the editor.
 * '0' means the a new/non-existing project.
 *
 * @param  {number} state  App state.
 * @param  {Object} action Action object.
 * @return {number}        Project ID.
 */
const projectId = ( state = 0, action ) => {
	if ( action.type === EDITOR_INIT || action.type === EDITOR_SAVE_SUCCESS ) {
		return action.projectId;
	}

	return state;
};

/**
 * Project title.
 *
 * @param  {string} state  App state.
 * @param  {Object} action Action object.
 * @return {string}        Title.
 */
const title = ( state = '', action ) => {
	if ( action.type === EDITOR_INIT || action.type === TITLE_UPDATE ) {
		return action.title;
	}

	return state;
};

export default combineReducers( {
	changes,
	currentPage,
	isSaving,
	pages,
	projectId,
	title,
} );

/**
 * External dependencies
 */
import { Listbox } from '@headlessui/react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { find, isArray } from 'lodash';
import { _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Button } from '../index';
import { withClassName } from '../../util';
import { CheckIcon, ChevronDownIcon } from '@crowdsignal/icons';
import { useMemo } from '@wordpress/element';

const BASE_CSS_CLASS = 'crowdsignal-forms-dropdown-input';

const StyledListBox = withClassName(
	styled.div`
		min-width: ${ ( props ) => props.width ?? '240px' };
		max-width: ${ ( props ) => props.width ?? '400px' };
		display: inline-block;
		position: relative;
	`,
	BASE_CSS_CLASS
);

const StyledListButton = withClassName(
	styled( Button )`
		width: 100%;
		margin-bottom: 0;
		white-space: nowrap;

		&&& {
			button {
				min-height: 40px;
				padding: 4px 36px 4px 12px;
			}
		}

		button {
			position: relative;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: flex-start;

			span {
				overflow: hidden;
				text-overflow: ellipsis;
			}

			svg {
				position: absolute;
				right: 8px;
				margin-top: 2px;
			}
		}
	`,
	`${ BASE_CSS_CLASS }__button`
);

const StyledListOptions = withClassName(
	styled.div`
		width: 100%;
		max-height: 210px;
		overflow: auto;
		position: absolute;
		top: 0;
		z-index: 1000;
		background-color: white;
		border: 1px solid var( --color-neutral-90 );
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	`,
	`${ BASE_CSS_CLASS }__options`
);

const StyledEditorListOptions = styled( StyledListOptions )`
	position: relative;
	margin-top: 8px;
	padding: 8px 0;
`;

const StyledListOption = withClassName(
	styled.div`
		cursor: pointer;
		padding: 4px 12px;
		line-height: 1.3;

		> span {
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&.active {
			position: relative;

			&:before {
				position: absolute;
				top: 0;
				left: 0;
				content: '';
				width: 100%;
				height: 100%;
				background-color: var( --color-neutral-10 );
				opacity: 0.3;
			}
		}

		&.selected {
			background-color: var( --color-neutral-50 );
			color: white;
			display: flex;
			align-items: center;
			justify-content: space-between;

			svg {
				width: 26px;
				path {
					stroke: currentColor;
				}
			}
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	`,
	`${ BASE_CSS_CLASS }__option`
);

const FormDropdownInput = ( {
	buttonLabel,
	maxChoices,
	multipleChoice,
	onChange,
	options,
	value,
	width,
} ) => {
	const _options = useMemo(
		() => [ { clientId: '', label: buttonLabel }, ...options ],
		[]
	);

	const getButtonText = ( selectedValue ) => {
		if ( isArray( selectedValue ) ) {
			if ( selectedValue.length >= 1 ) {
				return sprintf(
					/* translators: %d: number of selected options. */
					_n(
						'%d option selected',
						'%d options selected',
						selectedValue.length,
						'blocks'
					),
					selectedValue.length
				);
			}

			return buttonLabel;
		}

		return find( _options, ( { clientId } ) => clientId === selectedValue )
			.label;
	};

	const isDisabled = ( option ) => {
		if ( ! multipleChoice || value.includes( option.clientId ) ) {
			return false;
		}

		return option.clientId === '' || value.length >= maxChoices;
	};

	return (
		<Listbox
			as={ StyledListBox }
			value={ value }
			onChange={ onChange }
			width={ width }
			multiple={ multipleChoice }
		>
			<Listbox.Button as={ StyledListButton } outline>
				<span title={ getButtonText( value ) }>
					{ getButtonText( value ) }
				</span>
				<ChevronDownIcon />
			</Listbox.Button>
			<Listbox.Options as={ StyledListOptions }>
				{ _options.map( ( option, index ) => (
					<Listbox.Option
						as={ StyledListOption }
						disabled={ isDisabled( option ) }
						key={ index }
						value={ option.clientId }
						title={ option.label }
						className={ ( { active, selected, disabled } ) =>
							classnames( {
								active,
								selected,
								disabled,
								placeholder: option.clientId === '',
							} )
						}
					>
						{ ( { selected } ) => (
							<>
								<span>{ option.label }</span>
								{ selected && <CheckIcon /> }
							</>
						) }
					</Listbox.Option>
				) ) }
			</Listbox.Options>
		</Listbox>
	);
};

FormDropdownInput.Wrapper = StyledListBox;
FormDropdownInput.Button = StyledListButton;
FormDropdownInput.Options = StyledEditorListOptions;
FormDropdownInput.Option = StyledListOption;

export default FormDropdownInput;

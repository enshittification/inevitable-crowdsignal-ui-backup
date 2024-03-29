/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { isEmpty, isNil } from 'lodash';
import { renderToString, useEffect, useState } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Sandbox } from '@crowdsignal/components';
import { fetchEmbedContent } from '@crowdsignal/rest-api';

const getPhotoHTML = ( photo ) => {
	const imageUrl = photo.thumbnail_url || photo.url;
	const photoPreview = (
		<p>
			<img src={ imageUrl } alt={ photo.title } width="100%" />
		</p>
	);
	return renderToString( photoPreview );
};

const CoreEmbed = ( { attributes } ) => {
	const { url, className, caption, type, providerNameSlug } = attributes;

	const [ preview, setPreview ] = useState( {} );

	useEffect( () => {
		fetchEmbedContent( { url } ).then( ( { data } ) => {
			if ( data?.html === false && data?.type === undefined ) {
				return;
			}

			setPreview( data );
		} );
	}, [ url ] );

	const classes = classnames( className, 'wp-block-embed', {
		'is-type-video': 'video' === type,
		[ `align${ attributes.align }` ]: ! isNil( attributes.align ),
	} );

	const html = 'photo' === type ? getPhotoHTML( preview ) : preview.html;

	const iframeTitle = sprintf(
		// translators: %s: host providing embed content e.g: www.youtube.com
		__( 'Embedded content from %s', 'blocks' ),
		providerNameSlug
	);

	return (
		<figure className={ classes }>
			<div className="wp-block-embed__wrapper">
				<Sandbox
					html={ html }
					scripts={ preview.scripts }
					title={ iframeTitle }
					type={ classnames( type, className ) }
				/>
			</div>
			{ ! isEmpty( caption ) && <figcaption>{ caption }</figcaption> }
		</figure>
	);
};

CoreEmbed.blockName = 'core/embed';

export default CoreEmbed;

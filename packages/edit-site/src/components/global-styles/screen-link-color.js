/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalPanelColorGradientSettings as PanelColorGradientSettings } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ScreenHeader from './header';
import {
	getSupportedGlobalStylesPanels,
	useSetting,
	useStyle,
	useColorsPerOrigin,
} from './hooks';

function ScreenLinkColor( { name } ) {
	const parentMenu = name === undefined ? '' : '/blocks/' + name;
	const supports = getSupportedGlobalStylesPanels( name );
	const [ solids ] = useSetting( 'color.palette', name );
	const [ areCustomSolidsEnabled ] = useSetting( 'color.custom', name );

	const colorsPerOrigin = useColorsPerOrigin( name );

	const [ isLinkEnabled ] = useSetting( 'color.link', name );

	const hasLinkColor =
		supports.includes( 'linkColor' ) &&
		isLinkEnabled &&
		( solids.length > 0 || areCustomSolidsEnabled );

	const [ linkColor, setLinkColor ] = useStyle(
		'elements.link.color.text',
		name
	);
	const [ userLinkColor ] = useStyle(
		'elements.link.color.text',
		name,
		'user'
	);

	if ( ! hasLinkColor ) {
		return null;
	}

	const settings = [
		{
			colorValue: linkColor,
			onColorChange: setLinkColor,
			label: __( 'Link color' ),
			clearable: linkColor === userLinkColor,
		},
	];

	return (
		<>
			<ScreenHeader
				back={ parentMenu + '/colors' }
				title={ __( 'Links' ) }
				description={ __(
					'Set the default color used for links across the site.'
				) }
			/>

			<PanelColorGradientSettings
				title={ __( 'Color' ) }
				settings={ settings }
				colors={ colorsPerOrigin }
				disableCustomColors={ ! areCustomSolidsEnabled }
				__experimentalHasMultipleOrigins
				showTitle={ false }
				enableAlpha
				__experimentalIsRenderedInSidebar
			/>
		</>
	);
}

export default ScreenLinkColor;

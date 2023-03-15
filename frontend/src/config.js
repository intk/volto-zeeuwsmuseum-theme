/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

import {
  EmptylineEditBlock,
  EmptylineViewBlock,
  SocialBottomViewBlock,
  SocialBottomEditBlock,
  PhotoDescriptionViewBlock,
  PhotoDescriptionEditBlock,
} from '@package/components';
import dotsSVG from '@plone/volto/icons/dots.svg';
import showSVG from '@plone/volto/icons/show.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import { MultilingualWidget } from 'volto-multilingual-widget';
import installBlocks from './components/Blocks';
import installFooter from './footer';
// import installExpressMiddleware from './express-middleware';
import { getContent } from '@plone/volto/actions';

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

export default function applyConfig(config) {
  config.blocks.requiredBlocks = [];
  config.blocks.groupBlocksOrder.push({ id: 'site', title: 'Site' });

  (config.blocks.blocksConfig.socialbottom = {
    id: 'socialbottom',
    title: 'Socialbuttons',
    icon: showSVG,
    group: 'site',
    view: SocialBottomViewBlock,
    edit: SocialBottomEditBlock,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  }),
    (config.blocks.blocksConfig.emptyline = {
      id: 'emptyline',
      title: 'Empty Line',
      icon: dotsSVG,
      group: 'text',
      view: EmptylineViewBlock,
      edit: EmptylineEditBlock,
      restricted: false,
      mostUsed: false,
      security: {
        addPermission: [],
        view: [],
      },
    }),
    (config.blocks.blocksConfig.photodescription = {
      id: 'photodescription',
      title: 'Photo Info',
      icon: editingSVG,
      group: 'media',
      view: PhotoDescriptionViewBlock,
      edit: PhotoDescriptionEditBlock,
      restricted: false,
      mostUsed: false,
      sidebarTab: 1,
      security: {
        addPermission: [],
        view: [],
      },
    }),
    (config.widgets.id.cookie_consent_configuration = MultilingualWidget());

  const DEFAULT_LANG = 'nl';

  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'nl', 'de'];
  config.settings.defaultLanguage = DEFAULT_LANG;
  config.settings = {
    ...config.settings,
    navDepth: 6,
    siteDataPageId: 'footer',
  };

  config.settings.asyncPropsExtenders = [
    ...config.settings.asyncPropsExtenders,
    {
      path: '/',
      key: 'footer',
      extend: (dispatchActions) => {
        const action = {
          key: 'footer',
          promise: ({ location, store }) => {
            // const currentLang = state.intl.locale;
            const bits = location.pathname.split('/');
            const currentLang =
              bits.length >= 2 ? bits[1] || DEFAULT_LANG : DEFAULT_LANG;

            const state = store.getState();
            if (state.content.subrequests?.[`footer-${currentLang}`]?.data) {
              return;
            }

            const siteDataPageId = config.settings.siteDataPageId;
            const url = `/${currentLang}/${siteDataPageId}`;
            const action = getContent(url, null, `footer-${currentLang}`);
            return store.dispatch(action).catch((e) => {
              // eslint-disable-next-line
              console.log(
                `Footer links folder not found: ${url}. Please create as page
                named ${siteDataPageId} in the root of your current language and
                fill it with the appropriate action blocks`,
              );
            });
          },
        };
        return [...dispatchActions, action];
      },
    },
  ];

  return installFooter(installBlocks(config));
}

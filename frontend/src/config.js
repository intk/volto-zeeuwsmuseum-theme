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

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

export default function applyConfig(config) {
  config.blocks.requiredBlocks = [];

  (config.blocks.blocksConfig.socialbottom = {
    id: 'socialbottom',
    title: 'Socialbuttons',
    icon: showSVG,
    group: 'common',
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
      security: {
        addPermission: [],
        view: [],
      },
    }),
    // config.settings = {
    //   ...config.settings,
    //   isMultilingual: true,
    //   supportedLanguages: ['en', 'nl', 'de'],
    //   defaultLanguage: 'en',
    // };

    (config.widgets.id.cookie_consent_configuration = MultilingualWidget());

  const DEFAULT_LANG = 'nl';

  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'nl', 'de'];
  config.settings.defaultLanguage = DEFAULT_LANG;
  config.settings = {
    ...config.settings,
    navDepth: 6,
  };

  return config;
}

import ShowTableOfContentView from './ShowTableOfContentView';
import ShowTableOfContentEdit from './ShowTableOfContentEdit';
import themeSVG from '@plone/volto/icons/theme.svg';

const InstallShowTableOfContent = (config) => {
  config.blocks.blocksConfig.showTableOfContent = {
    id: 'showTableOfContent',
    title: 'Show Table of Content',
    icon: themeSVG,
    group: 'site',
    view: ShowTableOfContentView,
    edit: ShowTableOfContentEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};

export default InstallShowTableOfContent;

import TableOfContentView from './TableOfContentView';
import TableOfContentEdit from './TableOfContentEdit';
import themeSVG from '@plone/volto/icons/theme.svg';

const InstallTableOfContent = (config) => {
  config.blocks.blocksConfig.tableOfContent = {
    id: 'tableOfContent',
    title: 'Table of Content',
    icon: themeSVG,
    group: 'site',
    view: TableOfContentView,
    edit: TableOfContentEdit,
    restricted: false,
    mostUsed: false,
    // sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};

export default InstallTableOfContent;

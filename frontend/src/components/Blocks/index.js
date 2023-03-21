import installSiteDataBlock from './SiteData';
import InstallShowTableOfContent from './TableOfContentSwitch';
import { compose } from 'redux';

const installBlocks = (config) => {
  return compose(installSiteDataBlock, InstallShowTableOfContent)(config);
};

export default installBlocks;

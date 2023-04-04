import installSiteDataBlock from './SiteData';
import InstallTableOfContent from './TableOfContentSwitch';
import { compose } from 'redux';

const installBlocks = (config) => {
  return compose(installSiteDataBlock, InstallTableOfContent)(config);
};

export default installBlocks;

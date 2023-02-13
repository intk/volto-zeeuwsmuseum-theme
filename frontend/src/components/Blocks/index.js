import installSiteDataBlock from './SiteData';
import { compose } from 'redux';

const installBlocks = (config) => {
  return compose(installSiteDataBlock)(config);
};

export default installBlocks;

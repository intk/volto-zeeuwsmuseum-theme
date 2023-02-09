import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { SocialLinks } from '@package/components';
import { Address } from '@package/components/theme/Footer/Footer';
import './style.css';

const SiteDataView = (props) => {
  const { data } = props;

  return (
    <div className="site-data-preview">
      <h3>Site data</h3>
      <div>
        <h4>
          <FormattedMessage id="Opening hours" defaultMessage="Opening hours" />
          :
        </h4>
        <div>{data.openingHoursTitle}</div>
        <div>{data.openingHours}</div>
      </div>
      <div>
        <h4>
          <FormattedMessage id="Contact" defaultMessage="Contact" />:
        </h4>
        <Address {...data} />
      </div>
      <div>
        <h4>
          <FormattedMessage id="Social links" defaultMessage="Social links" />:
        </h4>
        <SocialLinks {...data} />
      </div>
    </div>
  );
};

export default injectIntl(SiteDataView);

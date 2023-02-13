import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { SocialLinks } from '@package/components';

const SiteDataView = (props) => {
  const { data } = props;

  return (
    <div className="site-data-preview">
      <div>
        <div>
          <h3>
            <b>Address Information</b>
          </h3>
          <p>{props.data.address}</p>
          <p>{props.data.addressSecond}</p>
        </div>
        <div>
          <h3>
            <b>Contact Information</b>
          </h3>
          <p>{props.data.email}</p>
          <p>{props.data.phone}</p>
        </div>
      </div>
      <div>
        <h4>
          <FormattedMessage id="Social links" defaultMessage="Social links" />:
        </h4>
        <p>
          <SocialLinks {...data} />
        </p>
      </div>
    </div>
  );
};

export default injectIntl(SiteDataView);

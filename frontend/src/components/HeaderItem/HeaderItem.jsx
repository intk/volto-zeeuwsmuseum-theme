import React from 'react';
import { NavLink } from 'react-router-dom';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const HeaderItem = ({ item, lang, id }) => {
  const { settings } = config;
  // The item.url in the root is ''
  // TODO: make more consistent it everywhere (eg. reducers to return '/' instead of '')
  if (isInternalURL(item.url) || item.url === '') {
    return (
      <NavLink
        to={item.url === '' ? '/' : item.url}
        key={item.url}
        className="logo-written"
        id="logo-written"
        activeClassName="active"
        exact={
          settings.isMultilingual ? item.url === `/${lang}` : item.url === ''
        }
      >
        Zeeuws Museum
      </NavLink>
    );
  } else {
    return (
      <a
        href={item.url}
        key={item.url}
        className="logo-written"
        rel="noopener noreferrer"
        id="logo-written"
      >
        'Zeeuws Museum'
      </a>
    );
  }
};

export default HeaderItem;

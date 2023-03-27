import React from 'react';
import { NavLink } from 'react-router-dom';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const NavItem = ({ item, lang, id }) => {
  const { settings } = config;
  // The item.url in the root is ''
  // TODO: make more consistent it everywhere (eg. reducers to return '/' instead of '')
  if (isInternalURL(item.url) || item.url === '') {
    return (
      <NavLink
        to={item.url === '' ? '/' : item.url}
        key={'navlink' + item.url}
        className="accordion item simple"
        id={id}
        activeClassName="active"
        exact={
          settings.isMultilingual ? item.url === `/${lang}` : item.url === ''
        }
      >
        {item.title}
      </NavLink>
    );
  } else {
    return (
      <a
        href={item.url}
        key={'navlinkk' + item.url}
        className="item simple"
        rel="noopener noreferrer"
        id={id}
      >
        {item.title}
      </a>
    );
  }
};

export default NavItem;

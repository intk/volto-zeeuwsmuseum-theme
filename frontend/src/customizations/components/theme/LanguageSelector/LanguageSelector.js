/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import cx from 'classnames';
import { find, map } from 'lodash';

import { Helmet, langmap, flattenToAppURL } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { defineMessages, useIntl } from 'react-intl';
import { Dropdown } from 'semantic-ui-react';
import { FaChevronDown } from 'react-icons/fa';

const messages = defineMessages({
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
});

const LanguageSelector = (props) => {
  const intl = useIntl();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  const { settings } = config;

  return settings.isMultilingual ? (
    <div className="language-selector-wrapper">
      <Dropdown
        text={currentLang}
        className="item simple language-selector"
        key={''}
        icon={<FaChevronDown color="#808080" />}
      >
        <Dropdown.Menu
          key={''}
          className="language-selector_dropdown"
          id="language-selector_dropdown"
        >
          {map(settings.supportedLanguages, (lang) => {
            if (lang !== currentLang) {
              const translation = find(translations, { language: lang });
              return (
                <Link
                  aria-label={`${intl.formatMessage(
                    messages.switchLanguageTo,
                  )} ${langmap[lang].nativeName.toLowerCase()}`}
                  className={cx({ selected: lang === currentLang })}
                  to={
                    translation
                      ? flattenToAppURL(translation['@id'])
                      : `/${lang}`
                  }
                  title={langmap[lang].nativeName}
                  onClick={() => {
                    props.onClickAction();
                  }}
                  key={`language-selector-${lang}`}
                >
                  {lang}
                </Link>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <Helmet>
      <html lang={settings.defaultLanguage} />
    </Helmet>
  );
};

LanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelector;

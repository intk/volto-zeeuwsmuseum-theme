// import { defineMessages, formatMessage } from 'react-intl';
// const messages = defineMessages({
//   Newsletter: {
//     id: 'Switch to',
//     defaultMessage: 'Switch to',
//   },
// });

export default function installFooter(config) {
  config.settings.siteActions = [
    {
      id: 'Newsletter',
      links: {
        en: {
          title: 'Newsletter',
          path: '/en/contact',
        },
        nl: {
          title: 'Newsletter-NL',
          path: '/nl/contact',
        },
      },
    },
    {
      id: 'Disclaimer',
      links: {
        en: {
          title: 'Disclaimer',
          path: '/en/contact',
        },
        nl: {
          title: 'Disclaimer-NL',
          path: '/nl/contact',
        },
      },
    },
    {
      id: 'Privacy policy',
      links: {
        en: {
          title: 'Privacy policy',
          path: '/en/contact',
        },
        nl: {
          title: 'Privacy policy-NL',
          path: '/nl/contact',
        },
      },
    },
    {
      id: 'Login',
      links: {
        en: {
          title: 'Login',
          path: '/en/login',
        },
        nl: {
          title: 'Login',
          path: '/nl/login',
        },
      },
    },
  ];

  config.settings.footerLinks = [
    {
      id: 'Contacts',
      links: {
        en: {
          title: 'Contacts',
          path: '/en/contact',
        },
        nl: {
          title: 'Contacts-NL',
          path: '/nl/contact',
        },
      },
    },
    {
      id: 'Vacancies',
      links: {
        en: {
          title: 'Vacancies',
          path: '/en/vacancies',
        },
        nl: {
          title: 'Vacancies-NL',
          path: '/nl/vacancies',
        },
      },
    },
    {
      id: 'FAQ',
      links: {
        en: {
          title: 'FAQ',
          path: '/en/faq',
        },
        nl: {
          title: 'FAQ-NL',
          path: '/nl/faq',
        },
      },
    },
    {
      id: 'About',
      links: {
        en: {
          title: 'About',
          path: '/en/about',
        },
        nl: {
          title: 'About-NL',
          path: '/nl/about',
        },
      },
    },
  ];

  config.settings.socialLinks = [
    {
      id: 'Facebook',
      title: 'Facebook',
      href: 'https://facebook.com',
    },
    {
      id: 'Instagram',
      title: 'Instagram',
      href: 'https://Instagram.com',
    },
    {
      id: 'Twitter',
      title: 'Twitter',
      href: 'https://Twitter.com',
    },
    {
      id: 'Youtube',
      title: 'Youtube',
      href: 'https://Youtube.com',
    },
    {
      id: 'Linkedin',
      title: 'Linkedin',
      href: 'https://Linkedin.com',
    },
  ];

  return config;
}

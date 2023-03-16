import config from '@plone/volto/registry';
import { GET_BLOCK_CONTENT } from '../../constants/ActionTypes';
/**
 * Get content function
 * @function getContent
 * @param {string} url Content url
 * @param {string} version Version id
 * @param {string} subrequest Key of the subrequest.
 * @param {boolean} fullobjects If full object information should be retrieved
 * @returns {Object} Get content action
 */
export function getBlockContent(
  url,
  version = null,
  subrequest = null,
  page = null,
  fullobjects = false,
) {
  const { settings } = config;
  const query = Object.assign(
    {},
    fullobjects || settings.bbb_getContentFetchesFullobjects
      ? { fullobjects: true }
      : {},
    page
      ? {
          b_start: settings.defaultPageSize * (page - 1),
          b_size: settings.defaultPageSize,
        }
      : {},
  );

  let qs = Object.keys(query)
    .map(function (key) {
      return key + '=' + query[key];
    })
    .join('&');

  return {
    type: GET_BLOCK_CONTENT,
    subrequest,
    request: {
      op: 'get',
      path: `${url}${version ? `/@history/${version}` : ''}${
        qs ? `?${qs}` : ''
      }`,
    },
  };
}

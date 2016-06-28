import fetch from 'isomorphic-fetch';

export const REQUEST_PLUGINS = 'REQUEST_PLUGINS';
export const RECEIVE_PLUGINS = 'RECEIVE_PLUGINS';
export const FILTER_PLUGIN = 'FILTER_PLUGIN';
export const INVALIDATE_PLUGINS = 'INVALIDATE_PLUGINS';

export function filterPlugin(keyword) {
  return {
    type: FILTER_PLUGIN,
    keyword,
  };
}

export function invalidatePlugins(keyword) {
  return {
    type: INVALIDATE_PLUGINS,
    keyword,
  }
}

function requestPlugins(keyword) {
  return {
    type: REQUEST_PLUGINS,
    keyword,
  };
}

function receivePlugins(keyword, json) {
  return {
    type: RECEIVE_PLUGINS,
    keyword,
    items: json.results.map(plugin => plugin),
    receivedAt: Date.now(),
  };
}

const API = 'http://npmsearch.com/query?fields=name,keywords,rating,description,author,modified,homepage,version,repository&q=keywords:amazeui-plugin&size=20&sort=modified:desc&start=0';

function fetchPlugins(keyword) {
  // console.warn('fetch...', keyword);
  return dispatch => {
    dispatch(requestPlugins(keyword));
    return fetch(API)
      .then(response => response.json())
      .then(json => dispatch(receivePlugins(keyword, json)));
  }
}

function shouldFetchPlugins(state, keyword) {
  const plugins = state.items;
  if (!plugins) {
    return true;
  } else if (plugins.isFetching) {
    return false;
  } else {
    return plugins.didInvalidate;
  }
}

export function fetchPluginsIfNeeded(keyword) {
  return (dispatch, getState) => {
    if (shouldFetchPlugins(getState(), keyword)) {
      return dispatch(fetchPlugins(keyword));
    }
  }
}

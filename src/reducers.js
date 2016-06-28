import {
  combineReducers,
} from 'redux';
import {
  FILTER_PLUGIN,
  REQUEST_PLUGINS,
  RECEIVE_PLUGINS,
  INVALIDATE_PLUGINS,
} from './actions';

function selectedKeyword(state = '', action) {
  switch (action.type) {
    case FILTER_PLUGIN:
      return action.keyword;
    default:
      return state;
  }
}

function plugins(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_PLUGINS :
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PLUGINS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PLUGINS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  plugins,
  selectedKeyword,
});

export default rootReducer;

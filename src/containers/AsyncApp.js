import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  filterPlugin,
  fetchPluginsIfNeeded,
  invalidatePlugins,
} from '../actions';
// import Filter from '../components/Filter';
import PluginList from '../components/PluginList';
import Spinner from '../components/Spinner';

class AsyncApp extends Component {
  static propTypes = {
    selectedKeyword: PropTypes.string.isRequired,
    pluginItems: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const {dispatch, selectedKeyword} = this.props;
    dispatch(fetchPluginsIfNeeded(selectedKeyword));
  }

  componentWillReceiveProps(nextProps) {
    /*if (nextProps.selectedKeyword !== this.props.selectedKeyword) {
      const {dispatch, selectedKeyword} = nextProps;
      dispatch(fetchPluginsIfNeeded(selectedKeyword));
    }*/
  }

  handleChange(nextKeyword) {
    this.props.dispatch(filterPlugin(nextKeyword));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const {dispatch, selectedKeyword} = this.props;
    dispatch(invalidatePlugins(selectedKeyword));
    dispatch(fetchPluginsIfNeeded(selectedKeyword));
  }

  renderSpinner() {
    return (
      <div className="am-text-center am-padding-vertical-xl">
        <Spinner amSize={`xl`} />
      </div>
    )
  }

  render() {
    const {
      selectedKeyword,
      pluginItems,
      isFetching,
      lastUpdated,
    } = this.props;

    return (
      <div>
        <h2>官方移植插件</h2>
        <hr />

        {isFetching && pluginItems.length === 0 && this.renderSpinner()}

        {!isFetching && pluginItems.length === 0 &&
        <h2>Empty.</h2>
        }
        {pluginItems.length > 0 &&
        <div style={{opacity: isFetching ? 0.5 : 1}}>
          <PluginList plugins={pluginItems} isThird={false} />
        </div>
        }
        <h2>第三方（移植）插件</h2>
        <p>注：数据由npm包标签 "amazeui-plugin" 抓取而来, 感谢第三方开发者的贡献</p>
        <hr />
          {pluginItems.length > 0 &&
          <div style={{opacity: isFetching ? 0.5 : 1}}>
            <PluginList plugins={pluginItems} isThird={true} />
          </div>
          }

        <p>欢迎贡献 Amaze UI 插件，具体参见<a href="https://github.com/amazeui/amazeui/wiki/%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6%EF%BC%88%E7%BB%84%E4%BB%B6%EF%BC%89%E5%BC%80%E5%8F%91%EF%BC%88%E7%A7%BB%E6%A4%8D%EF%BC%89%E8%A7%84%E5%88%99" target="_blank">第三方插件（组件）开发（移植）规则</a>。</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    selectedKeyword,
    plugins,
  } = state;
  const {
    isFetching,
    lastUpdated,
    items: pluginItems
  } = plugins || {
    isFetching: true,
    items: []
  };

  return {
    selectedKeyword,
    pluginItems,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);

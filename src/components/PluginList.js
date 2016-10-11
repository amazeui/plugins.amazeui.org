import React, {
  PropTypes,
  Component,
} from 'react';

export default class PluginList extends Component {
  static propTypes = {
    plugins: PropTypes.array.isRequired,
    isThird: PropTypes.bool.isRequired
  };

  formatDate(date) {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  }

  render() {
    const isThird = this.props.isThird;

    return (
      <ul className="am-avg-sm-1 am-avg-md-2 plugin-list">
        {
          this.props.plugins.map((plugin, i) => {
            const {
              name,
              description,
              homepage,
              repository,
              author,
              modified,
              version,
            } = plugin;
            let pluginLi = () => (
              <li key={i}>
                <div className="pl-item">
                  <h3>{name[0]}</h3>
                  <p className="plugin-modified">
                    <span className="am-icon-clock-o" />
                    {this.formatDate(modified[0])}
                    <span>|</span>
                    v{version[0]}
                  </p>
                  <p className="plugin-desc">{description[0]}</p>
                  <p className="plugin-links">
                    <a href={homepage[0].replace(/hub.io/, '.github.io')} target="_blank">
                      <span className="am-icon-book" />
                      项目主页</a> |{' '}
                    <a href={repository[0].replace('git+', '')} target="_blank">
                      <span className="am-icon-github" />
                      源码仓库
                    </a>
                  </p>
                </div>
              </li>
            );
            if(!isThird && author[0] == "minwe") {
              return pluginLi();
            }
            if(isThird && author[0] !== "minwe") {
              return pluginLi();
            }
          })
        }
      </ul>
    );
  }
}

import React from 'react';
// import PropTypes from 'prop-types';
import styles from './IndexPage.css';

class IndexPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  render () {
    const minusClick = () => {
      const countNumber = this.state.count - 1;
      this.setState({count: countNumber});
    };
    const addClick = () => {
      const countNumber = this.state.count + 1;
      this.setState({count: countNumber});
    };
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
          <li>
            <span><button onClick={minusClick}>-</button></span>
            <span>{this.state.count}</span>
            <span><button onClick={addClick}>+</button></span>
          </li>
        </ul>
      </div>
    );
  }
}

export default IndexPage;

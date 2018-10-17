import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function asyncComponent({ importFunc, ...rest }) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentWillMount() {
      Nprogress.start();
    }

    async componentDidMount() {
      this.mounted = true;
      const { default: WrappedComponent } = await importFunc();
      Nprogress.done();
      if (this.mounted) {
        this.setState({
          component: <WrappedComponent {...this.props} {...rest} />,
        });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { component } = this.state;
      const WrappedComponent = component || <div />;
      return (
        <ReactPlaceholder type="text" rows={7} ready={WrappedComponent !== null}>
          {WrappedComponent}
        </ReactPlaceholder>
      );
    }
  }
  return AsyncFunc;
}

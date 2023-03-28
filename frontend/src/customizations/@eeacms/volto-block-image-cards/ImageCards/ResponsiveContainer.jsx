/*
 * Port of (MIT licensed)
 * https://github.com/recharts/recharts/blob/master/src/component/ResponsiveContainer.tsx
 * to JSX
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import { isString, debounce } from 'lodash';

const isPercent = (value) =>
  isString(value) && value.indexOf('%') === value.length - 1;

function asNumber(value) {
  if (isString(value)) return value.toInteger();
  return value;
}

class ResponsiveContainer extends Component {
  static defaultProps = {
    width: '100%',
    height: '100%',
    debounce: 0,
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
    };

    this.handleResize =
      props.debounce > 0
        ? debounce(this.updateDimensionsImmediate, props.debounce)
        : this.updateDimensionsImmediate;
  }

  componentDidMount() {
    this.mounted = true;

    const size = this.getContainerSize();

    if (size) {
      this.setState(size);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getContainerSize() {
    if (!this.container) {
      return null;
    }

    return {
      containerWidth: this.container.clientWidth,
      containerHeight: this.container.clientHeight,
    };
  }

  updateDimensionsImmediate = () => {
    if (!this.mounted) {
      return;
    }

    const newSize = this.getContainerSize();

    if (newSize) {
      const {
        containerWidth: oldWidth,
        containerHeight: oldHeight,
      } = this.state;
      const { containerWidth, containerHeight } = newSize;

      if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
        this.setState({ containerWidth, containerHeight });
      }
    }
  };

  renderChildren(props) {
    const { containerWidth, containerHeight } = this.state;

    const {
      aspect,
      width,
      height,
      // minWidth,
      // minHeight,
      maxHeight,
      children,
    } = this.props;

    let calculatedWidth = isPercent(width) ? containerWidth : asNumber(width);
    let calculatedHeight = isPercent(height)
      ? containerHeight
      : asNumber(height);

    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }

      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
      }
    }
    return __CLIENT__ ? children({ parentWidth: calculatedWidth }) : children;
  }

  render() {
    const {
      minWidth,
      minHeight,
      width,
      height,
      maxHeight,
      id,
      className,
    } = this.props;
    const style = { width, height, minWidth, minHeight, maxHeight };
    return (
      <div
        id={id}
        className={classNames('responsive-container', className)}
        ref={(node) => {
          this.container = node;
        }}
        style={{
          minWidth: this.props.minWidth ? this.props.minWidth + 'px' : 'unset',
          ...style,
        }}
      >
        {this.renderChildren(this.props)}
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.handleResize}
        />
      </div>
    );
  }
}

export default ResponsiveContainer;

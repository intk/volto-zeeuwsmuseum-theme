/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Accordion, Menu } from 'semantic-ui-react';
import { FaChevronDown } from 'react-icons/fa';

export default class AccordionMenu extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion id="accordion" as={Menu} vertical>
        <Menu.Item icon={<FaChevronDown />}>
          <Accordion.Title
            active={activeIndex === 0}
            content="Size"
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 0} content={SizeForm} />
        </Menu.Item>

        <Menu.Item icon={<FaChevronDown />}>
          <Accordion.Title
            active={activeIndex === 1}
            content="Colors"
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1} content={ColorForm} />
        </Menu.Item>
      </Accordion>
    );
  }
}

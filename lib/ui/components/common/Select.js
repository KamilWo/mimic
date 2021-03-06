import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import find from 'lodash/find';
import get from 'lodash/get';
import Icon from 'ui/components/common/Icon';
import { Div } from 'ui/components/common/base';

const OptionsContainer = styled(Div)`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2147483646;
  background: #fff;
  max-height: 600px;
  overflow-y: auto;
  ${(props) => `${props.anchorPoint}: 100%;`}
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.33);
`;

const Option = styled(Div)`
  padding: ${(props) => props.withPadding ? '5px 5px 5px 32px' : '5px'};
  user-select: none;
  
  &:hover {
    cursor: pointer;
    background-color: #c9dcf4;
  }
`;

const Container = styled(Div)`
  position: relative;
  cursor: pointer;
  height: 100%;
  padding: 0 6px 0 8px;
  background-color: ${(props) => props.isOpen && props.quickEdit ? '#f0f0f0' : 'white'};
`;

const ValueContainer = styled(Div)`
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
`;

const customIconStyle = {
  cursor: 'pointer',
  marginRight: 8
};

const dropdownIconStyle = {
  cursor: 'pointer',
  marginLeft: 4
};

export class Select extends React.Component {

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  selectValue = (option) => {
    const { onChange } = this.props;

    return () => {
      onChange && onChange(option.value);
    }
  };

  autoScrollToEnd = (ref) => {
    if (ref && this.props.autoScrollToEnd) {
      ref.scrollTop = ref.scrollHeight;
    }
  };

  renderOptions = () => {
    if (!this.state.isOpen) {
      return false;
    }

    const options = this.props.options.map((option) => {
      if (this.props.optionComponent) {
        const OptionComponent = this.props.optionComponent;
        return <OptionComponent key={ option.value } onClick={ this.selectValue(option) } { ...option }/>;
      }

      return (
        <Option key={ option.value } onClick={ this.selectValue(option) } withPadding={ this.props.valueIcon }>
          { option.label }
        </Option>
      );
    });

    return (
      <OptionsContainer innerRef={ this.autoScrollToEnd } anchorPoint={ this.props.anchorPoint }>
        { options }
      </OptionsContainer>
    )
  };

  renderValue = () => {
    const selectedOption = find(this.props.options, { value: this.props.value });

    return (
      <ValueContainer>
        { this.props.valueIcon && <Icon src={ this.props.valueIcon } style={ customIconStyle }/> }

        {
          this.props.valueComponent
            ? <this.props.valueComponent { ...selectedOption }/>
            : get(selectedOption, 'label', null)
        }

        { this.props.showDropdownIcon && <Icon src="select" style={ dropdownIconStyle }/> }
      </ValueContainer>
    );
  };

  render() {
    return (
      <Container isOpen={ this.state.isOpen } quickEdit={ this.props.quickEdit } onClick={ this.toggle }>
        { this.renderOptions() }
        { this.renderValue() }
      </Container>
    );
  }

}

Select.defaultProps = {
  anchorPoint: 'top',
  showDropdownIcon: true
};

export default enhanceWithClickOutside(Select);

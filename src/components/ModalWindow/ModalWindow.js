import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalWindowContent } from '../ModalWindowContent/index';

import './ModalWindow.scss';

export class ModalWindow extends Component {
  componentDidMount() {
    const { modalWindowUuid, loadModalData } = this.props;

    loadModalData(modalWindowUuid);
  }

  render() {
    const { modalWindowData } = this.props;
    
    if (modalWindowData !== null) {
      return <ModalWindowContent />;
    }
     
    return <></>;
  }
}

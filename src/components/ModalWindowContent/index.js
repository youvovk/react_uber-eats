import { connect } from 'react-redux';
import { ModalWindowContent } from './ModalWindowContent';

function mapState2Props(state) {
  return {
    modalWindowData: state.modalWindowData,
  };
}

const Enhanced = connect(
  mapState2Props,
)(ModalWindowContent);

export { Enhanced as ModalWindowContent };

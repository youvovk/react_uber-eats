import { connect } from 'react-redux';
import { ModalWindow } from './ModalWindow';
import { loadModalData } from '../../store/actions';
import {
  selectorRestaurant,
} from '../../store/selectors';

function mapState2Props(state) {
  return {
    modalWindowUuid: state.modalWindowUuid,
    modalWindowData: state.modalWindowData,
  };
}

const mapDispatch2Props = dispatch => ({
  loadModalData: uuid => dispatch(loadModalData(uuid)),
});

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(ModalWindow);

export { Enhanced as ModalWindow };

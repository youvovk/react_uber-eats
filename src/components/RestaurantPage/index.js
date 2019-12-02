import { connect } from 'react-redux';
import { RestaurantPage } from './RestaurantPage';
import { loadRestaurant, openModalWindow, loadRestaurants } from '../../store/actions';
import {
  selectorRestaurant,
  selectorRestaurants,
} from '../../store/selectors';

function mapState2Props(state) {
  return {
    restaurantData: selectorRestaurant(state),
    restaurantsData: selectorRestaurants(state),
  };
}

const mapDispatch2Props = dispatch => ({
  loadRestaurant: uuid => dispatch(loadRestaurant(uuid)),
  openModalWindow: (uuid, rule) => dispatch(openModalWindow(uuid, rule)),
  loadRestaurants: () => dispatch(loadRestaurants()),
});

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(RestaurantPage);

export { Enhanced as RestaurantPage };

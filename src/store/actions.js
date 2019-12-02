export const ACTION_TYPES = {
  SAVE_RESTAURANTS: 'SAVE_RESTAURANTS',
  SAVE_RESTAURANT: 'SAVE_RESTAURANT',
  SET_LOAD_RESTAURANTS_ERROR: 'SET_LOAD_RESTAURANTS_ERROR',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  OPEN_MODAL_WINDOW: 'OPEN_MODAL_WINDOW',
  SAVE_MODAL_DATA: 'SAVE_MODAL_DATA',
};

export const openModalWindow = uuid => ({
  type: ACTION_TYPES.OPEN_MODAL_WINDOW,
  payload: uuid,
});

const saveModalData = data => ({
  type: ACTION_TYPES.SAVE_MODAL_DATA,
  payload: data,
});

const saveRestaurant = data => ({
  type: ACTION_TYPES.SAVE_RESTAURANT,
  payload: data,
});

const saveRestaurants = data => ({
  type: ACTION_TYPES.SAVE_RESTAURANTS,
  payload: data,
});

const setRestaurantsError = error => ({
  type: ACTION_TYPES.SET_LOAD_RESTAURANTS_ERROR,
  payload: error,
});

const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

const stopLoading = () => ({
  type: ACTION_TYPES.STOP_LOADING,
});

export const loadRestaurants = () => (dispatch) => {
  dispatch(startLoading());

  fetch('https://mate-uber-eats-api.herokuapp.com/api/v1/restaurants')
    .then(res => res.json())
    .then(({ data }) => dispatch(saveRestaurants(data)))
    .catch(error => dispatch(setRestaurantsError(error.massage)))
    .finally(() => dispatch(stopLoading()));
};

export const loadRestaurant = uuid => (dispatch) => {
  dispatch(startLoading());

  fetch(`https://mate-uber-eats-api.herokuapp.com/api/v1/restaurants/${uuid}`)
    .then(res => res.json())
    .then(({ data }) => {
      dispatch(saveRestaurant(data));
    })
    .catch(error => dispatch(setRestaurantsError(error.massage)))
    .finally(() => dispatch(stopLoading()));
};

export const loadModalData = uuid => (dispatch) => {
  dispatch(startLoading());

  fetch(`https://mate-uber-eats-api.herokuapp.com/api/v1/menu-items/${uuid}`)
    .then(res => res.json())
    .then(({ data }) => {
      dispatch(saveModalData(data));
    })
    .catch(error => dispatch(setRestaurantsError(error.massage)))
    .finally(() => dispatch(stopLoading()));
};

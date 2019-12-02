import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RestaurantPage.scss';

const DEFAULT_ETA_RANGE = '20 - 30 min';

const checkItem = (item, array) => {
  let foundItem = false;

  item[1].itemUuids.forEach((itemMenu) => {
    if (array.some(elem => elem[0] === itemMenu)) {
      foundItem = true;
    }
  });

  return foundItem;
};

export class RestaurantPage extends Component {
  componentDidMount() {
    const { loadRestaurant, loadRestaurants, match } = this.props;

    loadRestaurants();
    loadRestaurant(match.params.id);
  }

  render() {
    const {
      openModalWindow,
      restaurantsData,
      restaurantData: {
        categories,
        title,
        location,
        sectionsMap,
        entitiesMap,
        heroImageUrls,
        priceBucket,
        uuid,
      },
    } = this.props;
    const hero = heroImageUrls && heroImageUrls[heroImageUrls.length - 1].url;
    const entitiesMapToArray = entitiesMap && Object.entries(entitiesMap);
    const foundRestaurant = restaurantsData.find(eta => eta.uuid === uuid);
    const foundEta = foundRestaurant ? foundRestaurant.etaRange.text : DEFAULT_ETA_RANGE;

    return (
      <div className="restaurant-page restaurant">
        <div className="hero">
          <div className="restaurant-page__img-wrapper">
            <img src={hero} alt="" className="restaurant-page__img" />
            <div className="restaurant-page__title page__title">
              <h1 className="page__title_indent title">{title}</h1>
              <p
                className="page__title_indent categories"
              >
                {categories && categories.join(' • ')}
              </p>
              <p className="eta">{foundEta}</p>
              <div className="location-wrapper">
                <p className="location">{location && `${location.address} `}</p>
                <a
                  href="https://www.google.com.ua/maps
                  /@50.4851493,30.4721233,14z?hl=ru"
                  className="location__info"
                >
                  <span className="location__dot">
                    •
                  </span>
                  More info
                </a>
              </div>
            </div>
          </div>

          <div className="content" />
        </div>

        <div className="content">
          <nav className="restaurant__menu">
            <ul className="restaurant__menu-items menu">
              {sectionsMap && Object.entries(sectionsMap).map((item) => {
                const { title: menuTitle } = item[1];

                if (!checkItem(item, entitiesMapToArray)) {
                  return <></>;
                }

                return (
                  <li key={item[0]} className="menu__item">
                    <button
                      type="button"
                      className="menu__item-btn"
                    >
                      {menuTitle}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="restaurant__main">
            {sectionsMap && Object.entries(sectionsMap).map((item) => {
              if (!checkItem(item, entitiesMapToArray)) {
                return <></>;
              }

              return (
                <section className="restaurant__items items">
                  <h2 className="restaurant-title">{item[1].title}</h2>
                  <div className="container">
                    {item[1].itemUuids.map((itemMenu) => {
                      const foundItem = entitiesMapToArray
                        .find(elem => elem[0] === itemMenu);

                      return (
                        <div 
                          className="item" 
                          onClick={() => openModalWindow(foundItem[1].uuid, true)}
                        >
                          <div className="item__left">
                            <h3 className="item__title">
                              {foundItem && foundItem[1].title}
                            </h3>
                            <p className="item__description">
                              {foundItem && foundItem[1].description}
                            </p>
                            <p className="item__price">
                              {`${priceBucket.length > 2 ? priceBucket
                                .replace(/[^0-9]/, '') : priceBucket} 
                                ${foundItem && foundItem[1].price}`}
                            </p>
                          </div>

                          <div className="item-right">
                            <img
                              className="item__img"
                              src={foundItem && foundItem[1].imageUrl}
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const restaurantData = PropTypes.shape({
  categories: PropTypes.arrayOf().isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  sectionsMap: PropTypes.shape({}).isRequired,
  entitiesMap: PropTypes.shape({}).isRequired,
  heroImageUrls: PropTypes.arrayOf().isRequired,
  priceBucket: PropTypes.string,
  uuid: PropTypes.string,
}).isRequired;

RestaurantPage.propTypes = {
  loadRestaurant: PropTypes.func.isRequired,
  loadRestaurants: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  openModalWindow: PropTypes.bool,
  restaurantsData: PropTypes.arrayOf(),
  restaurantData,
};

RestaurantPage.defaultProps = {
  openModalWindow: false,
  restaurantsData: [],
  restaurantData: [],
};

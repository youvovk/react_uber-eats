import React from 'react';
import PropTypes from 'prop-types';

import './ModalWindowContent.scss';

export const ModalWindowContent = ({ modalWindowData, openModalWindow }) => {
    console.log(modalWindowData)

  const { 
    imageUrl,
    title,
    itemDescription,
    price,
    customizationsList,
  } = modalWindowData;

  return (
    <div className="modal-window__container modal-window">
      <div className="modal-window__content menu">
        <img
          src={imageUrl}
          alt="meal"
          className="modal-window__img"
        />

        <div className="toggle__close" onClick={() => openModalWindow(null, false)} />

        <div className="menu__title-wrapper">
          <h2 className="menu__title">
            {title}
          </h2>
          <p className="menu__text-grey">
            {itemDescription}
          </p>
        </div>

        {customizationsList.map((item) => {
          const {
            title: titleItem,
            options,
            uuid,
            maxPermitted,
          } = item;

          return (
            <>
              <div key={uuid} className="menu__background">
                <h3 className="menu__text-black">
                  {titleItem}
                </h3>
                <p className="menu__text-grey">
                  {`Choose up to ${options.length}`}
                </p>
              </div>

              {options.map((point) => {
                const {
                  uuid: uuidPoint,
                  title: titlePont,
                  price: pricePoint,
                } = point;

                return (
                  <div key={uuidPoint} className="menu__points point">
                    <div className="point__name">
                      {maxPermitted > 2
                        ? (
                          <label className="checkbox-container point__price">
                            {titlePont}
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        ) : (
                          <>
                            <div className="toggle__point" />
                            <p className="point__price">{titlePont}</p>
                          </>
                        )
                      }
                      
                    </div>

                    <p className="point__price">
                      {`+£${pricePoint}`}
                    </p>
                  </div>
                );
              })}
            </>
          );
        })}

        <p className="menu__text-black menu__background">
            Special instructions
        </p>
        <textarea
          className="menu__textarea"
          placeholder="Leave a note to kitchen"
          name="modal"
        />

        <div className="menu__order-container order">
          <div className="order__toggle toggle">
            <div className="toggle__minus" />
            <p>1</p>
            <div className="toggle__plus" />
          </div>
          <div className="order__add add" onClick={() => openModalWindow(null, false)}>
            <p className="add-center">Add 1 to order</p>
            <p className="add-right">{`${price},00 UAH`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

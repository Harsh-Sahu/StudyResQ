import React from 'react';
import './index.css';

const Cards = (props) => {
  return (
    <>
      <div className='card'>
        <img src={props.img_src} alt='mypic' className='card__img' />
        <div className='card__info'>
          {/* <span className='card__category'>{props.title}</span>
          <div className='card__title'>{props.author}</div>
          <div className='card__title'>{props.pub}</div> */}
          <a href={props.links} target='_blank'>
            <button>Read Now</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Cards;

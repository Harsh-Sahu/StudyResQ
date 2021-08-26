import React from 'react';
import Cards from './Cards';
import Carousel from 'react-elastic-carousel';

const Section = ({ genre }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1, itemsToShow: 5 },
  ];
  return (
    <>
      <div className='Gallery'>
        <Carousel breakPoints={breakPoints}>
          {genre.map((currCard) => {
            return (
              <Cards
                key={currCard.id}
                title={currCard.title}
                img_src={currCard.img_src}
                author={currCard.author}
                pub={currCard.pub}
                link={currCard.links}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Section;

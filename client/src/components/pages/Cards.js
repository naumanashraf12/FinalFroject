import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out our Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/tuning.jpg'
              text='Tuning ur car at door step'
            
              path='/services'
            />
            <CardItem
              src='images/mech.jpg'
              text='Maintian ur car by modernTechs'
             
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/oilchange.jpg'
              text='Oil change'

              path='/services'
            />
            <CardItem
              src='images/mechanic.jpg'
              text='tyres replacement'
       
              path='/services'
            />
            <CardItem
              src='images/carwash.jpg'
              text='Car wash at ur gerage'

              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

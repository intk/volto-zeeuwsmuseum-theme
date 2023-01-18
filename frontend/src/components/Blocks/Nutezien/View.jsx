import React from 'react';
import Slider from 'react-slick';
import { FaChevronRight } from 'react-icons/fa';
import satin from './satin.jpeg';
import diepte from './diepte.jpeg';
import zee from './zee.jpeg';


const View = (props) => {
  return (
    <div className="nutezien">
      <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum/tentoonstellingen/actueel-en-verwacht/aggregator">
        <h1>Nu te zien</h1>
        <FaChevronRight 
        />
      </a>
      <div className="nutezienContainer">
        <div className="nutezienItem">
          <a href="">
            <img className="nutezienPhoto" src={satin} loading="lazy" />
          </a>
          <h3>
            <a
              href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum/tentoonstellingen/actueel-en-verwacht/re_used-re_satin"
              rel="noopener noreferrer"
            >
              RE_USED RE_SATIN
            </a>
          </h3>
          <p>26 nov 2021 t/m 02 apr 2023</p>
          <p>De herkomst én toekomst van textiel</p>
        </div>
        <div className="nutezienItem">
          <a href="">
            <img className="nutezienPhoto" src={zee} loading="lazy" />
          </a>
          <h3>
            <a
              href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum/tentoonstellingen/actueel-en-verwacht/de-mix-nederland-ons-dorp-en-de-zee"
              rel="noopener noreferrer"
            >
              DE MIX NEDERLAND | ONS DORP EN DE ZEE
            </a>
          </h3>
          <p>25 jun 2022 t/m 08 jan 2023</p>{' '}
          <p>
            Neeltje Flipse-Roelse (1921 – 2008) &amp; Annegien van Doorn (1982)
          </p>
        </div>
        <div className="nutezienItem">
          <a href="">
            <img className="nutezienPhoto" src={diepte} loading="lazy" />
          </a>
          <h3>
            <a
              href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum/tentoonstellingen/vanuit-de-diepte"
              rel="noopener noreferrer"
            >
              VANUIT DE DIEPTE
            </a>
          </h3>
          <p>25 sep 2021 t/m 08 jan 2023</p>
          <p>Ervaringen delen in een pandemie</p>
        </div>
      </div>
    </div>
  );
};

export default View;

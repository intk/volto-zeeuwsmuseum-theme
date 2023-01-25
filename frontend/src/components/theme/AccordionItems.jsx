import React from 'react';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';
import { FaChevronDown } from 'react-icons/fa';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionLanguageSelector } from 'components';

const AccordionItems = ({ items, lang }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <AccordionLanguageSelector />
      {items.map((item) =>
        item && item.items && item.items.length > 0 ? (
          <Accordion
            expanded={expanded === item.title}
            onChange={handleChange(item.title)}
            className="item simple"
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
              expandIcon={<FaChevronDown color="#808080" />}
            >
              {item.title}
            </AccordionSummary>
            <AccordionDetails>
              {item.items.map((dropdownitem) => (
                <NavItem
                  item={dropdownitem}
                  lang={lang}
                  key={dropdownitem.url}
                  id="dropdownItemA"
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ) : item.title === 'Home' ? (
          ''
        ) : (
          <NavItem item={item} lang={lang} key={item.url} />
        ),
      )}
    </>
  );
};

export default AccordionItems;

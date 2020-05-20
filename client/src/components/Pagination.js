import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = props => {
  const pageLinks = [];

  for(let i = 1; i < props.pages + 1; i++) {
    let active = props.currentPage === i ? 'active' : '';
    
    pageLinks.push(<li className={`page-item ${active}`} key={i} onClick={() => props.updatePage(i)}><Link to="/" className="page-link" >{i}</Link></li>);
  }

  return (
    <nav aria-label="Post navigation pages">
      <ul className="pagination justify-content-center">
        { pageLinks }
      </ul>
    </nav>
  );
};

export default Pagination;
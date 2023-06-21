import React from 'react'
import '../styles/components_styles/navbar.css'

function Navbar(props) {
  function clickSearch() {
    document.querySelector('#search').classList.toggle('active');
  }
  // Nav sticky function
  window.addEventListener('scroll', () => {
    let nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 0);
  });
  return (
    <nav>
      <button className='btnHamb'>
        <i className='bx bx-menu'></i>
      </button>
      <div className="logo">
        <h4>React Movies</h4>
      </div>
      <div className="rightContent">
        <ul className="nav-links">
          <li className="nav-link"><a href="#">Accueil</a></li>
          <li className="nav-link"><a href="#">Films</a></li>
          <li className="nav-link"><a href="#">Series</a></li>
          <li className="nav-link"><a href="#">A Propos</a></li>
        </ul>
        <button onClick={clickSearch}>
              <i className='bx bx-search'></i>
        </button>
      </div>
      
      <input type="text" name="search" id="search" placeholder="ex: Avengers" value={props.searchValue} onChange={(e) => props.setSearchValue(e.target.value)} />
    </nav>
  )
}

export default Navbar
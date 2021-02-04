import React, { useEffect, useState } from 'react'; 
import ReactPaginate from 'react-paginate'; 
import './App.css'; 
import ListItem from './ListItem';

const PER_PAGE = 10; 

function App() {
  const [items, setItems] = useState([]); 
  const [isLoaded, setIsLoaded] = useState(false); 
  const [error, setError] = useState(null); 

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const username = 'walmartlabs'; 
    const repos = 'thorax';
    fetch(`https://api.github.com/repos/${username}/${repos}/issues`)
      .then(res => res.json()) 
      .then(
        (result) => {
          setIsLoaded(true); 
          setItems(result); 
        }, 
        (error) => {
          setIsLoaded(true); 
          setError(error); 
        }
      )
  }, []); 

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  // pagination 
  const offset = currentPage * PER_PAGE; 
  const currentPageData = items.slice(offset, offset + PER_PAGE);
  
  const pageCount = Math.ceil(items.length / PER_PAGE); 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    const total = items.length; 
    console.log(currentPageData)
    return (
      <div>
        <h1>Github Issues</h1>
        <p>There are {total} issues. </p>

        <div>
        {
          currentPageData.map(item => <ListItem data={item}/>)
        }
        </div>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        
      </div>
    );
  }
}

export default App;

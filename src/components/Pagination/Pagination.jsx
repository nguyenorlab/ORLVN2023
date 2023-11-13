import React, {useState} from 'react';
import styled from 'styled-components';


const PageNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNumber = styled.button`
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 5px;
  border-radius: 5px;
  transition: all 0.5s ease-out;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 94, 141);
    color: white;
  }

  &.active {
    background-color: rgb(0, 94, 141);
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #cccccc;
    color: #666666;
  }

  &:disabled:hover {
    background-color: #cccccc;
    color: #666666;
  }

`;

const Dot = styled.p`
  color: rgb(140, 146, 151);
`;



const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const [startPage, setStartPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNext = () => {
    if (startPage + 1 <= pageNumbers.length) {
      setStartPage(startPage + 1);
      paginate(startPage + 1);
    }
  };

  const handlePrev = () => {
    if (startPage > 1) {
      setStartPage(startPage - 1);
      paginate(startPage - 1);
    }
  };


  return (
    <PageNumberContainer>
      <PageNumber onClick={handlePrev} disabled={startPage === 1}>
        Prev
      </PageNumber>

      {pageNumbers.slice(startPage - 1, startPage + 1).map(number => (
        <PageNumber 
          key={number} 
          onClick={() => paginate(number)} 
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </PageNumber>
      ))}
      {startPage + 1 < pageNumbers.length && <Dot>...</Dot>}

      <PageNumber 
        onClick={handleNext} 
        disabled={startPage + 1 >= pageNumbers.length}
      >
        Next
      </PageNumber>
    </PageNumberContainer>
  );
};

export default Pagination;

import React from 'react';

interface Props {
  numPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const PaginationTag: React.FC<Props> = (props) => {
  const { numPage, setCurrentPage, currentPage } = props;
  return (
    <li onClick={() => setCurrentPage(numPage)}>
      <div
        aria-current='page'
        className={
          'paging-tag py-1 ' +
          (numPage === currentPage ? 'bg-[#1577D2] text-white' : '')
        }
      >
        {numPage}
      </div>
    </li>
  );
};

export default PaginationTag;

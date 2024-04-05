import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import EachProduct from "./EachProduct";

const RightSideContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.lightGray};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  background-color: ${COLORS.gray};
  color: ${COLORS.white};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};

  &:hover {
    text-decoration: underline;
  }
`;

const RightSide = ({
  setDataInfo,
  currentPage,
  setCurrentPage,
  setPrevPage,
  data,
}) => {
  const handleNextPage = () => {
    if (data?.count / 20 > currentPage) {
      setDataInfo(data);
      setPrevPage(currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setDataInfo(data);
      setPrevPage(currentPage);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0) {
      setDataInfo(data);
      setPrevPage(currentPage);
      setCurrentPage(pageNumber);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(data?.count / 20);
  // Generate an array of page numbers
  let pageNumbers = [];
  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage <= 2) {
      pageNumbers = [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
    }
    if (currentPage > 2 && currentPage < totalPages - 1) {
      pageNumbers.unshift(1, "...");
      pageNumbers.push("...", totalPages);
    }
  }

  return (
    <RightSideContainer>
      <div>
        <p>
          Showing {(currentPage - 1) * 20 + 1}-
          {currentPage * 20 < data.count ? currentPage * 20 : data?.count} of{" "}
          {data?.count} results
        </p>
      </div>
      <ProductList>
        {data?.results.map((product, index) => (
          <EachProduct key={index} product={product} />
        ))}
      </ProductList>
      <PaginationContainer>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </PaginationButton>
        {pageNumbers.map((pageNumber, index) => (
          <PageNumber
            key={index}
            active={pageNumber === currentPage}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </PageNumber>
        ))}
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </PaginationButton>
      </PaginationContainer>
    </RightSideContainer>
  );
};

export default RightSide;

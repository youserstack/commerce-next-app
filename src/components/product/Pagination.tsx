import { styled } from "styled-components";

export default function Pagination({ pageCount, page, onPaginate }: any) {
  const pageNumbers = Array(pageCount)
    .fill(undefined)
    .map((v, i) => i + 1);

  const handleClickLeft = (e: any) => {
    e.preventDefault();
    if (page === 1) return;
    onPaginate(page - 1);
  };

  const handleClickLeftEnd = (e: any) => {
    e.preventDefault();
    onPaginate(1);
  };

  const handleClickRight = (e: any) => {
    e.preventDefault();
    if (page === pageCount) return;
    onPaginate(page + 1);
  };

  const handleClickRightEnd = (e: any) => {
    e.preventDefault();
    onPaginate(pageCount);
  };

  if (!pageCount) return null;
  return (
    <Box className="pagination box">
      <ul className="left">
        <li>
          <button onClick={handleClickLeftEnd} disabled={page === 1}>
            {"<<"}
          </button>
        </li>
        <li>
          <button onClick={handleClickLeft} disabled={page === 1}>
            {"<"}
          </button>
        </li>
      </ul>
      <ul className="center">
        {pageNumbers?.map((pageNumber: any) => (
          <li key={pageNumber} className={pageNumber === page ? "current-page" : ""}>
            <button onClick={() => onPaginate(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
      <ul className="right">
        <li>
          <button onClick={handleClickRight} disabled={page === pageCount}>
            {">"}
          </button>
        </li>
        <li>
          <button onClick={handleClickRightEnd} disabled={page === pageCount}>
            {">>"}
          </button>
        </li>
      </ul>
    </Box>
  );
}

const Box = styled.div`
  width: fit-content;
  place-self: center;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 10px;
  overflow: hidden;

  ul {
    display: flex;

    li {
      button {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          color: #fff;
        }
        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }

  .center {
    .current-page {
      button {
        background-color: #ff9800;
      }
    }
  }

  button {
    background-color: transparent;
  }
`;

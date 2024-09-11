/*
  Pagination
  - explore how to paginate
  - access meta
  - display next, prev and page buttons
  - add page value to query params


*****************************

  Step 1: meta.pagination
    -> {page: 2, pageSize: 10, pageCount: 3, total: 22}

  Step 2: generate pages 
    -> const pages = Array.from({ length: pageCount }, (_, index) => {
          return index + 1
        }) 
    -> [1, 2, 3]
    -> from this array -> we will render the pagination component

  Step 3: useLocation() -> get <pathname> + <search>
    -> {pathname: '/products', search: '?page=2', hash: '', state: null, key: 'kp04cmhb'}

  Step 4: click on the page number -> useNavigate
    -> navigate(pathname?search)
    -> navigate(/products?page=2)


*/

import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { pageCount, page } = meta.pagination // {page: 2, pageSize: 10, pageCount: 3, total: 22}

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  }) // [1, 2, 3]

  const { search, pathname } = useLocation() // search=?page=2, pathname=/products
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if (pageCount < 2) return null

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => handlePageChange(pageNumber)}
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer

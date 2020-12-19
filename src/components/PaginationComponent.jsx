import React from 'react'

const PaginationComponent = (props) => {
    const {number, handlePageNumber} = props
    return (
        <li onClick={handlePageNumber} id={number} className="page-item page-link">
            {number}
        </li>
    )
}

export default PaginationComponent

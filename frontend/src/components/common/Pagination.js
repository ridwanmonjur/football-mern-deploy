import { MDBBtn } from 'mdbreact'
import QueryString from 'query-string';
export const Pagination = ({
    totalPages, page, hasPrevPage, hasNextPage, setQuery, limit
}) => {
    const editPage = (value) => {
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            searchParamObject['page'] = value;
            return QueryString.stringify(searchParamObject);
        })
    }
    const editLimit = (event) => {
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            searchParamObject['page'] = 1;
            searchParamObject['limit'] = event.target.value;
            return QueryString.stringify(searchParamObject);
        })
    }
    totalPages = Number(totalPages);
    page = Number(page);
    return (
        <div className='row mb-4'>
            <div className='col-lg-2'></div>
            <div className='col-lg-1 col-12 mr-4 mb-4'>
                <select defaultValue={limit} className="form-control font-larger" style={{ width: "100px" }} onChange={(evt) => { editLimit(evt) }} name="limit">
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div className='col-lg-3 col-12 mr-4 mb-4'>Page {page} of {totalPages}</div>
            <div className="col-lg-3 col-md-6 col-6btn-sm -ml-2 mb-4 mt-only-largescreen">
                <div className='btn-group'>
                    <button
                        color=''
                        {...(hasPrevPage === true ? {} : { disabled: true })}
                        className='btn btn-outline-warning btn-sm font-larger pagination-button text-white'
                        onClick={() => editPage(page - 1)}
                    >
                        {'<<'}
                    </button>
                    {
                        totalPages <= 5 &&
                        <>
                            {[1, 2, 3, 4, 5].map((value) => {
                                return (<>
                                    {totalPages >= value &&
                                        <button
                                            color=''
                                            className={`btn btn-sm text-white font-weight-bold font-larger pagination-button ${value === page ? 'btn-warning' : 'btn-outline-warning'}`}
                                            //   classNames={`btn-sm btn-outline btn-primary ${value === page ? 'btn-active' : ''}`}
                                            onClick={() => editPage(value)}
                                        >{value}
                                        </button>}

                                </>)
                            })}
                        </>
                    }
                    {
                        totalPages > 5 &&
                        <>
                            {[1, 2, 3, totalPages - 2, totalPages - 1, totalPages].map((value) => {
                                return (<>
                                    {(
                                        // 1,2,3
                                        totalPages >= value ||
                                        // page-1, page, page+1
                                        (value > 3)) &&
                                        <button
                                            color=''
                                            className={`btn btn-sm text-white font-weight-bold font-larger pagination-button ${value === page ? 'btn-warning' : 'btn-outline-warning'}`}
                                            onClick={() => editPage(value)}
                                        >{value}
                                        </button>}

                                </>)
                            })}
                        </>
                    }
                    <button
                        color=''
                        {...(hasNextPage === true ? {} : { disabled: true })}
                        className={`btn btn-sm btn-outline-warning text-white font-weight-bold font-larger pagination-button `}
                        onClick={() => editPage(page + 1)}
                    >
                        {'>>'}
                    </button>
                </div>
            </div >
        </div>
    )
}

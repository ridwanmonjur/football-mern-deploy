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
        <div className='padding-20vw d-flex align-items-center justify-content-start mb-4'>
            <div className='mt-n4 mr-4'>
                <select defaultValue={limit} className="form-control font-larger" style={{ width: "100px" }} onChange={(evt) => { editLimit(evt) }} name="limit">
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div className='mt-n4 mr-4'>Page {page} of {totalPages}</div>
            <div className="btn-group btn-sm -ml-2 mb-4">
                <MDBBtn
                    color=''
                    {...(hasPrevPage === true ? {} : { disabled: true })}
                    className='btn btn-outline-warning btn-sm font-larger text-white'
                    onClick={() => editPage(page - 1)}
                >
                    {'<<'}
                </MDBBtn>
                {
                    totalPages <= 5 &&
                    <>
                        {[1, 2, 3, 4, 5].map((value) => {
                            return (<>
                                {totalPages >= value &&
                                    <MDBBtn
                                        color=''
                                        className={`btn btn-sm text-white font-weight-bold font-larger ${value === page ? 'btn-warning' : 'btn-outline-warning'}`}
                                        //   classNames={`btn-sm btn-outline btn-primary ${value === page ? 'btn-active' : ''}`}
                                        onClick={() => editPage(value)}
                                    >{value}
                                    </MDBBtn>}

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
                                    <MDBBtn
                                        color=''
                                        className={`btn btn-sm text-white font-weight-bold font-larger ${value === page ? 'btn-warning' : 'btn-outline-warning'}`}

                                        //   classNames={`btn-sm btn-outline btn-primary ${value === page ? 'btn-active' : ''}`}
                                        onClick={() => editPage(value)}
                                    >{value}
                                    </MDBBtn>}

                            </>)
                        })}
                    </>
                }
                <MDBBtn
                    color=''
                    {...(hasNextPage === true ? {} : { disabled: true })}
                    className={`btn btn-sm btn-outline-warning text-white font-weight-bold font-larger`}
                    onClick={() => editPage(page + 1)}
                >
                    {'>>'}
                </MDBBtn>
            </div >
        </div>
    )
}

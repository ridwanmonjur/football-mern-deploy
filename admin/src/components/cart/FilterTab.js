import QueryString from "qs"

export const FilterTab = ({ setQuery }) => {
    const setPage = (value) => {
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            searchParamObject.status = value;
            if ('page' in searchParamObject) delete searchParamObject['page']
            if (value == 'all') delete searchParamObject['status']
            return QueryString.stringify(searchParamObject)
        })
    }
    return (
        <div className="-mt-1">
            <div className="tabs ml-4">
                {['active', 'paid', 'delivered', 'all'].map((value, index) => {
                    return (
                        <a className="tab tab-lifted" key={`${value}${index}`}
                            onClick={(event) => { setPage(value, event) }}>
                            {value}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
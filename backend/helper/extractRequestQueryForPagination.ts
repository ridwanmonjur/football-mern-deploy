export const extractRequestQueryForPagination = (search: any) => {
    console.log({ search })
    const json = JSON.stringify(search)
    console.log({ json })
    const queryStr = json.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    const parse = JSON.parse(queryStr);
    let { sort, populate, select, page, limit, ...rest } = parse
    sort ??= "_id";
    page = (page == undefined) ? 1 : Number(page);
    // offset= (offset==undefined)? 0: Number(offset);
    limit = (limit == undefined) ? 10 : Number(limit);
    const query = { ...rest }
    const options = {
        sort, select, page, limit, populate,
        collation: {
            locale: 'en',
            numericOrdering: true
        },
    };
    if (select == undefined) delete options.select;
    if (populate == undefined) delete options.populate;
    return { query, options }
}
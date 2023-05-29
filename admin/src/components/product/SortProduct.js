import { useForm } from "react-hook-form";
import { ButtonPanel, Select } from "../sharing/form"
import { useEffect, useRef } from "react";
import QueryString from "qs";

export const SortProduct = ({ setQuery }) => {
    const { handleSubmit } = useForm();
    const formRef = useRef(null)
    const onSubmit = (data, event) => {
        event.preventDefault()
        data = {
            sort: document.getElementById('sort').value,
            order: document.getElementById('order').value
        }
        if (data?.sort == "seller") {
            const populate = {
                path: "seller",
                select: "_id name",
                options: {
                    sort: { name: data.order },
                    collation: {
                        locale: 'en',
                        numericOrdering: true
                    },
                }
            }
            setQuery((oldQuery) => {
                const searchParamObject = QueryString.parse(oldQuery)
                if ('page' in searchParamObject) delete searchParamObject?.page;
                if ('sort' in searchParamObject) delete searchParamObject?.sort;
                searchParamObject.populate = populate
                return QueryString.stringify(searchParamObject)
            })
        }
        else {
            setQuery((oldQuery) => {
                const searchParamObject = QueryString.parse(oldQuery)
                if ('page' in searchParamObject) delete searchParamObject?.page;
                if ('populate' in searchParamObject) delete searchParamObject?.populate;
                searchParamObject.sort = {
                    [data?.sort]: data?.order,
                }
                return QueryString.stringify(searchParamObject)
            })
        }
    }
    useEffect(() => {
        document.getElementById('sort').value = 'name'
        document.getElementById('order').value = 1;
    }, [])
    return (
        <form formRef={formRef} className="flex flex-nowrap" onSubmit={handleSubmit(onSubmit)}>
            <Select
                id="sort"
                defaultValue="name"
                classNames="mr-4"
                optionNames={["Name",
                    // "Manufacturer", 
                    "Type", "Price", "Stock", "Seller"]}
                optionValues={["name",
                    // "manufacturer", 
                    "type", "price", "stock", "seller"]}
            />
            <Select
                id="order"
                classNames="mr-4"
                defaultValue={1}
                optionNames={["Asc  ", "Desc  "]}
                optionValues={[1, -1]}
            />
            <ButtonPanel type="submit" classNames="mt-1">Sort</ButtonPanel>
        </form>
    )
}
export const Table = ({
    tableHeading,
    classNames,
    render
})=>{
    return (
        <table className={`table table-zebra w-full ${classNames!==undefined ? classNames : ""}`}>
            <thead>
            <tr>
                <th></th>
                {tableHeading.map((value, index) => (
                    <>
                     <th>{value}</th>
                     </>
            ))}

                    </tr>
            </thead>
            <tbody>
            {
                render()
            }
            </tbody>
        </table>
    )
}
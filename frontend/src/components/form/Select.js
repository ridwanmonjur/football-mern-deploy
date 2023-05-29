export const Select = ({
    classNames,
    optionValues,
    optionNames,
    ...props
}) => {
    return (
        <select
            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg`
                
                + `${classNames !== undefined ? classNames : ""}`}
            {...props}
        >
            <option disabled value="no-value"></option>
            {optionValues.map((value, index) =>
                (<>
                    <option value={value}> {optionNames[index]} </option>
                </>))}
        </select>
    )
}
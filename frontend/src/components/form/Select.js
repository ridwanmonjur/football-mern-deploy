export const Select = ({
    classNames,
    optionValues,
    optionNames,
    ...props
}) => {
    return (
        <select
            className={`font-larger bg-white border-light form-select form-select-lg`
                
                + `${classNames !== undefined ? classNames : ""}`}
            {...props}
        >
            <option value="no-value"></option>
            {optionValues.map((value, index) =>
                (<>
                    <option value={value}> {optionNames[index]} </option>
                </>))}
        </select>
    )
}
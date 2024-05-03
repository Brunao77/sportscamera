export default function Select({ placeholder, option, onChange, disabled }) {
    return (
        <>
            <select required disabled={disabled} onChange={onChange} value={option.value} class="border border-primary disabled:border-gray-200 border-2 w-full outline-none cursor-pointer rounded-lg p-2 focus:ring-primary focus:border-primary overflow-y-scroll">
                <option hidden value=''>{placeholder}</option>
                {option.options && option.options.map(({value, text})=>{
                    return <option value={value}>{text}</option>
                })}
            </select>
        </>
    )
}

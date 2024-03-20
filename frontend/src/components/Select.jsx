export default function Select({placeholder, options, disabled, id}) {
    console.log({options})
  
    return (
        <>
            <div>
                <slot />
                <select disabled={disabled} id={id}>
                    <option hidden>{placeholder}</option>
                    {options && options.map(({value, text})=>{
                        return <option value={value}>{text}</option>
                    })}
                </select>
            </div>
        </>
    )
  }
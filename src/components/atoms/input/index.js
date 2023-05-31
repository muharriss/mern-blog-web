import react from 'react'
import './input.css'

const Input = ({label, ...rest}) => {
    return (
        <div className='input-wrapper'>
            <p className='label' >{label}</p>
            <input {...rest}  className='input' />
        </div>
    )
}

export default Input
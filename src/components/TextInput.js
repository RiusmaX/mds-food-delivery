import './styles/TextInput.css'

function TextInput (props) {
  return (
    <label className='label'>
      {props.label}
      <input
        {...props}
        value={props.value}
        onChange={props.onChange}
        className='input'
      />
    </label>
  )
}

export default TextInput

import React, { memo, ChangeEvent } from 'react'

interface Props{
    title: string;
    text: string;
    onChange: (event: ChangeEvent<HTMLInputElement>)=>void;
}
console.log("renderd PrimaryInput")

const PrimaryInput = memo((props: Props) => {
    const {title, text, onChange}=props

  return (
    <input
    className="mb-3 px-3 py-2 border border-gray-300"
    type="text"
    placeholder={title}
    value={text}
    onChange={onChange}
  />

)
})

export default PrimaryInput

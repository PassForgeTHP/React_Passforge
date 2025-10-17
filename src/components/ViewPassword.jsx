import { useState } from "react";
import { Icon } from "@iconify/react";

export default function ViewPassword({value, onChange, placeholder}){
  const [showPwd, setShowPwd]=useState(false)
  return (<div className="password-hide-view">
    <input 
    type={showPwd? 'text' : 'password'}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className='password-input'
    />
    <button
    type="button"
    className="view-hide-pwd"
    onClick={()=>setShowPwd(!showPwd)}
    >
      {showPwd? (
                  <Icon icon="mdi:eye-outline" width="20" />
                ) : (
                  <Icon icon="mdi:eye-off-outline" width="20"/>
                )}
    </button>
  </div>)
}
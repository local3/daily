import React, { useState } from 'react'
// import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
 
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <h1>パスワードの変更</h1>

        <br/>
        
        <label>メールアドレス：</label>
        <input type="text"
          name="email"
          onChange={handleChangeEmail}
        />

        <br/>

        <button type="submit">送信する</button>
      </form>
    </>
  )
}
export default ForgotPassword;
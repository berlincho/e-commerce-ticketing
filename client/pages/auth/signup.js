import { useState } from 'react';
import Router from 'next/router';
import useReqest from '../../hooks/use-request';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useReqest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/')
  });
  
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      { errors }
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}
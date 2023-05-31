import React, { useState, Fragment } from 'react';
import { LoginBg } from '../../assets';
import { Button, Gap, Header, Input, Footer, LinkTo } from '../../components';
import { BrowserRouter as Router, Link, Route, Routes, redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('https://mern-blog-api.cyclic.app/v1/auth/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                console.log('login success', res)
                alert('login success')
                window.location.replace('/blog')
            })
            .catch(err => {
                console.log('error', err)
                if (username === '' && password === '') {
                    alert('username dan password tidak sesuai')
                } else if (username === '') {
                    alert('username tidak sesuai')
                } else if (password === '') {
                    alert('password tidak sesuai')
                } else {
                    alert(err.response.data.message)
                }
            })
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='left'>
                    <img className='bg-img' src={LoginBg} />
                </div>
                <div className='right'>
                    <div className='wrapper-register' >
                        <p className='title'>Login</p>
                        <Gap height={10} />
                        <Input label={'Username'} placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                        <Gap height={10} />
                        <Input type="Password" label={'Password'} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                        <Gap height={20} />
                        <Button title={'Login'} onClick={onSubmit} />
                        <Gap height={250} />
                        <Link to="/blog/register">
                            <LinkTo title='Belum Punya Akun?' title2=' Silahkan Daftar!' />
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
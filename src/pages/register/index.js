import React, { useEffect, useState } from 'react';
import './register.css'
import { RegisterBg } from '../../assets';
import { Button, Gap, Header, Input, LinkTo, Footer } from '../../components';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        setLoading(true);
        const data = {
            username: username,
            password: password
        }
        axios.post('https://mern-blog-api-server.vercel.app/v1/auth/register', data)
            .then(res => {
                console.log('register success', res)
                alert('register success')
                window.location.replace('/blog/login')
            })
            .catch(err => {
                console.log('error', err)
                if (username === '' && password === '') {
                    alert('username dan password tidak boleh kosong')
                } else if (username === '') {
                    alert('username tidak boleh kosong')
                } else if (password === '') {
                    alert('password tidak boleh kosong')
                } else {
                    alert(err.response.data.message)
                }
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <div>
            <div className={loading ? 'edit-component' : 'edit-component2'}></div>
            <Header />
            <div className='container' >
                <div className='left'>
                    <img className='bg-img' src={RegisterBg} />
                </div>
                <div className='right'>
                    <div className='wrapper-register' >
                        <p className='title'>Register</p>
                        <Gap height={10} />
                        <Input label={'Username'} placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                        <Gap height={10} />
                        <Input type="Password" label={'Password'} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                        <Gap height={20} />
                        <Button title={'Register'} onClick={onSubmit} />
                        <Gap height={250} />
                        <Link to='/blog/login'>
                            <LinkTo title='Kembali ke' title2=" Login." />
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register;

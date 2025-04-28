// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../services/auth';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBRow,
//     MDBCol,
//     MDBInput,
//     MDBCheckbox
// } from 'mdb-react-ui-kit';

// const SignUp = () => {
//     const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await registerUser(formData);
//             localStorage.setItem('user', JSON.stringify(formData));
//             navigate('/login');
//         } catch (error) {
//             console.error('Register Failed:', error.response?.data?.message || 'An error occurred');
//         }
//     };

//     return (
//         <>
//             <MDBContainer className='my-5'>
//             <MDBCard>

//                 <MDBRow className='g-0 d-flex align-items-center'>

//                 <MDBCol md='4'>
//                     <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
//                 </MDBCol>

//                 <MDBCol md='8'>

//                     <MDBCardBody>

//                     <MDBInput wrapperClass='mb-3' label='Username' id='form1' type='text'/>
//                     <MDBInput wrapperClass='mb-3' label='Email address' id='form1' type='email'/>
//                     <MDBInput wrapperClass='mb-3' label='Password' id='form2' type='password'/>

//                     <div className="d-flex justify-content-between mx-4 mb-4">
//                         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
//                         <a href="!#">Forgot password?</a>
//                     </div>

//                     <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

//                     </MDBCardBody>

//                 </MDBCol>

//                 </MDBRow>

//             </MDBCard>
//             </MDBContainer>
//         </>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await registerUser(formData);
            localStorage.setItem('token', response.data.token);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className="g-0 d-flex align-items-center">
                    <MDBCol md="4">
                        <MDBCardImage src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Signup" className="rounded-t-5 rounded-tr-lg-0" fluid />
                    </MDBCol>

                    <MDBCol md="8">
                        <MDBCardBody>
                            <form onSubmit={handleSubmit}>
                                <MDBInput
                                    wrapperClass="mb-3"
                                    label="Username"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <MDBInput
                                    wrapperClass="mb-3"
                                    label="Email address"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <MDBInput
                                    wrapperClass="mb-3"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="d-flex justify-content-between mx-4 mb-4">
                                    <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me" />
                                    <a href="/forgot-password">Forgot password?</a>
                                </div>

                                {error && <p className="text-danger">{error}</p>}

                                <MDBBtn type="submit" className="mb-4 w-100">
                                    Sign Up
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
};

export default SignUp;

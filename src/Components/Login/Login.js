import { Formik } from 'formik'
import { useContext, useEffect } from 'react';
import { Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContext';
import { postData } from '../../data/postData';


const schema = Yup.object().shape({
    email: Yup.string().email('El correo electrónico es inválido').required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
})

export const Login = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    const { push } = useHistory()

    useEffect(()=> {
        if (currentUser) {
            push('/')
        }
    }, [currentUser])

    return (
        <div className="container">
            <h2 className="text-center title3 my-4">Inicia sesión para acceder</h2>
            <Formik
                validationSchema={schema}
                validateOnBlur
                onSubmit={values => {
                    setCurrentUser(false)
                    postData(values.email, values.password)
                        .then((res)=> {
                        console.log(res)
                        setCurrentUser(true) 
                        push('/')
                        })
                        .catch((err)=>{
                        console.log(err)
                        })
                        .finally(()=> setCurrentUser(true)) //aqui se pasa al curretUser a "true" para simular el login, mientras la respuesta del request post no sea exitosa
                }}
                initialValues={{
                    email: '',
                    password: ''
                }}
            > 
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} className="login">
                    
                        <Form.Group as={Col} md="12" controlId="validationFormik02">
                        <Form.Label className="blueDianneText label bodyText--small">Email</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className="input"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                isInvalid={touched.email && errors.email}
                            />

                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationFormik02">
                        <Form.Label className="blueDianneText bodyText--small label">Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className="input"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                isInvalid={touched.password && errors.password}
                            />

                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>

                    <Form.Group as={Col} md="12">
                        <Button 
                        type="submit" 
                        className="button">Iniciar sesión</Button>
                    </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import CustomTextField from '../../form/CustomTextField';

const initialValues = {
  matricula: '000043',
  senha: '571930',
};

const formSchema = Yup.object().shape({
  matricula: Yup.string()
    .required('Obrigatório'),
  senha: Yup.string()
    .required('Obrigatório'),
});

const LoginForm = ({ onSubmit, isLoading }) => (
  <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <Form style={{ display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
        <div>
          <Field
            name="matricula"
            component={CustomTextField}
            label="Matricula"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <Field
            name="senha"
            component={CustomTextField}
            label="Senha"
            type="password"
          />
        </div>
        <Button onClick={handleSubmit} style={{ marginTop: 15 }} color="primary" variant="contained">Entrar</Button>

      </Form>
    )}
  </Formik>
);

export default LoginForm;

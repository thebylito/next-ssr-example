import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, CircularProgress } from '@material-ui/core';
import CustomTextField from 'components/form/CustomTextField';

const initialValues = {
  cpf: '',
};

const formSchema = Yup.object().shape({
  cpf: Yup.string().required('Obrigatório'),
});

const RecuperarSenhaForm1 = ({ onSubmit, isLoading }) => (
  <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <Form style={{ display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
        <div>
          <Field name="cpf" component={CustomTextField} label="Insira seu CPF" />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          style={{ marginTop: 15, minHeight: 36 }}
          color="primary"
          variant="contained"
        >
          {isLoading ? <CircularProgress size={22} color="secondary" /> : 'Próximo'}
        </Button>
      </Form>
    )}
  </Formik>
);

export default RecuperarSenhaForm1;

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, CircularProgress, Box } from '@material-ui/core';
import CustomTextField from 'components/form/CustomTextField';

const initialValues = {
  matricula: '',
  senha: '',
  confirmacaoDaSenha: '',
};

const formSchema = Yup.object().shape({
  matricula: Yup.string().required('Obrigatório'),
  senha: Yup.string().required('Obrigatório'),
  confirmacaoDaSenha: Yup.string().required('Obrigatório'),
});

const RecuperarSenhaForm2 = ({ onSubmit, isLoading }) => (
  <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <Form style={{ display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
        <div>
          <Field name="matricula" component={CustomTextField} label="Matrícula" />
        </div>
        <Box marginTop={1}>
          <Field name="senha" component={CustomTextField} label="Senha" type="password" />
        </Box>
        <Box marginTop={1}>
          <Field
            name="confirmacaoDaSenha"
            component={CustomTextField}
            label="Confirmação da senha"
            type="password"
          />
        </Box>
        <Button
          type="submit"
          onClick={handleSubmit}
          style={{ marginTop: 15, minHeight: 36 }}
          color="primary"
          variant="contained"
        >
          {isLoading ? <CircularProgress size={22} color="secondary" /> : 'Finalizar'}
        </Button>
      </Form>
    )}
  </Formik>
);

export default RecuperarSenhaForm2;

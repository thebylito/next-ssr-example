import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Card,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@material-ui/core';
import Head from 'components/head';
import SanesulLogo from 'components/SanesulLogo';
import withRedux from 'lib/redux';
import { makeStyles } from '@material-ui/styles';
import RecuperarSenhaForm1 from 'components/pages/recuperarSenha/Form1';
import {
  Creators as ChecarCpfCreators,
  type ChecarCpfStore,
} from 'appStore/ducks/redefinirSenha/checarCpf';
import RecuperarSenhaForm2 from 'components/pages/recuperarSenha/Form2';
import {
  Creators as RedefinirSenhaCreators,
  type RedefinirSenhaStore,
} from 'appStore/ducks/redefinirSenha/redefinirSenha';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  resetForm: {
    padding: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '23vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '30vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

function getSteps() {
  return ['Encontrar conta', 'Definir nova senha'];
}

function RecuperarSenha() {
  const [cpf, setCpf] = React.useState('');
  const checarCpfStore: ChecarCpfStore = useSelector(state => state.redefinirSenha.checarCpf);
  const redefinirSenhaStore: RedefinirSenhaStore = useSelector(
    state => state.redefinirSenha.redefinirSenha
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const onForm1Submit = ({ cpf }) => {
    setCpf(cpf);
    dispatch(ChecarCpfCreators.getCpfExistsRequest(cpf));
  };

  const onForm2Submit = ({ matricula, senha }) => {
    dispatch(RedefinirSenhaCreators.getRedefinirSenhaRequest({ matricula, senha, cpf }));
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <RecuperarSenhaForm1 isLoading={checarCpfStore.loading} onSubmit={onForm1Submit} />;
      case 1:
        return (
          <RecuperarSenhaForm2 isLoading={redefinirSenhaStore.loading} onSubmit={onForm2Submit} />
        );
      default:
        return 'Unknown step';
    }
  }

  React.useEffect(() => {
    if (!checarCpfStore.loading) {
      if (checarCpfStore.valido) {
        handleNext();
      }
    }
  }, [checarCpfStore.loading, checarCpfStore.valido]);

  return (
    <>
      <Head title="Recuperar senha - Meu RH" />
      <main className={classes.root}>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#1f96b7',
            background: 'linear-gradient(to bottom, #86BBD8, #1f96b7, #336699)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundSize: 'cover',
            minHeight: '100%',
            zIndex: -1,
          }}
        >
          <Box className={classes.container}>
            <Box className={classes.logoContainer}>
              <SanesulLogo width={109} height={150} />
              <Typography style={{ color: 'white' }} variant="h5" color="primary">
                Meu RH
              </Typography>
              <Typography style={{ color: 'white' }} variant="h6" color="primary">
                Recuperar senha
              </Typography>
            </Box>
            <Card className={classes.resetForm}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>{getStepContent(index)}</StepContent>
                  </Step>
                ))}
              </Stepper>
            </Card>
            <Box marginTop={2}>
              <Link href="/">
                <Button color="secondary">Voltar para a página de Login</Button>
              </Link>
            </Box>
          </Box>
        </div>
      </main>
    </>
  );
}

export default withRedux(RecuperarSenha);

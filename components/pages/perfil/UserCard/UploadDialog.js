import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import UserAvatar from 'components/pages/dashboard/UserAvatar';
import { Creators } from 'appStore/ducks/perfil/avatar';
import withRedux from 'lib/redux';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  uploadContainer: {
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main,
    margin: 10,
    padding: 10,
  },
}));


const mimeTypesAceitos = ['image/png', 'image/jpeg'];


function UploadDialogModal(props) {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const onDrop = React.useCallback(([acceptedFile]) => {
    if (!mimeTypesAceitos.includes(acceptedFile.type)) {
      setFile(null);
      setPreview(null);
      // eslint-disable-next-line
      alert('Arquivo não suportado');
      return;
    }
    setFile(acceptedFile);
    setPreview(URL.createObjectURL(acceptedFile));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const classes = useStyles();
  const { onClose, open, onImageSubmit } = props;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = () => {
    onImageSubmit(file);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {preview && (
        <Box display="flex" justifyContent="center" padding={2}>
          <UserAvatar source={preview} />
        </Box>
      )}
      <Box className={classes.uploadContainer}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DialogTitle>
            <Typography color="primary" variant="h6">
              Solte ou clique aqui para carregar sua imagem
            </Typography>
          </DialogTitle>
        </div>
      </Box>
      <Button onClick={onSubmit} disabled={file === null}>
        Confirmar
      </Button>
    </Dialog>
  );
}

UploadDialogModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function UploadDialog() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onImageSubmit = (file) => {
    dispatch(Creators.getProfileImageUploadRequest(file));
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Typography color="primary" variant="subtitle2">Atualizar foto</Typography>
      </Button>
      <UploadDialogModal open={open} onClose={handleClose} onImageSubmit={onImageSubmit} />
    </div>
  );
}

export default withRedux(UploadDialog);

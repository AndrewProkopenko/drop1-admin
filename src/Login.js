import React from 'react';


import {Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';  
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
    const classes = useStyles();

    let [name, setName] = React.useState('')
    let [password, setPassword] = React.useState('')

    let [isError, setIsError] = React.useState(false)

    //   vice-app-drop-admin-password
    function hendlerSubmit(e) {
        e.preventDefault()
        if(name == 'admin' && password == '1') {
            setToken() 
        }
        else { 
            setIsError(true)
        }
    }
    let [isRedirect, setIsRedirect] = React.useState(false)
    function setToken() {
        let random = Math.random()
        console.log(random)
        localStorage.setItem('vice-app-token', random)
        setIsRedirect(true)
        props.setLogin()
    } 

  return (
    <Container component="main" maxWidth="xs">

        {/* Redirect при авторизации */}
       { isRedirect ? (<Redirect push to="/"/>) : null }

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Вход
        </Typography>
        <form className={classes.form} onSubmit={hendlerSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="User"
            name="user"
            autoComplete={true}
            autoFocus
            value={name}
            onChange={ (e)=>{setName(e.target.value)} }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          {
              isError && 
              <Alert severity="error">Неправильно имя пользователя или пароль</Alert>
          }
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
           
        </form>
      </div>
       
    </Container>
  );
}
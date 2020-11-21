 // Сделать стили внутри компонента
 const useStyles = makeStyles((theme) => ({
    flexDiv: {
      display: 'flex', 
      alignItems: 'center',
      marginTop: '1em', 
    },
    input: {
      display: 'none',
    },
    label: { 
        marginRight: '1em',  
    }
  }));
const classes = useStyles();
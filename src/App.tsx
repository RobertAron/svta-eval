import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, makeStyles, Badge, Container } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons'
import { MattressChooseComponent } from './MattressChoseComponent';
import { useCartContext } from './CartContext';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  mainContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

function App() {
  const classes = useStyles()
  const { items } = useCartContext()
  return (
    <div>
      <AppBar position="static" color='default' elevation={1}>
        <Container maxWidth='lg'>
          <Toolbar className={classes.toolbar} disableGutters>
            <Typography variant="h4" component='h1' color='primary'>
              saatva
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Badge badgeContent={items.length} color="primary" invisible={items.length===0}>
                <ShoppingCartOutlined color='primary'/>
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Container maxWidth='lg' className={classes.mainContainer}>
          <MattressChooseComponent />
        </Container>
      </main>
    </div>
  );
}

export default App;

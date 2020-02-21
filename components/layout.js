import React from "react";
import {
  Container,
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Link from "next/link";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  content: {
    paddingTop: theme.spacing(1)
  }
});
class Layout extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Link href="/">
            <Typography variant="h6" className={classes.title}>
              Trennds CMS
            </Typography>
            </Link>
            <Link href="/admin/create">
              <Button color="inherit">Create</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container className={classes.content}>{this.props.children}</Container>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);

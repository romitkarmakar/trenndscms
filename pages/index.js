import React from 'react'
import { Container, Grid, withStyles, Typography } from "@material-ui/core"

const styles = theme=>({

});

class IndexPage extends React.Component {
  render() {
    const { classes } = this.props;
    return <Container>
      <Grid container spacing={2}>
        <Typography></Typography>
      </Grid>
    </Container>
  }
}

export default withStyles(styles)(IndexPage);
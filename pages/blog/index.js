import React from "react";
import {
  Container,
  Grid,
  withStyles,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia
} from "@material-ui/core";
import axios from "axios";
import Layout from "../../components/layout";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    const res = await axios.get(`${process.env.TRENNDSCMS_BASE_URL}/api/blog`);
    return { blogs: res.data.items };
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Grid container spacing={2} justify="center">
          {this.props.blogs.map(v => (
            <Grid item xs={12} lg={8}>
              <Card>
                <CardHeader title={v.title} />
                {v.image != "" && v.image ? <CardMedia
                  className={classes.media}
                  image={v.image}
                  title={v.title}
                /> : null}
                <CardContent>
                  <Typography>{v.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(BlogPage);

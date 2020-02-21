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

class BlogSlugPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    const { slug } = ctx.query;
    const res = await axios.get(
      `${process.env.TRENNDSCMS_BASE_URL}/api/blog/${slug}`
    );
    return { blog: res.data.item };
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Grid container justify="center">
          <Grid item xs={12} lg={10}>
            <Card>
              <CardHeader title={this.props.blog.title} />
              {this.props.blog.image != "" && this.props.blog.image ? (
                <CardMedia
                  className={classes.media}
                  image={this.props.blog.image}
                  title={this.props.blog.title}
                />
              ) : null}
              <CardContent>
                <Typography>{this.props.blog.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(BlogSlugPage);

import React from "react";
import {
  Container,
  Grid,
  withStyles,
  Typography,
  Card,
  CardContent,
  TextField,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
  CircularProgress
} from "@material-ui/core";
import axios from "axios";
import Layout from "../../components/layout";

const styles = theme => ({
  media: {
    minHeight: 200,
    maxHeight: 300,
    borderRadius: 10
  }
});

class AdminCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      image: "",
      loading: false
    };

    this.createBlog = this.createBlog.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  slugGenerator(s) {
    s = s.trim();
    s = s.toLowerCase();
    s = s.split(" ").join("-");
    return s;
  }

  createBlog() {
    var self = this;
    axios
      .post(`${process.env.TRENNDSCMS_BASE_URL}/api/create`, {
        title: self.state.title,
        content: self.state.content,
        slug: this.slugGenerator(self.state.title),
        image: self.state.image
      })
      .then(res => {
        alert(res.data);
      });
  }

  handleFileChange(files) {
    this.setState({
      loading: true
    });
    var self = this;
    const file = files[0];
    var fileName = file.name;

    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    var requestOptions = {
      method: "POST",
      body: formdata
    };

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        let temp = JSON.parse(result);
        self.setState({
          image: temp.url,
          loading: false
        });
      })
      .catch(error => console.log("error", error));
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <CardHeader title="Create a Blog Post" />
                <TextField
                  fullWidth
                  label="Enter Blog Title"
                  variant="outlined"
                  margin="normal"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                  autoFocus
                />
                <TextField
                  fullWidth
                  label="Enter Blog Content"
                  multiline
                  rows={6}
                  margin="normal"
                  variant="outlined"
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                />
                {this.state.image != "" ? (
                  <CardMedia
                    image={this.state.image}
                    className={classes.media}
                  />
                ) : (
                  <input
                    type="file"
                    onChange={e => this.handleFileChange(e.target.files)}
                  />
                )}
              </CardContent>
              <CardActions>
                {this.state.loading == true ? (
                  <Button variant="outlined" color="primary">
                    <CircularProgress size={24} />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => this.createBlog()}
                  >
                    Create
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(AdminCreatePage);

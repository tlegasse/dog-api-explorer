import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';
import styles from './SubBreed.module.css';

class SubBreed extends React.Component {
  constructor(props) {
      super(props)

      this.state = {image: ''}

      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      
      fetch(baseUrl + "breed/" + this.props.breed + "/" + this.props.subBreed + "/images/random")
        .then(response => response.json())
        .then(data => {
          this.setState({image: data.message})
        })
  }
  render() {
      const wikiLink = "https://en.wikipedia.org/wiki/" + this.props.subBreed + "_" + this.props.breed
      return (
        <>
          <Typography gutterBottom variant="h5" component="h5">
            <Link href={wikiLink} className={styles.subBreedLink} target="_blank">
              <LinkIcon />{this.props.subBreed} {this.props.breed}
            </Link>
          </Typography>
          <CardMedia
              component="img"
              alt={this.props.breed}
              image={this.state.image}
              title={this.props.breed}
            />
        </>
      );
  }
}
  
export default SubBreed;

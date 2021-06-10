import React from "react";
import SubBreed from "./SubBreed";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./Breed.module.css"
import Flickity from 'react-flickity-component'
import Link from '@material-ui/core/Link';

const flickityOptions = {
  groupCells: false
}

class Breed extends React.Component {
  constructor(props) {
    super(props);

    this.subBreedButtonText = {
      closed: 'View Sub Breeds',
      open: 'Hide Sub Breeds'
    }

    this.state = {
      image: '',
      displaySubBreeds: false,
      subBreedButtonText: this.subBreedButtonText.closed
    }

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    
    fetch(baseUrl + "breed/" + this.props.breed.toLowerCase().replace(' ','-') + "/images/random")
      .then(response => response.json())
      .then(data => {
        this.setState({image: data.message})
      })

    this.toggleSubBreeds = this.toggleSubBreeds.bind(this)
  }

  toggleSubBreeds() {
    this.setState(state => ({
      displaySubBreeds: !state.displaySubBreeds,
      subBreedButtonText: !state.displaySubBreeds ? this.subBreedButtonText.open : this.subBreedButtonText.closed
    }))
  }

  render() {
    let displayButton, subBreedContent
    if(this.props.subBreeds.length) {
      displayButton = <Button onClick={this.toggleSubBreeds} variant="contained" color="secondary">{this.state.subBreedButtonText}</Button>
      if(this.state.displaySubBreeds) {
        subBreedContent = <Flickity options={flickityOptions}>
          {
            this.props.subBreeds.map((subBreed, key) => {
              return <div className={styles.subBreedSlide}>
                <SubBreed subBreed={subBreed} breed={this.props.breed} key={key}></SubBreed>
              </div>
            })
          }
        </Flickity>
      }
    }

    return (
      <Card className={styles.breedCard}>
        <Link href={this.state.image} target="_blank">
          <CardMedia
            component="img"
            alt={this.props.breed}
            image={this.state.image}
            title={this.props.breed}
          />
        </Link>
        <CardContent className={styles.buttonArea}>
          <Typography gutterBottom variant="h4" component="h2" className={styles.breedTitle}>{this.props.breed}</Typography>
          {displayButton}
        </CardContent>
        <CardContent>
          {subBreedContent}
        </CardContent>
      </Card>
    );
  }
}

export default Breed;

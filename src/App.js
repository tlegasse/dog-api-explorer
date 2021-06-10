import React from "react";
import Breed from "./Breed"
import Grid from '@material-ui/core/Grid';
import styles from './App.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PetsIcon from '@material-ui/icons/Pets';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dogData: [],
      filter: ''
    }

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(baseUrl + "breeds/list/all")
      .then(response => response.json())
      .then(data => {
        let breedsArr = []
        for(var i in data.message) breedsArr.push([i, data.message[i]]);
        this.setState({
          dogData: breedsArr
        })
      })

    this.updateFilter = this.updateFilter.bind(this)
  }

  updateFilter(event) {
    this.setState(state => ({
      filter: event.target.value.toLowerCase()
    }))
  }

  render() {
    return (
      <div className="App">
        <header>
          <AppBar position="fixed">
            <Toolbar variant="dense" className={styles.toolbar}>
              <Typography variant="h6" color="inherit" className={styles.titleArea}>
                <PetsIcon />Dog API Explorer
              </Typography>
              <div className={styles.searchInputContainer}>
                <div className={styles.magnifyingGlass}>
                  <SearchIcon />
                </div>
                <InputBase
                  className={styles.searchInput}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.updateFilter}
                />
              </div>
            </Toolbar>
          </AppBar>
        </header>
        <Grid container className={styles.cardsContainer}>
          {
            this.state.dogData.map((val,key) => {
              if(val[0].includes(this.state.filter)) {
                return (
                  <Grid container item xs={12} sm={6} md={4}>
                    <Breed breed={val[0]} subBreeds={val[1]} key={key} />
                  </Grid>
                )
              }
            })
          }
        </Grid>
      </div>
    );
  }
}

export default App;

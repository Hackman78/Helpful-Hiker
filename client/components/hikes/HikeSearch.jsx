import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import styles from '../../style/colors';
const {textColor, backgroundColor} = styles;

import HikeResults from './HikeResults.jsx';
import HikeFavList from './HikeFavList.jsx';



const HikeSearch = () => {

  const [input, setInput] = useState('');
  const [results, loadResults] = useState([]);
  const [favHikes, setFavHikes] = useState([]);
  const favHikesRef = useRef(favHikes)
  const [tags, setTags] = useState([]);
  const tagsRef = useRef(tags)

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const searchHikes = () => {

    axios.post('/api/hikeSearch', {
      search: {
        location: input,
      }
    })
      .then((hikeResults) => {
        loadResults(hikeResults.data);
      })
      .catch((err) => {
        console.error('Failed to send post req to server', err);
      })
  }

  const getFavHikes = () => {
    axios.get('/api/hikes')
      .then(({ data }) => {
        setFavHikes(data);
        return axios.get('/api/hikes/tags')
      })
      .then(({data}) => {
        setTags(data);
      })
      .catch((err) => {
        console.error('Failed to get favorite hikes', err)
      })
  }

  useEffect(getFavHikes, [favHikesRef, tagsRef])

  return (
    <div className="hike-search">
      <div className="hike-search-form">
        <TextField
          id="filled-basic"
          variant="filled"
          value={ input }
          onChange={ handleInput }
          type="text"
          placeholder="city, state, or zip"
        />
        <Button variant="contained" sx={backgroundColor} onClick={ searchHikes } type="button">Search</Button>
      </div>

      <div className="hike-search-results">
        <Typography variant="h5" gutterBottom>
          Nearby Results
        </Typography>
        <HikeResults results={ results } getFavHikes={ getFavHikes }/>
      </div>
      
      <div className="hike-favs">
        <Typography variant="h5" gutterBottom>
          Favorite Trails
        </Typography>
        <HikeFavList favHikes={ favHikes } getFavHikes={ getFavHikes } allTags={tags}/>
      </div>
    </div>
  )
}

export default HikeSearch;
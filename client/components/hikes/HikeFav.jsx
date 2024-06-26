import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Card, Typography, Box, IconButton, Menu, MenuItem, Divider, Grid} from '@mui/material';
import Weather from '../Weather.jsx';
import Tag from './Tag.jsx';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HikeRating from './HikeRating.jsx';
import styles from '../../style/colors';
const {textColor, backgroundColor} = styles;

const HikeFav = ({ favHike, getFavHikes, allTags, changeFilter }) => {

  const [newTag, setNewTag] = useState('');
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const { description, id } = favHike;

  const removeFavHike = () => {
    // delete req to the db
    axios.delete('/api/hikes', {
      data: {
        description,
      }
    })
      .then(() => {
        getFavHikes();
      })
      .catch((err) => {
        console.error('Failed to remove favorite hike', err);
      })
  }

  const handleNewRating = (e) => {
    setNewRating(e.target.value);
  }

  const rateFavHike = (newRating) => {
    // patch req to the db
    axios.patch('/api/hikes', {
      hike: {
        description,
        rating: newRating,
      }
    })
      .then(() => {
        getFavHikes();
      })
      .catch((err) => {
        console.error('Failed to change rating', err);
      })
  }

  const deleteTag = (tagID) => {
    axios.delete(`/api/hikes/${id}/tags/${tagID}`)
      .then(getFavHikes)
      .catch((err) => {console.error('Cannot delete tag: ', err)})
  };

  const addTag = (tag) => {
    axios.post(`/api/hikes/${favHike.id}/tags`, {tag})
      .then(getFavHikes)
      .catch((err) => {
        console.error('Could not add tag to hike ', err)
      })
  }

  const handleClick = (e) => {
    setAnchor(e.target);
  };

  const handleClose = () => {
    setAnchor(null)
  }

  const handleInput = (e) => {
    setNewTag(e.target.value);
  }

  return (
     <Grid item xs={3}>
      <Card variant='outlined' sx={{ borderColor: 'black', maxWidth: 650}}>
      <Box sx={{marginBottom:2, display:'flex', ...backgroundColor }}>
        <Box sx={{marginLeft: 1}}>
          <Typography variant='h4'>
            {favHike.description}
          <Button onClick={removeFavHike}><DeleteIcon sx={{justifySelf:"end", alignSelf:"flex-start", ...textColor}}/></Button>
          </Typography>
          <Typography variant='p'>
            {favHike.location}
          </Typography>
        </Box>
      <Weather />
      <Divider />
      </Box>

      <HikeRating savedRating={favHike.rating} rateFavHike={rateFavHike} />

      <Divider />
      <Box>
        {favHike.tags.map(tag => <Tag tag={tag} deleteTag={deleteTag} changeFilter={changeFilter} key={tag.id}/>)}
        <IconButton size='small' sx={{backgroundColor: 'lightgrey', margin: 1}} onClick={handleClick}><AddIcon fontSize='small' /></IconButton>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={handleClose}
          sx={{maxHeight: 400}}
        >
          {allTags.map(tag => (
            <div key={tag.id}><Tag tag={tag} handleClick={addTag}/></div>
          ))}
          <Divider sx={{margin: 1}} />
          <TextField
            placeholder='New Tag'
            value={newTag}
            onChange={handleInput}
          />
          <MenuItem onClick={() => {addTag({name: newTag})}}>+</MenuItem>
          </Menu>
        </Box>
      </Card>
    </Grid>
  )
}

export default HikeFav;
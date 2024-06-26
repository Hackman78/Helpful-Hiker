import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav.jsx';
import axios from 'axios';
import { Box, Button, Typography, Avatar, Dialog } from '@mui/material';
import ObservationsList, {
  handleEdit,
} from './observations/ObservationsList.jsx';
import ObsForm from './observations/ObsForm.jsx';
import { st, reviewBox, boxHeader } from './observations/styles.js';
import styles from '../style/colors';
const {textColor, backgroundColor} = styles;

const Home = () => {
  const [observations, setObservations] = useState([]);
  const [open, setOpen] = useState(false);
  const obRef = useRef(observations);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getObservations = () => {
    axios
      .get(`/api/observations`)
      .then(({ data }) => {
        setObservations(data);
        // setObservations((...prevData) => (prevData = data));
      })
      .catch((err) => console.error('Could not get Feed:', err));
  };
  useEffect(() => {
    getObservations(), [obRef];
  });

  return (
    <div>
      <Box sx={st}>
        <Box>
          <h1>Helpful Hiker</h1>
          <h2>How can we help?</h2>
        </Box>
        <Nav />
        <Box sx={{ overflow: 'hidden' }}>
          <Box height={300} width={500} sx={reviewBox}>
            <Box sx={boxHeader}>
              <Typography align='right' variant='h8'>
                {/* Safe: / Unsafe: */}
              </Typography>
              <Typography align='center' variant='h8' gutterBottom>
                Review
              </Typography>
            </Box>
            <ObservationsList
              observations={observations}
              getObservations={getObservations}
              handleEdit={handleEdit}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: (e) => {
                  handleClose(e.target.value);
                },
              }}
              onSubmit={getObservations}
            >
              <ObsForm
                getObservations={getObservations}
                handleClose={handleClose}
              />
            </Dialog>
          </Box>
        </Box>
        <Button variant='contained' type='submit' onClick={handleOpen} sx={backgroundColor}>
          Add
        </Button>
        {/* <EditObs getObservations={getObservations} handleEdit={handleEdit}/> */}
        {/* <Button variant='contained' type='submit' onClick={handleEdit}> 
        Edit
        </Button> */}
      </Box>
    </div>
  );
};

export default Home;

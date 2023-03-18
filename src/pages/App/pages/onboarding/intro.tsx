import React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import logo from '../../../../assets/img/icon-34.png';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      sx={{ height: '100%' }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="span"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 600,
          p: 2,

          borderRadius: 5,
          background: '#171717',
        }}
      >
        <CardContent>
          <Typography
            textAlign="center"
            variant="h3"
            gutterBottom
            sx={{ fontWeight:'bold' }}
          >
            Bundler Wallet
          </Typography>
          <Typography textAlign="center" variant="body1" color="white">
            The smart wallet with web2 authentication for access to any dApp
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 5 }}
          >
            <img height={250} src={logo} className="App-logo" alt="logo" />
          </Box>
          <Typography
            textAlign="center"
            sx={{ fontSize: 14 }}
            color="white"
            gutterBottom
          >
            Made by Ylian, Silvan, and Cesar
          </Typography>
        </CardContent>
        <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate('/accounts/new')}
            >
              Create a Wallet
            </Button>
          </Stack>
        </CardActions>
      </Box>
    </Stack>
  );
};

export default Intro;

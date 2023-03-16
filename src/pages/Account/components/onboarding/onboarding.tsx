import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { OnboardingComponent, OnboardingComponentProps } from '../types';
import {
  ZkConnect,
  ZkConnectClientConfig,
  ZkConnectResponse,
} from '@sismo-core/zk-connect-client';

const zkConnectConfig: ZkConnectClientConfig = {
  // you will need to register an appId in the Factory
  appId: '0xc80efc569984bdcf3bb6cbd00c6cae97',
  devMode: {
    enabled: true,
  },
};

// create a new ZkConnect instance with the client configuration
const zkConnect = ZkConnect(zkConnectConfig);

const Onboarding: OnboardingComponent = ({
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  const [zkConnectResponse, setZkConnectResponse] =
    useState<ZkConnectResponse | null>(null);

  useEffect(() => {
    const zkConnectResponse = zkConnect.getResponse();
    console.log(zkConnectResponse);
    if (zkConnectResponse) {
      setZkConnectResponse(zkConnectResponse);
    }
  }, []);

  const requestProof = async () => {
    // The `request` function sends your user to the Sismo Data Vault App
    // to generate the proof of Data Vault ownerhsip.
    zkConnect.request();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Welcome to Smart Wallet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Requesting ZK Proof
        </Typography>
      </CardContent>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => onOnboardingComplete()}
          >
            Generate Proof
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
};

export default Onboarding;

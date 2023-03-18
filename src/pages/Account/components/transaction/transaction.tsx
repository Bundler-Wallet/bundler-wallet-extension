import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { TransactionComponentProps } from '../types';
import {
  DataRequest,
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


const Transaction = ({
  transaction,
  onComplete,
  onReject,
}: TransactionComponentProps) => {

  console.log(transaction)
  const [zkConnectResponse, setZkConnectResponse] =
    React.useState<ZkConnectResponse | null>(null);

  React.useEffect(() => {
    const zkConnectResponse = zkConnect.getResponse();
    console.log("zkConnectResponse", zkConnectResponse);
    if (zkConnectResponse) {

      setZkConnectResponse(zkConnectResponse);
    }
  }, []);

  const requestProof = async () => {
    // The `request` function sends your user to the Sismo Data Vault App
    // to generate the proof of Data Vault ownerhsip.
    zkConnect.request({
      callbackPath: window.location.origin + '/popup.html'
    });
  };  

  return (
    <>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', flexGrow: 1, height: '100vh', overflow: 'hidden'}}>
        {
          zkConnectResponse ? 
          <Stack spacing={2} sx={{ width: '80%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => onComplete(transaction, undefined)}
            >
              Complete Transaction
            </Button>
          </Stack>
          : 
          <Stack spacing={2} sx={{ width: '80%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => requestProof()}
            >
              Prove ownership with Sismo
            </Button>
          </Stack>
        }
      </CardActions>
    </>
  );
};

export default Transaction;

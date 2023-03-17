import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { EthersTransactionRequest } from '../../../Background/services/provider-bridge';
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
      callbackPath: "chrome-extension://khdbbdjjghoinfjjiobldgppdemjkomi/popup.html"
    });
  };  

  return (
    <>
      <CardContent>
        <Typography textAlign='center' variant="h4" gutterBottom>
          Prove yourself
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
        {
          zkConnectResponse ? 
          <Stack spacing={2} sx={{ width: '80%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => onComplete(transaction, undefined)}
            >
              Continue
            </Button>
          </Stack>
          : 
          <Stack spacing={2} sx={{ width: '80%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => requestProof()}
            >
              zkConnect
            </Button>
          </Stack>
        }
      </CardActions>
    </>
  );
};

export default Transaction;

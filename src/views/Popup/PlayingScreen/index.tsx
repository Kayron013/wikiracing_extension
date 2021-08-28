import React from 'react';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { useForceUpdate } from 'utils/hooks';
import moment from 'moment';
import { Typography, Button } from '@material-ui/core';
import { cancelGame } from 'utils/chrome/events';

export const PlayingScreen = () => {
  const localStorage = useLocalStorage();

  return (
    <>
      <Typography variant='h5'>WikiRacing</Typography>

      <div className='elapsed-time'>
        <Typography>Elapsed Time</Typography>
        <Typography>
          <Timer startTime={localStorage.currentGame.startTime} />
        </Typography>
      </div>

      <div className='hop-count'>
        <Typography>Hop Count</Typography>
        <Typography>{localStorage.currentGame.stops.length}</Typography>
      </div>

      <div className='destination'>
        <Typography>Looking for</Typography>
        <Typography>{localStorage.currentGame.destination.title}</Typography>
      </div>

      <Button variant='contained' onClick={cancelGame}>
        Stop
      </Button>
    </>
  );
};

const Timer = (props: TimerProps) => {
  useForceUpdate(1);
  const timeDiff = Date.now() - props.startTime;
  const duration = moment.utc(timeDiff).format('HH:mm:ss:SS');
  return <span>{duration}</span>;
};
type TimerProps = { startTime: number };

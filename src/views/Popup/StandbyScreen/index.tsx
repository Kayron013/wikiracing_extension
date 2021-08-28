import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { startGame } from 'utils/chrome/events';
import { setLocalStorage } from 'utils/chrome/storage';
import { useCurrentArticle, useLocalStorage } from 'utils/hooks';
import { navigateToArticle } from 'utils/wiki/article';

export const StandbyScreen = () => {
  const { currentGame } = useLocalStorage();
  const currentArticle = useCurrentArticle();
  const { origin, destination } = currentGame;
  console.log({ currentGame, currentArticle });

  const isValidRun = Boolean(origin.title) && Boolean(destination.title) && origin.title !== destination.title;

  console.log({ origin, destination, isValidRun });

  const setOriginToCurrent = async () => {
    if (currentArticle) {
      const game = { ...currentGame, origin: currentArticle };
      setLocalStorage({ currentGame: game });
    }
  };

  const setDestinationToCurrent = async () => {
    if (currentArticle) {
      const game = { ...currentGame, destination: currentArticle };
      setLocalStorage({ currentGame: game });
    }
  };

  const handleGoToStart = () => {
    navigateToArticle(origin);
  };

  const handleStart = () => {
    if (isValidRun) {
      startGame({ origin, destination });
    }
  };

  const isAtStartingArticle = currentArticle && currentArticle.url === origin.url;

  return (
    <>
      <Typography variant='h5'>WikiRacing</Typography>

      <Button variant='contained' size='small' onClick={setOriginToCurrent}>
        Set starting article
      </Button>
      <Typography component='sub'>{origin.title}</Typography>

      <Button variant='contained' size='small' onClick={setDestinationToCurrent}>
        Set ending article
      </Button>
      <Typography component='sub'>{destination.title}</Typography>

      {isAtStartingArticle ? (
        <Button variant='contained' onClick={handleStart} disabled={!isValidRun}>
          Start
        </Button>
      ) : (
        <Button variant='contained' onClick={handleGoToStart} disabled={!isValidRun}>
          Go to start
        </Button>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Hotel } from '@material-ui/icons';
import classicMatress from './images/classic.jpg'
import loomMatress from './images/loom-carousel.jpg'
import zenMatress from './images/zen-carousel.jpg'
import { ToggleButton, ToggleButtonGroup, Rating } from '@material-ui/lab';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useCartContext } from './CartContext';
import clsx from 'clsx';

export type matress = {
  name: string
  price: number
  reviewRating: number
  image: string
}

const matresses: { [key: string]: matress } = {
  classic: {
    name: "Saatva Classic",
    price: 999,
    reviewRating: 4.9,
    image: classicMatress
  },
  loom: {
    name: "Loom & Leaf",
    price: 1299,
    reviewRating: 4.0,
    image: loomMatress
  },
  zen: {
    name: "Zenhaven",
    price: 1599,
    reviewRating: 4.5,
    image: zenMatress
  }
}

// load the image and cache it so that there's no issues when it first gets mounted
function preLoadImage(imageUrl: string) {
  const img = new Image()
  img.src = imageUrl
}

Object.values(matresses).map(({name})=>name).forEach(preLoadImage)

const useStyles = makeStyles((theme) => ({
  matress: {
    display: 'grid',
    gap: theme.spacing(4),
    gridTemplateColumns: '2fr 1fr'
  },
  matressSelectionContainer: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoColumns: '1fr',
    gridAutoRows: '1fr',
    gap: theme.spacing(4)
  },
  matressDetails: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectButtons: {
    width: '100%',
    display: 'flex',
    '& > .MuiToggleButton-root': {
      border: '1px solid #d2d2d2',
      flexGrow: 1,
      backgroundColor: '#FFF',
      '&.Mui-selected': {
        backgroundColor: '#a6a19a',
        color: '#FFF'
      },
      '& > span': {
        whiteSpace: 'nowrap'
      }
    }
  },
  noTextTransform: {
    textTransform: 'none'
  },
  matressImage: {
    display: 'block',
    objectFit: 'cover',
    height: 0,
    minHeight: '100%',
    width: '100%'
  },
  imageHolder: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    overflow: 'hidden',
    '& > *': {
      gridColumn: ' 1 / 2',
      gridRow: '1 / 2'
    }
  },
  minHeight: {
    height: 'min-content'
  },
  "@media (max-width: 720px)": {
    matress: {
      gridAutoFlow: 'column',
      gridTemplateColumns: 'unset',
      gridTemplateRows: '1fr 2fr'
    },
    matressSelectionContainer: {
      gap: theme.spacing(1)
    }
  }
}))

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
}


function MattressChooseComponent() {
  const classes = useStyles()
  const { addItem } = useCartContext()
  const [selectedMatress, setSelectedMatress] = useState<string>(Object.keys(matresses)[0])
  const [[oldItemIndex, newItemIndex], setItemIndex] = useState<[number, number]>(() => [0, 0])
  function updateMatress(newKey: string | null) {
    if (newKey) {
      setSelectedMatress(newKey)
      const newNewItemIndex = Object.keys(matresses).findIndex((item) => newKey === item)
      setItemIndex([newItemIndex, newNewItemIndex])
    }
  }
  const direction = newItemIndex - oldItemIndex
  return (
    <div className={classes.matress}>
      <div className={classes.imageHolder}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            src={matresses[selectedMatress].image}
            className={classes.matressImage}
            key={selectedMatress}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ stiffness: 100 }}
            variants={variants}
            custom={direction}
          />
        </AnimatePresence>
      </div>
      <div className={classes.matressSelectionContainer}>
        <Typography variant='h5' component='h2'>Choose Your Mattress</Typography>
        <div>
          <Typography variant='overline' id='matress-picker'>Select Matress Type</Typography>
          <ToggleButtonGroup
            value={selectedMatress}
            exclusive
            onChange={(_: any, newValue: string | null) => updateMatress(newValue)}
            aria-labelledby="matress-picker"
            className={classes.selectButtons}
          >
            {Object.entries(matresses).map(([key, value]) =>
              <ToggleButton key={key} value={key} className={classes.noTextTransform}>
                {value.name}
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </div>
        <div className={classes.matressDetails}>
          <div>
            <Typography variant='subtitle2' id='matress-picker'>{matresses[selectedMatress].name} Matress</Typography>
            <Rating
              name="rating"
              aria-label='rating'
              value={matresses[selectedMatress].reviewRating}
              precision={0.1}
              icon={<Hotel fontSize="inherit" />}
            />
          </div>
          <Typography variant='body2' id='matress-picker'>${matresses[selectedMatress].price.toLocaleString()}</Typography>
        </div>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => addItem(matresses[selectedMatress])}
          className={clsx(classes.minHeight, classes.noTextTransform)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}


export {
  MattressChooseComponent
}

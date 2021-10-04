import React from 'react';
import useStyles from './styles';
const Star: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.bgStar01}`}></div>
      <div className={`${classes.bgStar02}`}></div>
    </div>
  )
}

export default Star
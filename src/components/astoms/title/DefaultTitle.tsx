import React from 'react';
import useStyles from './styles';

type ButtonProps = {
  text: {},
}

const Title: React.FC<ButtonProps> = ({
  text,
}) => {
  const classes = useStyles();
  return (
    <h3 className={`${classes.root}`}>{text}</h3>
  );
};

export default Title;

import React from 'react';
import useStyles from './styles';

type ButtonProps = {
  text: string,
  small?: string,
  onClick?:(e:React.MouseEvent) => void,
  connect?: boolean,
}

const DefaultButon: React.FC<ButtonProps> = ({
  text,
  onClick,
  small = '',
  connect,
}) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${small} ${connect ? 'connected' : ''}`} onClick={onClick}>{connect ? 'Connected' : text}</div>
  );
};

export default DefaultButon;

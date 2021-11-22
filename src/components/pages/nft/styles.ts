import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      '& .MuiPaginationItem-root': {
        borderRadius: '5px',
      },
      '& button': {
        color: '#B2FAFF',
        '&.Mui-selected': {
          color: ' #0B7880',
          background: '#17F0FF',
          borderRadius: '5px',
          fontWeight: '700',
        }
      },
      '& .MuiPaginationItem-ellipsis': {
        color: '#B2FAFF',
      }
    }
  },
}));

export default useStyles;
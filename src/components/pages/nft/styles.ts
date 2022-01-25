import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      '& .MuiPaginationItem-root': {
        borderRadius: '5px',
        '@media screen and (max-width: 767px)' : {
          height: '24px',
          minWidth: '24px',
          borderRadius: '3px',
          '& button.Mui-selected': {
            borderRadius: '3px',
          }
        }
      },
      '& button': {
        fontSize: 14,
        color: '#575757',
        fontFamily: '"Lexend", sans-serif',
        fontWeight: '600',
        '&:hover': {
          color: '#AAFFFF',
        },
        '&.Mui-selected': {
          color: ' #1A2222',
          background: '#00FFFF',
          borderRadius: '5px',
        },
        '@media screen and (max-width: 767px)' : {
          fontSize: 12,
        }
      },
      '& .MuiPaginationItem-ellipsis': {
        color: '#575757',
      }
    }
  },
  placeholder: {
    '&::placeholder': {
      color: '#575757',
    }
  }
}));

export default useStyles;
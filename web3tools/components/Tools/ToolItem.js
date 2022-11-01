import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
const ToolItem = (props) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Link href={props.to} passHref>
      <ListItem
        selected={props.to === router.pathname}
        button
        component='a'
        key={props.text}
        disablePadding
        sx={{
          display: 'block',
          '&& .Mui-selected': {
            bgcolor: theme.palette.action.selected,
          },
          // '& .Mui-selected': {
          //   bgcolor: theme.palette.action.selected,
          // },
        }}
      >
        <ListItemButton
          selected={props.to === router.pathname}
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {props.children}
          </ListItemIcon>
          <ListItemText
            primary={props.text}
            primaryTypographyProps={{ fontSize: '1.6rem' }}
            sx={{ opacity: props.open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default ToolItem;

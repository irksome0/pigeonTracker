import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import styles from "@/components/styles/NavigationButton.module.css"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";
import { IconContext } from 'react-icons';
import {checkAdmin} from "@/utils/checkAdmin"

export default function AuthenticatedMenu(props: any) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter()
  const [isAdmin, setIsAdmin] = React.useState(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const handleSignOut = () =>{
    signOut();
    };
  const handleRedirect = (val: string) => {
    router.replace(val)
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    checkAdmin(props.email)
    .then((res) => setIsAdmin(res))
    .catch((error) => console.error("Error fetching data:", error))
  },)

  React.use

  return (
      <div>
        <button
          ref={anchorRef}
          className={styles.profile_button}
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <IconContext.Provider value={{size:"32px", color:"#2D3142"}}><FaUser /></IconContext.Provider>
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right bottom' : 'right top',
              }}
            >
              <Paper style={{backgroundColor:"#F9FAFB", color:"#2D3142",}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <h3 style={{margin:"4px 0px 8px 16px"}}>{props.name}</h3>
                    {isAdmin ?(
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        handleRedirect("controlpanel");
                        handleClose(event);
                    }}>Control Panel</MenuItem>
                    ):false}
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        handleRedirect("dashboard");
                        handleClose(event);
                    }}>Dashboard</MenuItem>
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) =>{
                        handleSignOut();
                        handleClose(event);
                        }}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}

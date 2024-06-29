import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import styles from "@/components/styles/Navigation.module.css"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconContext } from 'react-icons';
import {checkAdmin} from "@/utils/checkAdmin"
import { revalidate } from '@/utils/revalidate';
import { IoMdMenu } from 'react-icons/io';

export default function MobileAuthenticationMenu(){
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

  const handleRedirect = (path: string) => {
    router.replace(path);
    revalidate(path);
    router.refresh();
}

  React.use

  return (
      <>
        <button
          ref={anchorRef}
          className={styles.profile_button}
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <IconContext.Provider value={{size:"32px", color:"#2D3142"}}><IoMdMenu/></IconContext.Provider>
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
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        handleRedirect("/login");
                        handleClose(event);
                    }}>Log in</MenuItem>
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        handleRedirect("/register");
                        handleClose(event);
                    }}>Sign in</MenuItem>
                    </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
  );
}

"use client";

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
import { revalidate } from '@/utils/revalidate';
import { IoIosAddCircle, IoMdCreate, IoMdMenu } from 'react-icons/io';
import { TbTrashFilled } from 'react-icons/tb';

interface PigeonItemControlsMenuProps{
    setCreateMode: () => void;
    setEditMode: () => void;
    deleteItem: () => void;
}

export default function PigeonItemControlsMenu(props:PigeonItemControlsMenuProps){
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter()

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

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
          <IconContext.Provider value={{size:"24px", color:"#2D3142"}}><IoMdMenu/></IconContext.Provider>
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
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={() => {
                        props.setCreateMode();
                    }}>
                        <h3>Create</h3>
                        <IoIosAddCircle style={{marginTop:"4px"}} className={styles.icon}/>
                    </MenuItem>
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        props.setEditMode();
                    }}>
                        <h3>Edit</h3>
                        <IoMdCreate style={{marginTop:"4px"}} className={styles.icon}/>
                    </MenuItem>
                    <MenuItem style={{fontFamily:"var(--font-noto-sans)", fontWeight:"600"}} onClick={(event) => {
                        props.deleteItem();
                    }}>
                        <h3>Delete</h3>
                        <TbTrashFilled style={{marginTop:"4px"}} className={styles.icon}/>
                    </MenuItem>
                    </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
  );
}

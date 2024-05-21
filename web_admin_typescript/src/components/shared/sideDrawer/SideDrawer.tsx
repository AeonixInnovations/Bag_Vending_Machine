import { ArrowLeftStartOnRectangleIcon, BellIcon, ClockIcon, Cog6ToothIcon, CreditCardIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import { Avatar, Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import AuthContext from '../../../contexts/authContext/authContext'
import LogoutDrawer from '../logoutModal/LogoutDrawer'


const SideDrawer = () => {
  const {user}= useContext(AuthContext)
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
 
  return (
    <Menu>
            <MenuHandler >
              <IconButton variant="text" color="blue-gray">
                <Cog6ToothIcon className="h-7 w-7 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className=" border-2 -ml-8 w-64 ">
              <MenuItem className="flex items-center gap-3 mb-2  bg-green-50">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-green-500">
                  <UserIcon  className="h-6 w-6 text-white " />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="green"
                    className="mb-1 font-normal"
                  >
                    <strong>{user?.user_name}</strong> 
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                   view profile
                  </Typography>
                </div>
              </MenuItem>
              
              <MenuItem className="flex items-center gap-4 hover:bg-red-50">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-red-500">
                  <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white " />
                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="red"
                    className=" font-normal"
                  >
                   <button onClick={handleOpen}>Logout</button>
                  </Typography>
                  
                </div>
              </MenuItem>
            </MenuList>
            <Dialog open={open} handler={handleOpen} >
        <LogoutDrawer handleClose={handleClose}/>
      </Dialog>
          </Menu>
  )
}

export default SideDrawer
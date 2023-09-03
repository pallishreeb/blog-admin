import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FeaturedPlayList, Home, Lock, NoteAdd } from "@mui/icons-material"
const MenuItem = ({ open, navigate }) => {
    const data = [
        {
            name: "Dashboard",
            icon: <Home color='white' />,
            path: "/"
        },
        {
            name: "Add Blogs",
            icon: <NoteAdd />,
            path: "/add"
        },
        {
            name: "Blogs",
            icon: <FeaturedPlayList color='white' />,
            path: "/posts"
        },

        {
            name: "Users",
            icon: <Lock color='white' />,
            path: "/users"
        },
        {
            name: "Categories",
            icon: <FeaturedPlayList color='white' />,
            path: "/categories"
        },
        {
            name: "Metadata",
            icon: <FeaturedPlayList color='white' />,
            path: "/showmetadata"
        }


    ]
    return (<div>
        {data.map((item, index) => (
            <ListItem key={index}
                // disablePadding
                sx={{ display: 'block' }} onClick={() => navigate(item.path)}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: "tan"
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        ))}
    </div>
    )
}

export default MenuItem
import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import {MdCreate} from 'react-icons/md'

export const SideBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Create activity',
        path: '/activity',
        icon: <MdCreate />,
        cName: 'nav-text'
    }
]
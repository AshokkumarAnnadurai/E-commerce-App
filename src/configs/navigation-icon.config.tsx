import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'
import { AiFillProject } from "react-icons/ai";
import { FaCartShopping } from 'react-icons/fa6';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    product: <AiFillProject />,
    cart:<FaCartShopping />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon

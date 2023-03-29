import {BsHouseFill, BsBellFill} from "react-icons/bs";
import {FaUser} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
    const items = [
        {
            label: 'Accueil',
            path: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            path: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Profil',
            path: '/utilisateurs/1',
            icon: FaUser
        }
    ];
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo></SidebarLogo>
                    {items.map((item) => (
                    <SidebarItem key={item.path} path={item.path} label={item.label} icon={item.icon}/>))}
                    <SidebarItem label="Déconnexion" icon={BiLogOut} onClick={() => {}}></SidebarItem>
                    <SidebarTweetButton></SidebarTweetButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
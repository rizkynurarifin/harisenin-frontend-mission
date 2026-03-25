import { IoMdPerson, IoMdStar, IoMdExit } from "react-icons/io";

export const navLinks = [
    { name: "Series", path: "/series" },
    { name: "Film", path: "/movies" },
    { name: "Daftar Saya", path: "/my-list" },
];

export const profileLinks = [
    { name: "Profil Saya", path: "/profile", icon: IoMdPerson },
    { name: "Ubah Premium", path: "/subscription", icon: IoMdStar },
    { name: "Keluar", path: "/login", icon: IoMdExit, isLogout: true },
];
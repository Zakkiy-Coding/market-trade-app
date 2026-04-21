'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import {NAV_ITEMS} from "@/lib/constans";
import Link from "next/link";

const Navitems = () => {
    const pathname = usePathname();
    const isActive = (path) => {
        if(path === "/") return pathname === '/';
        return pathname.startsWith(path);
    }
    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({href, label}) => (
                <li key={href} className={`hover:text-white ${isActive(href) ? 'text-white' : 'text-gray-300'}`}>
                    <Link href={href}>{label}</Link>
                </li>
            ))}
        </ul>
    )
}
export default Navitems

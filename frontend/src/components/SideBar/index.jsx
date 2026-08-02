import { useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import Button from '../../components/Button/index'

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="m-4 bg-zinc-800 border border-zinc-950/55 px-4 py-2 rounded text-white cursor-pointer hover:bg-zinc-900 transition-all duration-300"
            >
                <HiArrowCircleRight className="text-xl" />
            </button>

            <aside
                className={`
          fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <header className="w-full h-15 flex justify-end items-center p-10">
                    <button className="bg-zinc-800 p-2 text-xl rounded-full border border-zinc-950/55 cursor-pointer hover:bg-zinc-900 transition-all duration-300" onClick={() => setOpen(false)}><HiArrowCircleLeft /></button>
                </header>

                <main className="w-full h-50 justify-center flex items-center">
                    <ul>
                        <li>
                            <Link className="text-2xl poppins-extralight hover:underline-offset-8 hover:underline flex items-center justify-center gap-2 " to="/feed">
                                <CiHome className="text-2xl" /> Feed
                            </Link>
                        </li>
                    </ul>
                </main>
            </aside>
        </>
    );
}
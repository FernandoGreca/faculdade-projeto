'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, Bars4Icon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 470);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("User");
    sessionStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
          href="#"
        >
          <div className="w-32 text-white md:w-40">
          <h1 className="text-3xl font-bold text-white tracking-[2]">ClassHub</h1>
          </div>
        </Link>
        
        {isMobile ? (
          <>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              <Bars4Icon className="w-8 h-8" />
            </button>
            {isOpen && (
              <div className="flex flex-col space-y-2 mt-2">
                <NavLinks isMobile={true} />
                <button
                  onClick={() => setShowModal(true)}
                  className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600"
                >
                  <PowerIcon className="w-6" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks isMobile={false} />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            
            {/* Botão de Logout */}
            <button
              onClick={() => setShowModal(true)}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sair</div>
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 backdrop-blur-sm  z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800">Tem certeza que deseja sair?</h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
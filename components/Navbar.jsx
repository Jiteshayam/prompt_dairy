"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false)
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
    
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }

  }, []);

  useEffect(() => {
    // Apply the "dark" class to the body when dark mode is enabled
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Store the user's preference in localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="PromptDairy Logo"
          className="object-contain"
        />
        <p className="logo_text dark:text-white">Prompt Dairy</p>
      </Link>


        {/* desktop Navigation  */}
        <div className="sm:flex hidden gap-3">

              <button
                type="button"
                onClick={() => {
                  setDarkMode((prev=>!prev))
                }}
                className="rounded-full border-none p-[0.3rem]"
              >
                {darkMode?
                  <Image src="/assets/images/sun.svg" width={30} height={30}  
                  className="object-contain bg-[#FDB813] rounded-full" alt="sun"/>:
                  <Image src="/assets/images/moon.svg" width={30} height={30} 
                  className="object-contain text-yellow-400 bg-white rounded-full"  alt="moon"/>
                }
              </button>

          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                Create Post
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href={"/profile"}>
                <Image
                  src={session?.user.image}
                  width={35}
                  height={35}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

      {/* mobile naviagation */}

      <div className="sm:hidden flex relative bg-transparent">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Image
              src={session?.user.image}
              width={35}
              height={35}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown text-left z-10  bg-transparent">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setDarkMode((prev=>!prev))
                  }}
                  className="rounded-full border-none p-[0.3rem]"
                >
                  {darkMode?
                    <div className="flex gap-2">
                      <Image src="/assets/images/sun.svg" width={20} height={20}  
                      className="object-contain bg-[#FDB813] rounded-full" alt="sun"/>
                      <p className="dropdown_link">Light Mode</p>
                    </div>:

                    <div className="flex gap-2">
                      <Image src="/assets/images/moon.svg" width={20} height={20} 
                      className="object-contain text-yellow-400 bg-white rounded-full"  alt="moon"/>
                      <p className="dropdown_link">Dark Mode</p>
                    </div>
                  }
                </button>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                ></button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

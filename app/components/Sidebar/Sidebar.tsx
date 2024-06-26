'use client';

import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image';

import menu from '@/app/utils/menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { arrowLeft, bars, logout } from '@/app/utils/Icons';
import { UserButton, useClerk, useUser } from '@clerk/nextjs';

const Sidebar = () => {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const user = useUser();

  // console.log(user.user?.firstName);
  // console.log(pathname);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} $collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>

      <div className="profile">
        <div className="profile-overlay"></div>
        {/* <div className="image">
          <Image width={70} height={70} src="/avatar1.png" alt="profile" />
        </div> */}
        <div className="user-btn">
          <UserButton afterSignOutUrl="/signin" />
        </div>
        <h1>
          <span>{user.user?.fullName}</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu?.map((item, index) => {
          const link = item.link;

          return (
            <li
              key={index}
              className={`nav-item ${pathname === link ? 'active' : ''}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={'Sign Out'}
          type={'submit'}
          padding={'0.2rem 1rem'}
          borderRad={'0.25rem'}
          fw={'500'}
          fs={'1rem'}
          icon={logout}
          click={() => signOut(() => router.push('/signin'))}
        />
      </div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav<{ $collapsed: boolean }>`
  width: ${(props) => props.theme.sidebarWidth};
  position: relative;
  background: ${(props) => props.theme.colorBg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};
  z-index: 999;

  .toggle-nav {
    position: absolute;
    right: -50px;
    margin: 0;
    border: 1px solid rgba(249, 249, 249, 0.08);
    top: 5rem;
    width: 50px;
    padding: 1rem;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;

    background-color: ${(props) => props.theme.colorBg2};
    display: none;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 1rem);
    transform: ${(props) =>
      props.$collapsed ? 'translateX(-100%)' : 'translateX(0)'};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

    .toggle-nav {
      display: block;
    }
  }

  .user-btn {
    width: 35px;
    height: 35px;

    .cl-rootBox {
      width: 100%;
      height: 100%;

      span {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .profile {
    margin: 0.75rem;
    position: relative;
    padding: 0.75rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.4s linear;
      border-radius: 0.25rem;
      border: 1px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
    }

    h1 {
      font-size: 1.1rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
    }

    > h1 {
      margin-left: 1rem;
      font-size: clamp(0.875rem, 4vw, 1rem); // clamp(최솟값, 선호값, 최댓값)
      line-height: 160%;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      border-radius: 100%;
      transition: all 0.5s ease;
      width: 60px;
      height: 60px;

      img {
        width: 100%;
      }
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 1px solid ${(props) => props.theme.borderColor2};
      }
    }
  }

  .nav-item {
    padding: 0.7rem 1rem 0.8rem 2rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    position: relative;
    align-items: center;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: '';
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;

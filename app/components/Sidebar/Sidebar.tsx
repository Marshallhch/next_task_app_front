'use client';

import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image';

import menu from '@/app/utils/menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  // console.log(pathname);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src="/avatar1.png" alt="profile" />
        </div>
        <h1>
          <span>Marshall</span>
          <span>Han</span>
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
      <button></button>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav`
  width: ${(props) => props.theme.sidebarWidth};
  position: relative;
  background: ${(props) => props.theme.colorBg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

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
      line-height: 100%;
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
`;

export default Sidebar;
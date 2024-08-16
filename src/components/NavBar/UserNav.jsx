import React, { useState } from 'react';
import { TfiAngleUp } from 'react-icons/tfi';
import css from './UserNav.module.css';
import image1 from '../../images/Image (1).jpg';
import { MdLogout } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { Button } from '@chakra-ui/react';
import { ProfileSettingsModal } from '../../components/Modal/ProfileSettingsModal';

export const UserNav = () => {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropDownVisible(prevState => !prevState);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.userNav}>
      <img src={image1} alt="Alex" className={css.userImg}/>
      <p className={css.userName}>Alex Rybachok</p>
      <TfiAngleUp className={css.iconUp} onClick={toggleDropdown} />

      {isDropDownVisible && (
        <div className={css.dropdownMenu}>
            <ul>
                <li>
                    <Button onClick={handleOpenModal}>Profile settings</Button>
                    <ProfileSettingsModal isOpen={isModalOpen} onClose={handleCloseModal} />
                    <a href="/profile">
                    <GoPerson className={css.icon}/>
                    Profile Settings</a>                    
                </li>
                <li>
                    <a href="/logout">
                    <MdLogout className={css.icon} />
                    Log out</a>
                </li>
            </ul>
        </div>
      )}
    </div>
  );
};

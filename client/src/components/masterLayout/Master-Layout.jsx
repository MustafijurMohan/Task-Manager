import React, { useRef } from 'react'
import logo from '../../assets/images/logo.svg'
import {Container, Navbar} from 'react-bootstrap'
import { AiOutlineMenuUnfold, AiOutlineLogout, AiOutlineUser, AiOutlineEdit, AiOutlineCheckCircle } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BsListNested, BsHourglass } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { getUserDetails, removeSessions } from '../../helper/SessionHelper';


const MasterLayout = (props) => {

    let contentRef, sideNavRef = useRef()

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef
        let content = contentRef
        
        if (sideNav.classList.contains('side-nav-open')) {
            sideNav.classList.add('side-nav-close')
            sideNav.classList.remove('side-nav-open')
            content.classList.add('content-expand')
            content.classList.remove('content')
        } else {
            sideNav.classList.remove('side-nav-close')
            sideNav.classList.add('side-nav-open')
            content.classList.remove('content-expand')
            content.classList.add('content')
        }
    }

    const onLogOut = () => {
        removeSessions()
    }

  return (
    <>
        <Navbar className='fixed-top px-0 bg-white shadow-sm'>
            <Container fluid={true}>
                <Navbar.Brand>
                    <a className='icon-nav m-0 h5' onClick={MenuBarClickHandler} ><AiOutlineMenuUnfold /></a>
                    <img className='nav-logo mx-2' src={logo} alt="logo" />
                </Navbar.Brand>

                {/* Dropdown Menu */}
                <div className="float-right h-auto d-flex">
                    <div className="user-dropdown">
                        <img className='icon-nav-img icon-nav' src={getUserDetails()['photo']} alt="img" />
                        <div className="user-dropdown-content ">
                            <div className="mt-4 text-center">
                                <img className='icon-nav-img' src={getUserDetails()['photo']} alt="img" />
                                <h6>{getUserDetails()['firstName']}</h6>
                                <hr className='user-dropdown-divider p-0'/>
                            </div>
                            <NavLink to='/profile' className='side-bar-item'>
                                <AiOutlineUser className='side-bar-item-icon'/>
                                <span className='side-bar-item-caption'>Profile</span>
                            </NavLink>
                            <a href="" className='side-bar-item'>
                                <AiOutlineLogout className='side-bar-item-icon'/>
                                <span onClick={onLogOut} className='side-bar-item-caption'>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </Navbar>

        <div ref={(div) => sideNavRef=div} className="side-nav-open">

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/' end>
                <RiDashboardLine className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>Dashboard</span>
            </NavLink>

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/create' end>
                <AiOutlineEdit className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>Create New</span>
            </NavLink>

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/all' end>
                <BsListNested className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>New Task</span>
            </NavLink>

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/progress' end>
                <BsHourglass className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>In Progress</span>
            </NavLink>

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/completed' end>
                <AiOutlineCheckCircle className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>Completed</span>
            </NavLink>

            <NavLink className={(navData) => navData.isActive ? 'side-bar-item-active side-bar-item mt-2 ' : 'side-bar-item mt-2' } to='/canceled' end>
                <MdOutlineCancelPresentation className='side-bar-item-icon' />
                <span className='side-bar-item-caption'>Canceled</span>
            </NavLink>

        </div>

        <div ref={(div) => contentRef=div} className='content'>
            {props.children}
        </div>
    </>
  )
}

export default MasterLayout
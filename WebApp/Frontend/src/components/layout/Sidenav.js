import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/smartoee.png";
import { useDispatch } from "react-redux";
import { signOut } from "../../Redux/actions/auth.actions";
import { AiOutlineDatabase } from "react-icons/ai";
import { LogoutSvg, DashboardSvg, ProfileSideNavSvg } from "../../assets/Icons";

import {
  ContainerFilled,
  FileOutlined,
  FundProjectionScreenOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Sidenav = ({ color }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className='brand'>
        <img src={logo} alt='' />
        <span> Smart IoT Management System</span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        <Menu.Item key={"1"}>
          <NavLink to='/' end>
            <span
              className='icon'
              style={{
                background: page === "dashboard" ? color : "",
              }}>
              <DashboardSvg color={color} />
            </span>
            <span className='label'>Dashboard</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={"8"}>
          <NavLink to='/macaddress'>
            <span
              className='icon'
              style={{
                background: page === "macaddress" ? color : "",
              }}>
              {<ContainerFilled />}
            </span>
            <span className='label'>MacAddress</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={"9"}>
          <NavLink to='/files'>
            <span
              className='icon'
              style={{
                background: page === "files" ? color : "",
              }}>
              {<FileOutlined />}
            </span>
            <span className='label'>Files</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={"12"}>
          <NavLink to='/scripts'>
            <span
              className='icon'
              style={{
                background: page === "scripts" ? color : "",
              }}>
              {<FundProjectionScreenOutlined />}
            </span>
            <span className='label'>Scripts</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={"15"}>
          <NavLink to='/device-info'>
            <span
              className='icon'
              style={{
                background: page === "device-info" ? color : "",
              }}>
              {<InfoCircleOutlined />}
            </span>
            <span className='label'>Device Info</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item className='menu-item-header' key={"19"}>
          Account
        </Menu.Item>
        {authState?.role && authState?.role === "admin" && (
          <Menu.Item key={"13"}>
            <NavLink to='/users'>
              <span
                className='icon'
                style={{
                  background: page === "users" ? color : "",
                }}>
                <UsergroupAddOutlined />
              </span>
              <span className='label'>Users</span>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item key={"10"}>
          <NavLink to='/profile'>
            <span
              className='icon'
              style={{
                background: page === "profile" ? color : "",
              }}>
              <ProfileSideNavSvg color={color} />
            </span>
            <span className='label'>Profile</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={"11"}>
          <div
            style={{ marginLeft: 16, marginTop: 5 }}
            onClick={async () => {
              await dispatch(signOut());
              navigate("/sign-in");
            }}>
            <span className='icon'>
              <LogoutSvg color={color} />
            </span>
            <span className='label'>Logout</span>
          </div>
        </Menu.Item>
      </Menu>
      {/* <div className='aside-footer'>
        <div
          className='footer-box'
          style={{
            background: color,
          }}>
          <span className='icon' style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type='primary' className='ant-btn-sm ant-btn-block'>
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Sidenav;

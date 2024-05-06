import React from 'react';
import App from '../pages/Login';
import Sign from '../pages/Sign/Sign';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "../pages/Main";
import Sign_2 from "../pages/Sign/Sign_2";
import Sign_3 from "../pages/Sign/Sign_3";
import QrCRUD from "../pages/qrCRUD";
// import Payment from "../pages/requestPay";
import StoreSign from "../pages/Sign/storeSign";

import AdminSignCon from '../pages/admin/AdminPageSignInConfirm';
import AdminStoreMan from '../pages/admin/AdminPageStoreManage';
import AdminAppMan from '../pages/admin/AdminPageAppManage';

import OrderCheck from '../pages/user/OrderCheck';
import MenuEdit from '../pages/user/MenuEdit';
import MenuAdd from '../pages/user/MenuAdd';

import SignInPage from '../pages/Sign/SignIn';
import SignInPage2 from '../pages/Sign/SignIn2';
import SignInCom from   '../pages/Sign/SignInCom';


function Routing() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/Main' element={<Main />} />
                    <Route path='/Sign' element={<Sign />} />
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Route path='/Sign_2' element={<Sign_2 />} />
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Route path='/Sign_3' element={<Sign_3 />} />
                    <Route path='/Main/qrCRUD' element={<QrCRUD />} />
                    <Route path='/storesign' element={<StoreSign />}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routing;

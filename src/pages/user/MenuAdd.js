import '../../css/user/MenuAdd.css'
import { useState} from "react";
// import axios from 'axios';
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';

import Icon from '../../assets/IconSample.png'

export default function MenuAdd() {
    const navigate = useNavigate();
    const [productname, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    // const category = 'tag1'
    const [preview, setPreview] = useState(''); // 이미지 미리보기 URL을 저장할 상태
    const storename = '스타벅스'
    // input 태그를 참조하기 위한 ref 생성
    const fileInputRef = useRef();
    const ownerid = localStorage.getItem('ownerid');

    const goToMenuEdit = () => {
        localStorage.setItem('ownerid', ownerid);
        navigate('/Main/Menu/Edit');
    };

    // "사진추가" 버튼 클릭 시 실행될 함수
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // 파일 읽기가 완료되면 미리보기 URL을 상태에 저장
            };
            reader.readAsDataURL(file); // 파일을 Data URL 형태로 읽습니다.
        } else {
            setPreview(''); // 이미지 파일이 아니면 미리보기를 비웁니다.
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // 버튼 클릭 시 숨겨진 파일 입력을 트리거합니다.
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productname', productname);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('menuimage', fileInputRef.current.files[0]);
        formData.append('storename', storename)

    //     try {
    //         const response = await axios.post(`http://43.201.92.62/store/${ownerid}/menu`, formData);
    //         console.log('Server Response:', response.formData);
    //     } catch (error) {
    //         console.error('Error uploading the menu:', error.response.formData);
    //     }
    // };
        try {
            const response = await fetch(`http://43.201.92.62/store/${ownerid}/menu`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                // Menu item added successfully
                // You can redirect or show a success message here
                goToMenuEdit();
                console.log(`메뉴아이템 등록 성공 : ${formData}`);
            } else {
                // Handle error response
                console.error('Failed to add menu item:', response.statusText);
                alert("Failed add menu")
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert(`Failed add menu222${ownerid}`)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="menuAdd">
            <div className="logoContainer">
                <img className="appNupanIcon" src={Icon} alt="">
                </img>
                <div className="app-nupan">
                    APP-nupan
                </div>
            </div>
            <div className="line-5">
            </div>
            <div className="menu-add-1">
                메뉴추가
            </div>
            <div className="menuItemContainer">
                <div className="image">
                    {preview && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img src={preview} alt="메뉴 미리보기" className="image-sample"/>
                    )}
                    <button className="image-add-bt" onClick={handleButtonClick} type={"button"}>
                        <span className="image-add">사진추가</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{display: 'none'}} // 사용자에게 보이지 않도록 숨깁니다
                    />
                </div>
                <div className="menuInfoContainer">
                    <div className="textContainer">
                        <div className="menu-name">
                            메뉴이름
                        </div>
                        <div className="menu-info">
                            메뉴설명
                        </div>
                        <div className="tag">
                            태그
                        </div>
                        <div className="price">
                            가격
                        </div>
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            value={productname}
                            onChange={(e) => setProductName(e.target.value)} // 추가
                            className="inputMenuName"
                            placeholder="메뉴이름을 입력해주세요"
                            autoComplete="ownername"/>
                        <div className="inputMenuInfo">
                        </div>
                        <input
                            list="categories"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="inputMenuTag"
                            placeholder="태그 이름"
                            autoComplete="off"/>
                        <datalist id="categories">
                            <option value="태그1"></option>
                            <option value="태그2"></option>
                            <option value="태그3"></option>
                        </datalist>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} // 추가
                            className="inputMenuPrice"
                            placeholder="아이디를 입력해주세요"
                            autoComplete="ownername"/>
                    </div>
                </div>
            </div>
            <div className="container-2">

                <div className="container-1">
                    <div className="menu-name-space">


                    </div>
                    <div className="menu-info-space">


                    </div>
                </div>
            </div>
            <div className="tag-space">


            </div>
            <div className="price-sapce">


            </div>
            <div className="container">
                <button className="menu-add-bt" type={"submit"}>
                    <span className="menu-add-2">
                        메뉴추가
                    </span>
                </button>
                <button className="add-cancel-bt"
                        type={"button"}
                        onClick={goToMenuEdit}>
                    <span className="cancel">
                        작성취소
                    </span>
                </button>
            </div>
        </div>
        </form>
    )
}

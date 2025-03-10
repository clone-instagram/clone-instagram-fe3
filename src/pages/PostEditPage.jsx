import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
// import { apis } from "../lib/axios";
import Button from "../components/button/Button";
import { useDispatch } from "react-redux";
import { __editPost, __getIdPost } from "../redux/modules/postSlice";
import { useSelector } from "react-redux";

import addimage from "../assets/images/addimage.png";
// import axios from "axios";

const PostEditPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const imgRef = useRef();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.posts);
  console.log("posts???", post);

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    // const file = imgRef.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
      // const image = reader.result;
      setEditPosts({
        ...editposts,

        imgUrl: reader.result,
      });
    };
  };
  // // console.log(imageUrl);
  const [imagefile, setImageFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const [editposts, setEditPosts] = useState([]);

  useEffect(() => {
    console.log("param:::", param.id);
    dispatch(__getIdPost(+param.id));
  }, [dispatch, param.id]);

  // const setFile = (e) => {};

  // const setFileImage = (event) => {
  //   if (event.target.files[0]) {
  //     setImageFile(event.target.files[0]);
  //     const formdata = new FormData();
  //     formdata.append("imageUrl", imagefile);
  //     formdata.append("title", title);
  //     formdata.append("content", content);
  //     formdata.append("category", category);
  //     console.log(formdata);
  //     console.log(typeof formdata);
  //     dispatch(__addPost(formdata));
  //     console.log(title);
  //   }
  // };

  // const [post, setPost] = useState({
  //   title: "",
  //   imageUrl: "",
  //   content: "",
  //   category: "",
  // });

  const onEditHandler = (id, post) => {
    // console.log(content);
    const formdata = new FormData();
    formdata.append("file", imagefile);
    formdata.append("content", content.content);

    console.log(formdata);
    console.log(typeof formdata);

    dispatch(__editPost({ id, formdata }));

    for (const pair of formdata) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  return (
    <StContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEditHandler(Number(param.id), editposts);
          window.location.assign("/home");
        }}
      >
        <div>
          <StTopBar>
            <Button
              back
              onClick={() => {
                window.location.assign("/home");
              }}
            />
            <StH>새 게시물 만들기</StH>
            <Button add>공유하기</Button>
          </StTopBar>
        </div>
        <div
          required
          placeholder=""
          type="file"
          name="imgUrl"
          id="imgUrl"
          defaultValue={imgUrl}
        >
          <StLeftBox alt="" src={imgUrl ? imgUrl : post.imgUrl}></StLeftBox>
        </div>
        <StRightBox>
          <StUserBox>
            <StProfile src={localStorage.getItem("profileUrl")}></StProfile>
            <p>{localStorage.getItem("username")}</p>
            {/* <p>{localStorage.getItem("profileUrl")}</p> */}
          </StUserBox>
          <StPostBox
            placeholder="문구 입력.."
            required
            defaultValue={post.content}
            maxLength={200}
            minLength={10}
            name="content"
            id="content"
            cols="40"
            rows="10"
            onChange={(ev) => {
              const { value } = ev.target;
              setContent({
                ...content,

                content: value,
              });
            }}
          ></StPostBox>
          <StImogeBox>
            <AppStyle>
              <label htmlFor="ex_file">
                <div className="addImage">
                  <img src={addimage} alt="addimage" />
                </div>
              </label>
              <input
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                id="ex_file"
                ref={imgRef}
                // onChange={onChangeImage}
                onChange={onChangeImage}
                width="850px"
                height="850px"
              />
            </AppStyle>
          </StImogeBox>
        </StRightBox>
      </form>
    </StContainer>
  );
};
// 12/27 최신화
export default PostEditPage;

const StContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #dbdbdb;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

// const StForm = styled.form`
//   border-radius: 5px;
//   max-width: 700px;
//   border: 1px solid burlywood;
//   width: 95%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 90vh;
//   margin: -100px auto 0 auto;
// `;

const StLeftBox = styled.img`
  align-items: center;
  background: #c0e9fc;
  box-sizing: border-box;
  float: left;
  height: 855px;
  width: 855px;
  display: flex;
  border-right: 1px solid #dbdbdb;
  border-bottom-left-radius: 15px;
  border: transparent;
  /* align-items: center;
  width: 500px;
  height: 490px;
  border: none;
  background: transparent;
  border: 1px solid burlywood;
  border-radius: 5px; */
`;

const StTopBar = styled.div`
  width: 1195px;
  height: 50px;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
`;

const StRightBox = styled.div`
  background-color: white;
  width: 339px;
  height: 855px;
  align-items: center;
  border-radius: 1px;
  /* box-sizing: border-box; */
  display: flex;
  float: right;
  flex-direction: column;
  flex-shrink: 0;
  font-size: 100%;
  border-bottom-right-radius: 15px;
  /* padding: 30px 0px; */
  /* position: relative; */
  vertical-align: baseline;
`;

// const StBackButton = styled.button`
//   width: 30px;
//   height: 30px;
//   border: 0px;
//   background-image: url("https://velog.velcdn.com/images/dnr0000/post/74060826-4b7c-4908-8e0e-59e8f39eee45/image.png");
//   background-size: cover;
//   margin-left: 15px;
//   cursor: pointer;
// `;

// const StShareButton = styled.button`
//   width: 80px;
//   height: 40px;
//   border: 0px;
//   background-color: white;
//   color: #0095f6;
//   font-weight: bold;
//   font-size: 15px;
//   margin-right: 15px;

//   cursor: pointer;
// `;

const AppStyle = styled.div`
  margin: 0 8px 0 8px;
  img {
    max-width: 50px;
  }
  label {
    margin-top: 10px;
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const StH = styled.h3`
  color: black;
  text-align: center;
  font-weight: bold;
  width: 150px;
  height: 40px;
  margin-bottom: 1px;
  font-size: 17px;
`;

const StUserBox = styled.div`
  width: 330px;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const StImogeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 339px;
  height: 70px;
  border-bottom: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
`;

const StPostBox = styled.textarea`
  width: 290px;
  height: 174px;
  border: 0;
  background-color: white;
  font-size: 15px;
  font-family: Arial;
  padding-left: 16px;
  padding-right: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

const StProfile = styled.img`
  margin-right: 12px;
  width: 35px;
  height: 35px;
  border-radius: 30px;
  background-color: pink;
`;

import CommentForm from './common/CommentForm';
import UserInfo from './common/UserInfo';
import Icons from './common/Icons';

import { timeCalculator } from '.././utils/utils';

import { CommentListStyle } from '../styles/CommentListStyle';
import UserContent from './common/UserContent';

export default function CommentList({ currPost }) {
  return (
    <>
      {Object.keys(currPost).length !== 0 ? (
        <CommentListStyle>
          <div>
            <div className="post-img">
              <img src={currPost.imgUrl} />
            </div>
            <div className="content">
              <div>
                <UserInfo postUsername={currPost.username} postProfileUrl={currPost.profileUrl} />
              </div>
              <div className="scroll-content">
                <UserContent currPost={currPost} props={0.8} />
                {currPost.commentResponseList.map((comment) => (
                  <UserContent key={comment.id} currPost={comment} props={0.8} />
                ))}
              </div>
              <div>
                <Icons post={currPost} color="rgba(0, 0, 0, 0.1)" />
                <div className="like-count">
                  <div>
                    <span>{`${currPost.likes}명`}</span>
                    <p>이 좋아합니다</p>
                  </div>
                  <span className="time">{timeCalculator(currPost.createdAt)}</span>
                </div>
                <CommentForm postId={currPost.id} />
              </div>
            </div>
          </div>
        </CommentListStyle>
      ) : null}
    </>
  );
}

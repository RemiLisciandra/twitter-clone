import CommentItem from './CommentItem';
import React from "react";

interface CommentFeedProps {
    comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment: Record<string, any>,) => (
                <CommentItem key={comment.id} data={comment} />
            ))}
        </>
    );
};

export default CommentFeed;
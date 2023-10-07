import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
};

const Post = ({ _id, title, summary, cover, createdAt, author }) => (
    <>
        <div className="post">
            <div className="image max-h-[300px] flex overflow-hidden object-contain object-center w-full">
                <Link to={`/post/${_id}`}>
                    <img src={cover} alt="Blog-photo" />
                </Link>
            </div>
            <div className="text">
                <Link to={`/post/${_id}`}>
                    <h2 className="font-[500] text-[2rem]">{truncate(title, 25)}</h2>
                </Link>

                <p className="info mx-6 text-gray-400 font-medium flex gap-3">
                    <a className="text-neutral-600" href="">
                        {author?.name}
                    </a>
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className="mx-3 leading-7">{summary}</p>
            </div>
        </div>
    </>
);

export default Post;

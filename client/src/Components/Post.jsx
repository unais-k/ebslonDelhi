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
        {/* <div className="post">
            <div className="image max-h-[300px] flex overflow-hidden object-contain object-center w-full">
                <img src={blog2} alt="" />
            </div>
            <div className="text">
                <h2 className="font-[500] text-[2rem]">Title</h2>
                <p className="info mx-6 text-gray-400 font-medium flex gap-3">
                    <a className="text-neutral-600" href="">
                        author
                    </a>
                    <span>time</span>
                </p>
                <p className="mx-3 leading-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus, orci eget tempus ornare, leo ipsum
                    pretium orci, eleifend tempor enim metus auctor nibh. Curabitur lobortis convallis felis ac varius.
                    Mauris in odio non nisl iaculis porttitor sed id dolor. Sed sodales lobortis tortor porta tempor.
                    Curabitur rutrum purus pretium lectus dapibus, sed maximus turpis sollicitudin. Aliquam et sapien non
                    mauris pretium ultricies vitae id odio. Quisque neque urna, ultrices non placerat non, cursus id diam.
                    Pellentesque eu condimentum neque, sollicitudin sollicitudin lacus. Ut interdum iaculis enim, pulvinar
                    sollicitudin augue maximus elementum.
                </p>
            </div>
        </div> */}
    </>
);

export default Post;

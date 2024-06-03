import hive from '../../assets/hive.svg';

const ArticleLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8 gap-2">
            <img src={hive} alt="Loading..." />
        </div>
    );
};

export default ArticleLoading;
function handleClick(e) {
    window.location.href = "writeboard"
}

function handleClick_1(e) {
    window.location.href = "/board/list"
}







const Home = ( ) => {
    return (
        <>
            <p onClick={handleClick}>글쓰기</p>
            <p onClick={handleClick_1}>게시판</p>
             
        </>
    );
};

export default Home;
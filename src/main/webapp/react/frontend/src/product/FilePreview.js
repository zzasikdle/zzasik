const FilePreview = ({ image }) => {
    return (
        <div>
            {image && <img src = {image} alt="이미지 미리보기" style={{width:"300px"}} />}
            <div></div>
        </div>
    )
}

export default FilePreview;
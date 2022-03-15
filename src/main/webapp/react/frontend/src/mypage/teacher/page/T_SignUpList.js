import SignUpList from '../component/SignUpList';
//신청 내역(전문가)
export default function T_SignUpList(){


    return (
    <>
        <h1 className="myhome-title">신청 내역</h1>
        <div className='content'>
            <div className="box table-section">
                {SignUpList()}
            </div>
        </div>
    </>
    );

}
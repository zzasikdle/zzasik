import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function MyLesson(){
    const percentage = 66;

    return (
        <>
            <h1 className="myhome-title">나의 코칭 서비스</h1>
            <div className='content'>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>내가 수강중인 서비스</h2>
                        </div>
                        <div className="meal-table">
                        <tr>
                        <th><div className="thcell">서비스명</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">000의 한달 다이어트 식단(-5kg)</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">기간</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">2022.04.04 ~ 2022.05.04</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">진행률</div></th>
                        <td><div className="tdcell" style={{width:140,height:140}}><CircularProgressbar value={percentage} text={`${percentage}%`} /></div></td>
                        </tr> 
                        </div>
                    </div>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>진행된 식단</h2>
                        </div>
                        <div className="buttonlist">
                            <ul>
                                <li class="item item1"><button className="dayBtn">1일차</button></li>
                                <li class="item item2"><button className="dayBtn">2일차</button></li>
                                <li class="item item3"><button className="dayBtn">3일차</button></li>
                                <li class="item item4"><button className="dayBtn">4일차</button></li>
                                <li class="item item5"><button className="dayBtn">5일차</button></li>
                                <li class="item item6"><button className="dayBtn">6일차</button></li>
                                <li class="item item7"><button className="dayBtn">7일차</button></li>
                                <li class="item item8"><button className="dayBtn">8일차</button></li>
                                <li class="item item9"><button className="dayBtn">9일차</button></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="box table-section" style={{width:870,margin:"50px auto"}}>
                    <div className='box_header'>
                            <h2 style={{display:"flex",flexDirection:"row"}}>오늘의 식단<p className="day">9일차</p></h2>
                    </div>
                    <div className="meal-table">
                    <tr>
                        <th><div className="thcell">아침</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >바나나2개, 그릭요거트200g </p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">점심</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >일반식</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">저녁</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >고구마</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">간식</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >닭가슴살</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">총칼로리</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >1303kcal</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">코멘트</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >어쩌고 저쩌고</p></div></td>
                    </tr>
                </div>
                <div className="button-area">
                        <button className="setting_btn green_bg" style={{float:"right"}}>코치에게 메시지 보내기</button>
                    </div>
                </div>
            </div>

        </>
    );
}
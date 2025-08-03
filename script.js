// DOM 요소들
const form = document.getElementById('travelForm');
const resultSection = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const recommendationDiv = document.getElementById('recommendation');
const daysSlider = document.getElementById('days');
const daysValue = document.getElementById('daysValue');

// 슬라이더 값 업데이트
daysSlider.addEventListener('input', function() {
    daysValue.textContent = this.value;
});

// 폼 제출 이벤트
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 입력값 수집
    const formData = collectFormData();
    
    // 결과 섹션 표시
    resultSection.style.display = 'block';
    loadingDiv.style.display = 'block';
    recommendationDiv.style.display = 'none';
    
    // 페이지 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    try {
        // AI 추천 생성 (시뮬레이션)
        const recommendation = await generateTravelRecommendation(formData);
        
        // 결과 표시
        displayRecommendation(recommendation);
        
    } catch (error) {
        console.error('Error generating recommendation:', error);
        displayError();
    }
});

// 폼 데이터 수집
function collectFormData() {
    const formData = new FormData(form);
    const data = {};
    
    // 기본 입력값들
    data.destination = formData.get('destination');
    data.people = formData.get('people');
    data.gender = formData.get('gender');
    data.age = formData.get('age');
    data.days = formData.get('days');
    data.budget = formData.get('budget');
    
    // 여행 스타일 (체크박스 - 복수 선택)
    data.styles = formData.getAll('style');
    
    return data;
}

// AI 여행 추천 생성 (Claude AI 시뮬레이션)
async function generateTravelRecommendation(data) {
    // 실제 로딩 시간 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // 여행 스타일 텍스트 생성
    const stylesText = data.styles.length > 0 ? data.styles.join(', ') : '일반 관광';
    
    // AI 스타일의 추천 생성
    const recommendation = generateDetailedRecommendation(data, stylesText);
    
    return recommendation;
}

// 상세 여행 추천 생성
function generateDetailedRecommendation(data, stylesText) {
    const destinations = getDestinationInfo(data.destination);
    const days = parseInt(data.days);
    
    let recommendation = `
        <div class="recommendation-header">
            <h2>🌟 ${data.destination} ${days}일 맞춤 여행 코스</h2>
            <div class="trip-info">
                <span class="info-tag">👥 ${data.people}명</span>
                <span class="info-tag">🎯 ${stylesText}</span>
                <span class="info-tag">💰 ${data.budget}</span>
                <span class="info-tag">👤 ${data.age} ${data.gender}</span>
            </div>
        </div>
    `;
    
    // 일차별 추천 생성
    for (let day = 1; day <= days; day++) {
        const dayPlan = generateDayPlan(day, data.destination, data.styles, data.budget, days);
        recommendation += `
            <div class="day-plan">
                <h3>Day ${day}</h3>
                <div class="day-content">
                    ${dayPlan}
                </div>
            </div>
        `;
    }
    
    // 추가 팁 생성
    recommendation += generateTravelTips(data);
    
    return recommendation;
}

// 목적지 정보 가져오기
function getDestinationInfo(destination) {
    const lowerDest = destination.toLowerCase();
    
    if (lowerDest.includes('일본') || lowerDest.includes('도쿄') || lowerDest.includes('오사카')) {
        return {
            country: '일본',
            attractions: ['센소지 절', '도쿄 스카이트리', '시부야 크로싱', '아키하바라', '우에노 공원'],
            foods: ['스시', '라멘', '야키토리', '타코야키', '온센 요리'],
            culture: '일본 전통문화 체험'
        };
    } else if (lowerDest.includes('프랑스') || lowerDest.includes('파리')) {
        return {
            country: '프랑스',
            attractions: ['에펠탑', '루브르 박물관', '샹젤리제 거리', '몽마르트 언덕', '베르사유 궁전'],
            foods: ['크루아상', '마카롱', '프랑스 와인', '치즈', '에스카르고'],
            culture: '프랑스 예술과 문화'
        };
    } else if (lowerDest.includes('한국') || lowerDest.includes('서울') || lowerDest.includes('부산')) {
        return {
            country: '한국',
            attractions: ['경복궁', '명동', '강남', '부산 해운대', '제주도'],
            foods: ['한식', '김치', '불고기', '비빔밥', '치킨'],
            culture: '한국 전통문화'
        };
    } else {
        return {
            country: destination,
            attractions: ['주요 관광지', '역사적 명소', '자연 경관', '문화 체험지', '쇼핑 지역'],
            foods: ['현지 특색 요리', '전통 음식', '거리 음식', '현지 별미'],
            culture: '현지 문화 체험'
        };
    }
}

// 일차별 계획 생성
function generateDayPlan(day, destination, styles, budget, totalDays) {
    const destInfo = getDestinationInfo(destination);
    const attractions = destInfo.attractions;
    const foods = destInfo.foods;
    
    // 예산에 따른 활동 레벨
    const budgetLevel = budget.includes('200만원 이상') ? 'premium' : 
                       budget.includes('100-200만원') ? 'standard' : 'budget';
    
    let plan = '';
    
    if (day === 1) {
        plan = `
            <div class="time-slot">
                <div class="time">09:00</div>
                <div class="activity">
                    <strong>공항 도착 및 호텔 체크인</strong>
                    <p>현지 교통카드 구매, 환전 및 기본 정보 확인</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">12:00</div>
                <div class="activity">
                    <strong>현지 전통 음식 체험</strong>
                    <p>${foods[0]}을 맛볼 수 있는 현지 맛집 방문</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">14:00</div>
                <div class="activity">
                    <strong>${attractions[0]} 방문</strong>
                    <p>첫날은 가벼운 관광지 둘러보기와 현지 분위기 적응</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">18:00</div>
                <div class="activity">
                    <strong>저녁 식사 및 현지 거리 탐방</strong>
                    <p>현지 음식 문화 체험과 쇼핑 지역 구경</p>
                </div>
            </div>
        `;
    } else if (day === totalDays) {
        plan = `
            <div class="time-slot">
                <div class="time">09:00</div>
                <div class="activity">
                    <strong>마지막 쇼핑 및 기념품 구매</strong>
                    <p>여행 기념품과 현지 특산품 구매</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">12:00</div>
                <div class="activity">
                    <strong>마지막 현지 음식 체험</strong>
                    <p>${foods[Math.floor(Math.random() * foods.length)]} 마지막 맛보기</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">15:00</div>
                <div class="activity">
                    <strong>공항 이동 및 출국 준비</strong>
                    <p>체크아웃, 공항 이동, 면세점 쇼핑</p>
                </div>
            </div>
        `;
    } else {
        const attraction1 = attractions[day % attractions.length];
        const attraction2 = attractions[(day + 1) % attractions.length];
        const food = foods[day % foods.length];
        
        plan = `
            <div class="time-slot">
                <div class="time">09:00</div>
                <div class="activity">
                    <strong>${attraction1} 관광</strong>
                    <p>현지 가이드 투어 또는 자유 관광 (${budgetLevel === 'premium' ? '프라이빗 가이드' : '자유 관광'})</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">12:30</div>
                <div class="activity">
                    <strong>점심식사</strong>
                    <p>${food} 전문점에서 현지 음식 체험</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">14:30</div>
                <div class="activity">
                    <strong>${attraction2} 탐방</strong>
                    <p>${styles.includes('휴양여행') ? '여유로운 휴식과 관광' : 
                         styles.includes('커플여행') ? '로맨틱한 스팟 방문' :
                         styles.includes('가족여행') ? '가족 친화적 활동' : '문화 체험 활동'}</p>
                </div>
            </div>
            <div class="time-slot">
                <div class="time">18:00</div>
                <div class="activity">
                    <strong>저녁 활동</strong>
                    <p>${budgetLevel === 'premium' ? '고급 레스토랑에서 저녁식사' : 
                         budgetLevel === 'standard' ? '현지 인기 맛집 방문' : '현지 길거리 음식 체험'}</p>
                </div>
            </div>
        `;
    }
    
    return plan;
}

// 여행 팁 생성
function generateTravelTips(data) {
    const tips = [
        "현지 교통카드를 미리 구매하면 이동비를 절약할 수 있습니다",
        "현지 언어로 기본 인사말을 배워가면 더 친근한 여행이 됩니다",
        "여행자 보험은 필수! 안전한 여행을 위해 꼭 가입하세요",
        "현지 날씨를 확인하고 적절한 옷차림을 준비하세요",
        "중요한 서류들은 복사본을 따로 보관하세요"
    ];
    
    const budgetTips = {
        "100만원 미만": [
            "호스텔이나 게스트하우스를 이용하면 숙박비를 절약할 수 있습니다",
            "현지 대중교통과 도보를 활용해 이동비를 줄이세요",
            "현지 마트에서 간단한 식료품을 구매해 식비를 절약하세요"
        ],
        "100-200만원": [
            "중급 호텔과 현지 맛집을 적절히 조합하세요",
            "일부 관광지는 패키지 투어를, 일부는 자유 관광을 선택하세요",
            "기념품은 현지 전통시장에서 구매하면 더 저렴합니다"
        ],
        "200만원 이상": [
            "고급 호텔과 미슐린 레스토랑을 경험해보세요",
            "프라이빗 가이드 투어로 더 깊이 있는 여행을 즐기세요",
            "현지 럭셔리 쇼핑몰에서 특별한 기념품을 구매해보세요"
        ]
    };
    
    let tipsHtml = `
        <div class="travel-tips">
            <h3>💡 여행 꿀팁</h3>
            <ul class="tips-list">
    `;
    
    // 일반 팁 추가
    for (let i = 0; i < 3; i++) {
        tipsHtml += `<li>${tips[Math.floor(Math.random() * tips.length)]}</li>`;
    }
    
    // 예산별 팁 추가
    const budgetSpecificTips = budgetTips[data.budget] || budgetTips["100-200만원"];
    budgetSpecificTips.forEach(tip => {
        tipsHtml += `<li>${tip}</li>`;
    });
    
    tipsHtml += `
            </ul>
        </div>
    `;
    
    return tipsHtml;
}

// 추천 결과 표시
function displayRecommendation(recommendation) {
    loadingDiv.style.display = 'none';
    recommendationDiv.style.display = 'block';
    recommendationDiv.innerHTML = recommendation;
    
    // 애니메이션 효과
    recommendationDiv.style.opacity = '0';
    recommendationDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        recommendationDiv.style.transition = 'all 0.6s ease';
        recommendationDiv.style.opacity = '1';
        recommendationDiv.style.transform = 'translateY(0)';
    }, 100);
}

// 에러 표시
function displayError() {
    loadingDiv.style.display = 'none';
    recommendationDiv.style.display = 'block';
    recommendationDiv.innerHTML = `
        <div class="error-message">
            <h3>❌ 오류가 발생했습니다</h3>
            <p>여행 추천을 생성하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
            <button onclick="location.reload()" class="retry-btn">다시 시도</button>
        </div>
    `;
}

// 추가 CSS 스타일을 동적으로 추가
const additionalStyles = `
    <style>
        .recommendation-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border-radius: 15px;
        }
        
        .recommendation-header h2 {
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .trip-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .info-tag {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            backdrop-filter: blur(5px);
        }
        
        .day-plan {
            margin: 25px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            border-left: 4px solid #667eea;
        }
        
        .day-plan h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .time-slot {
            display: flex;
            margin: 15px 0;
            align-items: flex-start;
            gap: 15px;
        }
        
        .time {
            background: #667eea;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-weight: 500;
            min-width: 70px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .activity {
            flex: 1;
        }
        
        .activity strong {
            color: #444;
            display: block;
            margin-bottom: 5px;
        }
        
        .activity p {
            color: #666;
            font-size: 0.95rem;
            margin: 0;
        }
        
        .travel-tips {
            margin-top: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #f6f9fc 0%, #e9f4ff 100%);
            border-radius: 15px;
            border: 1px solid #e1e5f2;
        }
        
        .travel-tips h3 {
            color: #667eea;
            margin-bottom: 15px;
        }
        
        .tips-list {
            list-style: none;
            padding: 0;
        }
        
        .tips-list li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
            position: relative;
            padding-left: 25px;
        }
        
        .tips-list li::before {
            content: '💡';
            position: absolute;
            left: 0;
            top: 10px;
        }
        
        .tips-list li:last-child {
            border-bottom: none;
        }
        
        .error-message {
            text-align: center;
            padding: 40px 20px;
        }
        
        .error-message h3 {
            color: #e74c3c;
            margin-bottom: 15px;
        }
        
        .retry-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s ease;
        }
        
        .retry-btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .trip-info {
                justify-content: center;
            }
            
            .info-tag {
                font-size: 0.8rem;
                padding: 4px 8px;
            }
            
            .time-slot {
                flex-direction: column;
                gap: 8px;
            }
            
            .time {
                align-self: flex-start;
                min-width: auto;
            }
        }
    </style>
`;

// 스타일 추가
document.head.insertAdjacentHTML('beforeend', additionalStyles);
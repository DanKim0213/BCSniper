# Bitcoin Sniper 
비트코인 스나이퍼는 비트코인 경매를 자동으로 도와주는 데모 어플리케이션입니다. 비트코인은 외줄타기와 같습니다. 시세가 급등과 급락을 오가기 때문에, 한 발 헛 딪으면 바로 나락으로 떨어집니다. 비트코인 스나이퍼를 개발하게 된 배경은 여기에 있습니다. 즉, 비트코인 거래자에게 최소한의 안전장치로서 역할하도록 만들었습니다. 예를들어, 비트코인 스나이퍼는 비트코인 가격이 급락하여 더는 손쓸수 없기 전에 팔 수 있습니다. 

## 목차 (Table of Contents)

1. [테크 스킬](https://github.com/DanKim0213/BitcoinSniper/tree/master#1-%ED%85%8C%ED%81%AC-%EC%8A%A4%ED%82%AC-tech-skills)
1. [어플리케이션 구조](https://github.com/DanKim0213/BitcoinSniper/tree/master#2-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EA%B5%AC%EC%A1%B0-architecture)
1. [동작](https://github.com/DanKim0213/BitcoinSniper/tree/master#3-%EB%8F%99%EC%9E%91-flow)
1. [기능](https://github.com/DanKim0213/BitcoinSniper/tree/master#5-%EA%B8%B0%EB%8A%A5-features)
1. [보완점](https://github.com/DanKim0213/BitcoinSniper/tree/master#4-%EB%B3%B4%EC%99%84%EC%A0%90-complements)
1. [마무리](https://github.com/DanKim0213/BitcoinSniper/tree/master#5-%EB%A7%88%EB%AC%B4%EB%A6%AC-conclusion)

## 1. 테크 스킬 (Tech Skills)
- NodeJs, ExpressJs, MongoDB, PugJs, HTML, CSS, JavaScript, Parcel

## 2. 어플리케이션 구조 (Architecture)
- 프론트엔드는 HTML CSS JavaScript 그리고 백엔드는 NodeJs MongoDB 를 사용했습니다. ![ppt1](./misc/BCSP1.png)

- 디자인 패턴은 MVC (Model, View, Controller) 를 사용했습니다. ![ppt2](./misc/BCSP2.png)

- 데이터 간의 관계는 3 가지입니다: 스나이퍼 - 아이템, 유저 - 스나이퍼, 유저 - 리뷰. ![ppt3](./misc/BCSP3.png)

- 아이템의 상태 변화는 5가지 입니다: 참여(JOINING), 손해 중 (LOSING),  이득 중 (WINNING),  손해(LOST) 이득(WON). ![ppt4](./misc/BCSP4.png)


## 3. 동작 (Flow)
- 회원가입 및 로그인 ![gif1](./misc/output1.gif)
- 아이템 만들기 ![gif2](./misc/output2.gif)
- 아이템 팔기 ![gif3](./misc/output3.gif)

## 4. 기능 (Features) 
- 모든 비트코인 보여주기
- 데이터베이스 연결하기
- 스나이퍼 보여주기
- 아이템 만들기
- 아이템 등록하기
- 아이템 삭제하기
- 전역적으로 에러 다루기
- 사용자 인증하기
- 데이터 모델링하기
- 값에 따른 상태변화 반영하기
- 변화하는 아이템을 뷰에 반영하기
- 조건에 맞는 아이템을 팔기
- 사고 팔았던 아이템을 기록하기
- 사용자 친화적인 에러를 보여주기
- 사용자 정보 수정하기

## 5. 보완점 (Complements)
- 패스워드를 복잡하게 만들기
- 패스워드를 잊어버렸을 경우, 이메일로 토큰 보내기
- 비트코인을 원하는 양만큼 구매하기
- 아이템을 만든 후에 다시 설정하기
- End-to-End 테스트 만들기

## 6. 마무리 (Conclusion)
비트코인 스나이퍼는 2019년도부터 구상했던 프로젝트입니다. 개발은 근 한달로 끝났지만 개발 준비단계까지 오랜시간이 걸렸습니다. 특히 개발환경을 안드로이드 앱과 웹 앱으로 결정하는 단계에서 한동안 고민했습니다. 결국 웹으로 결정했고, 그 계기는 ["코로나 맵"](https://coronamap.site/) 웹 어플리케이션이었습니다. 코로나맵은 웹 앱의 장점을 잘 보여준 사례였습니다. 쉽게 접근할 수 있을 뿐만 아니라 정보를 JSON 형태로 쉽게 주고 받을 수 있다는 점이 매력적이었습니다. 

끝으로, 웹개발자로서 앞으로 저와 함께 끊임없이 성장하실 분과 일하고 싶습니다. 감사합니다. 
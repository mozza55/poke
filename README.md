## Getting Started

```bash
npm i
npm run build
npm run start
```

(주의: npm run dev로 실행하면 캐싱이 제대로 동작하지 않음)

### 도감 목록 페이지 (/)

- 빌드 시점에 초기에 보여줄 데이터 캐싱
- 캐싱된 데이터 react-query 초기 데이터로 전달
- react-query useInfiniteQuery 사용해서 데이터 추가로 불러 올 때 하위컴포넌트 리렌더링이 발생하기 떄문에 React.Memo로 메모제이션
- PokemonCard 컴포넌트가 뷰포트에 노출 되면 해당 포켓몬의 상세페이지를 프리패칭 (Next/Link)

### 포켓몬 상세 페이지 (/pokemon/[id])

- 상세 정보와 진화 정보 데이터 페칭 분리해서 단계적으로 화면 렌더링

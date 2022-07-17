# 학습목표

- [x] 서버 사이드 렌더링 (SSR) 그리고 Static Generation을 이해
- [x] NextJS 입문
  - [x] 사용 이유<br>
    > 앱에 있는 페이지들을 미리 렌더 한다. 즉, CSR처럼 js로서 모든 것을 그린 후에 노출시키는 것이 아닌, 인터넷 연결 속도에 상관없이 미리 DOM을 그린 후에 자바스크립트를 패치한다 (hydration)

<br><br>

**_Next는 프레임워크이다 (정해진 규칙이 있다)_**

- pages폴더 안에서 export default를 통해 리액트 컴포넌트를 export하면,
  해당 파일 명으로 라우팅을 손쉽게 설정할 수 있다 <br>(404 page를 자동 제공한다)

  > pages 폴더 규칙의 예외 파일이 존재한다. <br>**_1. `index.ts`파일_** <br> '/' 랜딩 페이지를 가리킨다.

- 네비게이션은 \<a>태그를 \<Link>로 감싸서 사용한다 (\<a> 태그만 사용하면 전체 페이지를 리로드)

  > \<Link>는 오직 href이다 <br>(스타일, 클래스 네임 등 외적인 기능들은 칠드런에서 제어 해야한다)

<br>

## **_\_app.tsx_**

> 프로젝트 전반의 청사진 적용 페이지<br> > `Component`와 `pageProps` 두개의 arg를 필수로 받는다<br>
> 즉, 프로젝트 전반에 사용되는 공통 컴포넌트 (Router, GlobalStlyes, ...)를 작성한다

<br>

## next.config.js

- redirect 기능 지원
- rewrite 기능도 지원 (url은 변하지 않지만 유저가 보는 화면은 변함)
  > API-key 암호화 가능

```
  redirects() {
    return [
      {
        source: "/old-blog/:path*",
        //! 유저 입력 주소

        destination: "/new-sexy-blog/:path*",
        //! 실제 도착 주소

        permanent: false,
        //! 클라이언트/검색 엔진에 리디렉션을 영구적으로 캐시하도록 지시 (http-status: 308(true) || 307(false))
      },
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
```

## getServerSideProps

**_형식이 고정되어 있다_**

- 함수를 export 해야한다 (이름은 getServerSideProps 고정)
  > 이 안에서 작성된 코드는 서버사이드에서 작동함 (key값 암호화 등 여러가지 서버사이드 특징)
- props라는 객체를 반드시 리턴해야 함

```
export async function getServerSideProps (ctx: NextPageContext){
  ...
  const res = await YOUR-API().json();
  ...
  return {
    props: {
      res
    }
  }
}
```

**_해당 페이지의 컴포넌트 arg로 넘겨주면 된다_**

> \_app에서 `<Componment {...pageProps}>`를 작성했기 때문에

<br>

**_ctx: NextPageContext. 컨텍스트를 지원하기 때문에 ctx.query.{param}를 통해 넘겨받은 param을 서버사이드에서 제어할 수 있다_**

<br>

**_SSR을 통해 API가 완료되면 loading 화면 없이 보여줄지, loading 화면을 먼저 보여준 후에 화면을 보여줄지 고려해야 한다_**

<br>

## Routing

> pages 폴더 안에 폴더를 생성함으로서 middleware 를 생성할 수 있다 (만약 middleware 명과 일치하는 도메인이 필요할 경우 index.tsx로 해결 가능)

```
/pages/movies/index.tsx => ~/movies
/pages/movies/11 => ~/movies/11
```

> useParam()이 필요한 경우에는 파일 명에 []를 붙이면 된다

> spread operator 가능

```
/pages/movies/[id].tsx => /movies/:id
/pages/moveis/[...id].tsx => /movies/:{any param}
```

> 해당 param은 useRouter()를 이용하여 router.query에서 찾을 수 있다

```
router.push({
  pathname: {URL},
  query: {...params}, // 네비게이션과 동시에 컴포넌트 보내고 싶은 데이터
  {URL} // `as`기능: 유저에게 보여주고 싶은 URL (보내는 데이터 암호화 가능)
})
```

**_결국 서버사이드 렌더링을 통하면 html로만 렌더링이 이루어지고 데이터가 검색엔진에 담기기 때문에 SEO가 높아진다_**

**_`404.tsx`파일을 생성하여 404페이지 커스텀 가능_**

<img src="https://user-images.githubusercontent.com/82315118/178574566-a585d623-e2bf-4d1d-9e25-1afddd8c21dc.png" />

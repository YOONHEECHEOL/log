import { Analytics } from '@vercel/analytics/react';

const Head = () => {

    return (
            <>
                <title>yoon-hee-cheol blog</title>
                <meta charSet="utf-8" />

                <meta name='description' content='' />            
                <meta name='author' content='YOON HEE CHEOL' />
                <meta name='keywords' content='FrontEnd Front front Developer 개발 프론트엔드 개발자 윤희철 React Javascript Next js JS' />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yoon-hee-cheol.xyz" />
                <meta property="og:title" content="yoon-hee-cheol" />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:site_name" content="yoon-hee-cheol.xyz" />
                <meta property="og:description" content="FrontEnd FE 개발자 윤희철입니다. javascript, react, next 등을 다룹니다." />
                <meta property="og:locale" content="en_US" />
                {/* <!-- 다음의 태그는 필수는 아니지만, 포함하는 것을 추천함 --> */}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
            
                {/* font */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&display=swap" rel="stylesheet" />

                <Analytics />
            </>
        )
}

export default Head;

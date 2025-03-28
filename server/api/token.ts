export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { code, redirectUri } = body;

        //console.log("🔹 요청 받은 Authorization Code:", code);
        //console.log("🔹 요청 받은 Redirect URI:", redirectUri);

        const tokenResponse = await fetch('http://49.247.24.47:9000/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from('egis-client:egisClient').toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri
            })
        });

        const responseText = await tokenResponse.text();  // JSON이 아닐 수도 있으니 텍스트로 확인
        //console.log('🔹 OAuth2 응답 상태:', tokenResponse.status);
        //console.log('🔹 OAuth2 응답 본문:', responseText);

        if (!tokenResponse.ok) {
            return { error: 'Failed to get access token', detail: responseText };
        }

        const tokenData = JSON.parse(responseText);
        const { access_token, expires_in, refresh_token } = tokenData;

        // setCookie(event, 'accessToken', access_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: expires_in, // 토큰 만료 시간 (초 단위)
        //     path: '/',
        //     domain: '192.168.1.131' // 두 서버가 공유하는 도메인
        //   });
      
        //   // 리프레시 토큰도 필요한 경우 쿠키에 저장 (옵션)
        //   setCookie(event, 'refreshToken', refresh_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 86400, // 예시: 24시간
        //     path: '/',
        //     domain: '192.168.1.131'
        //   });
      

        return JSON.parse(responseText); // 응답을 JSON으로 변환하여 반환
    } catch (error) {
        console.error('🔴 서버 오류 발생:', error);
        return { error: 'Internal Server Error', detail: error.message };
    }
});
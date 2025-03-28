export default defineEventHandler(async (event) => {
    try {
        // 세션 또는 쿠키에서 access_token 가져오기 (Nuxt API에는 세션이 없으므로 직접 받도록 수정)
        const body = await readBody(event);
        const { accessToken } = body;  // 클라이언트에서 전달된 access_token

        if (!accessToken) {
            return { error: "액세스 토큰이 없습니다. 로그인이 필요합니다." };
        }

        //console.log("🟢 UserInfo 요청 - Access Token:", accessToken);

        // UserInfo 엔드포인트 호출
        const userInfoResponse = await fetch('http://49.247.24.47:9000/userinfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!userInfoResponse.ok) {
            const errorText = await userInfoResponse.text();
            return { error: "사용자 정보 조회 실패", detail: errorText };
        }

        const userInfo = await userInfoResponse.json();
        //console.log("🟢 UserInfo 응답:", userInfo);

        return userInfo;
    } catch (error) {
        console.error("🔴 UserInfo API 오류:", error);
        return { error: "Internal Server Error", detail: error.message };
    }
});
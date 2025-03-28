import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,  // 사용자 정보
    accessToken: null, // 액세스 토큰
    refreshToken: null, // 리프레시 토큰
    tokenExpiresAt: null, // 액세스 토큰 만료 시간 (Unix Timestamp)
  }),
  actions: {
    setUser(user, accessToken, refreshToken = null, expiresIn = 3600) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenExpiresAt = Date.now() + expiresIn * 1000; // 만료 시간 계산
        localStorage.setItem('user_info', JSON.stringify(user));
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('token_expires_at', this.tokenExpiresAt);
    },
    async refreshAccessToken() {
        if (!this.refreshToken) {
            console.error("🔴 리프레시 토큰 없음. 재로그인 필요");
            return null;
        }

        console.log("🔄 액세스 토큰 갱신 중...");

        try {
            const response = await fetch('http://49.247.24.47:9000/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('egis-client:egisClient').toString('base64')
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                    client_id: 'egis-client',
                    client_secret: 'egisClient' 
                })
            });

            const result = await response.json();
            if (response.ok && result.access_token) {
                console.log("🟢 새 액세스 토큰 발급 완료:", result.access_token);
                this.setUser(this.user, result.access_token, result.refresh_token, result.expires_in);
                return result.access_token;
            } else {
                console.error("🔴 토큰 갱신 실패:", result);
                return null;
            }
        } catch (error) {
            console.error("🔴 액세스 토큰 갱신 중 오류 발생:", error);
            return null;
        }
    },

    async checkAndRefreshToken() {
        if (!this.accessToken || !this.tokenExpiresAt) {
            console.warn("⚠️ 액세스 토큰 없음. 갱신 불가능.");
            return null;
        }

        const now = Date.now();
        if (now >= this.tokenExpiresAt - 30000) { // 만료 30초 전에 갱신
            console.log("🔄 액세스 토큰 만료 임박 → 새로 갱신 시도");
            return await this.refreshAccessToken();
        }

        return this.accessToken;
    },
    logout() {
        if (this.accessToken) {
            const formData = new URLSearchParams();
            formData.append('token', this.accessToken);
            formData.append('token_type_hint', 'access_token');
    
            fetch('http://49.247.24.47:9000/oauth2/revoke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            }).then(response => {
                console.log("🟢 토큰 폐기 응답:", response.status);

                // ⬇️ 2. OAuth2 서버에서 세션 종료 요청
                const logoutUrl = `http://49.247.24.47:9000/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
                window.location.href = logoutUrl; // 로그아웃 후 홈 화면으로 이동
            }).catch(error => {
                console.error("🔴 토큰 폐기 오류:", error);
            });
        }
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiresAt = null;
        localStorage.removeItem('user_info');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expires_at');
        //window.location.reload(); // 새로고침해서 UI 업데이트
    },
    loadUserFromStorage() {
        const user = localStorage.getItem('user_info');
        const token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        const expiresAt = localStorage.getItem('token_expires_at');
        if (user && token) {
            this.user = JSON.parse(user);
            this.accessToken = token;
            this.refreshToken = refreshToken;
            this.tokenExpiresAt = parseInt(expiresAt, 10);
        }
    }
  }
});


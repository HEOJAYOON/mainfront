export const useAuthFetch = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        // Authorization 헤더를 제거했으므로 이 줄을 삭제합니다.
        // headers: {
        //   ...options.headers,
        //   'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        // },
      });
  
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
  
      const data = await response.json();
      return { data, error: null }; // 성공 시 데이터 반환
    } catch (error) {
      return { data: null, error }; // 실패 시 에러 반환
    }
  };
  
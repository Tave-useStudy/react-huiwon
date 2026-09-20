import { useState, useEffect } from 'react'

interface User {
  name: { first: string; last: string }
  email: string
  picture: { medium: string }
}

function UserProfile() {
  // 이론 3챕터 useState: 유저 데이터와 로딩 상태를 state로 관리
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // 이론 1챕터 비동기 async/await: fetch로 API 호출
  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      // API 응답 구조: { results: [{ name, email, picture }] }
      setUser(data.results[0])
    } catch (error) {
      console.error('유저 불러오기 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  // 이론 3챕터 useEffect: 컴포넌트가 처음 화면에 나타날 때 한 번 실행
  // 의존성 배열 []이 "처음 한 번만" 이라는 의미
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <>
          {/* 이론 1챕터 옵셔널 체이닝 ?.: user가 null일 때 에러 없이 undefined 반환 */}
          <img
            src={user?.picture.medium}
            alt="프로필"
            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              {user?.name.first} {user?.name.last}
            </p>
            <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
              {user?.email}
            </p>
          </div>
        </>
      )}

      {/* 새로고침 버튼: fetchUser 재호출 → 새 유저 정보 표시 */}
      <button onClick={fetchUser} style={{ marginLeft: 'auto' }}>
        새로고침
      </button>
    </div>
  )
}

export default UserProfile

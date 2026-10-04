import './FetchStatus.css'

function FetchStatus({ loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="fetch-status">
        <div className="spinner" />
        <p className="fetch-status-text">불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fetch-status">
        <p className="fetch-status-error">데이터를 불러오지 못했습니다</p>
        <p className="fetch-status-detail">{error}</p>
        <button className="retry-btn" onClick={onRetry}>다시 시도</button>
      </div>
    )
  }

  return null
}

export default FetchStatus

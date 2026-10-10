import { createContext, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import './Modal.css'

// 하위 컴포넌트(Modal.Header 등)가 onClose를 props 없이 쓰도록 Modal 내부에서만 공유
const ModalContext = createContext(null)

function Modal({ onClose, children }) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // body 바로 아래에 렌더링해서 부모의 overflow/z-index 영향을 받지 않게 함
  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  )
}

function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext)

  return (
    <header className="modal-header">
      <div className="modal-title">{children}</div>
      <button className="icon-btn" onClick={onClose} aria-label="닫기">
        <X size={18} />
      </button>
    </header>
  )
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>
}

function ModalFooter({ children }) {
  return <footer className="modal-footer">{children}</footer>
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal

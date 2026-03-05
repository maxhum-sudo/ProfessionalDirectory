'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type ToastType = 'success' | 'error'

interface ToastMessage {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  show: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const show = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7)
    const toast: ToastMessage = { id, message, type }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onDismiss={() => remove(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

interface ToastProps {
  message: string
  type: ToastType
  onDismiss: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const baseClasses =
    'px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium animate-in slide-in-from-bottom-4 duration-300'

  const typeClasses = {
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
  }

  const iconClasses = {
    success: '✓',
    error: '✕',
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <span className="text-lg font-bold">{iconClasses[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-2 text-lg leading-none opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

afterEach(() => {
  cleanup()
})

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('is disabled when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('fires onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<Input placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows help text when no error', () => {
    render(<Input helpText="Enter your email" />)
    expect(screen.getByText('Enter your email')).toBeInTheDocument()
  })

  it('hides help text when error is shown', () => {
    render(<Input helpText="Enter your email" error="Required" />)
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument()
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalledOnce()
  })
})

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Bio" />)
    expect(screen.getByText('Bio')).toBeInTheDocument()
  })

  it('shows character count when maxLength is set', () => {
    render(<Textarea maxLength={280} value="Hello" onChange={() => {}} />)
    expect(screen.getByText('5 / 280')).toBeInTheDocument()
  })

  it('shows 0 count for empty value', () => {
    render(<Textarea maxLength={280} value="" onChange={() => {}} />)
    expect(screen.getByText('0 / 280')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Textarea error="Too short" />)
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('character count reflects current value', () => {
    render(<Textarea maxLength={280} value={'a'.repeat(280)} onChange={() => {}} />)
    expect(screen.getByText('280 / 280')).toBeInTheDocument()
  })
})

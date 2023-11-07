import { describe, test, expect } from 'vitest'
import App from './App'
import { render, screen } from '@testing-library/react'

describe('App Render', () => {
	test('should render the app', () => {
		render(<App />)
		expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
		expect(screen.getByAltText('React logo')).toBeInTheDocument()
	})
})

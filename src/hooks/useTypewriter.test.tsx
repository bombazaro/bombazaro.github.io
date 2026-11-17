import { act, renderHook } from '@testing-library/react';
import { clearMedia, mockMedia } from '../test/media';
import { useTypewriter } from './useTypewriter';

afterEach(() => {
  vi.useRealTimers();
  clearMedia();
});

test('useTypewriter_returns_full_text_immediately_when_reduced_motion', () => {
  mockMedia({ reduceMotion: true });
  const { result } = renderHook(() => useTypewriter('olá, eu sou o Bernardo'));
  expect(result.current).toBe('olá, eu sou o Bernardo');
});

test('useTypewriter_types_progressively', () => {
  mockMedia({ reduceMotion: false });
  vi.useFakeTimers();
  const { result } = renderHook(() => useTypewriter('abcdef', 70));
  expect(result.current).toBe('');
  for (let i = 0; i < 3; i++) act(() => void vi.advanceTimersByTime(70));
  expect(result.current).toBe('abc');
  for (let i = 0; i < 10; i++) act(() => void vi.advanceTimersByTime(70));
  expect(result.current).toBe('abcdef');
});

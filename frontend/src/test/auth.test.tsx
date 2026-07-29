import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  history.pushState({}, '', '/');
});

describe('autenticación y permisos', () => {
  it('inicia sesión y muestra navegación habilitada por permisos', async () => {
    history.pushState({}, '', '/login');
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);
      const data = url.endsWith('/api/auth/login')
        ? { token: 'jwt' }
        : {
            user: { id: '1', firstName: 'Ana', lastName: 'Pérez', email: 'ana@test.co' },
            activeComplex: { id: 'c', name: 'ConectaPH Demo' },
            roles: ['RESIDENT'],
            permissions: ['COMMON_AREA_VIEW', 'RESERVATION_VIEW_OWN'],
            primaryUnit: null,
          };
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    render(<App />);
    await userEvent.type(screen.getByLabelText(/correo/i), 'ana@test.co');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'secreto');
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    await waitFor(() => expect(screen.getByText('Zonas comunes')).toBeInTheDocument());
    expect(screen.getAllByText('Mis reservas')).not.toHaveLength(0);
    expect(screen.queryByText('Vigilancia')).not.toBeInTheDocument();
  });

  it('redirige una ruta protegida al login sin sesión', async () => {
    history.pushState({}, '', '/areas');
    render(<App />);
    expect(await screen.findByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});

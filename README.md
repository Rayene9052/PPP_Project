# VNC Website Clone

A modern web-based VNC (Virtual Network Computing) application that allows remote desktop access through a web browser.

## Features

- Secure remote desktop access
- Real-time chat during sessions
- File sharing capabilities
- Clipboard synchronization
- Permission management
- Session recording
- Mobile touch controls

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
SOCKET_PORT=3001
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
\`\`\`

## Getting Started

1. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

2. Run the development server and socket server concurrently:

\`\`\`bash
npm run dev:all
# or
yarn dev:all
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Separately

If you want to run the Next.js app and socket server separately:

1. Start the Next.js development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

2. Start the socket server in a separate terminal:

\`\`\`bash
npm run socket-server
# or
yarn socket-server
\`\`\`

## Troubleshooting

### Authentication Issues

For local development, the middleware automatically creates a mock authentication token. If you're experiencing authentication issues:

1. Clear your browser cookies
2. Restart both the Next.js and socket servers
3. Try accessing a protected route again

### Socket Connection Issues

If you're experiencing issues with the socket connection:

1. Make sure the socket server is running on the correct port
2. Check that the `NEXT_PUBLIC_SOCKET_SERVER_URL` environment variable is set correctly
3. Check the browser console for any connection errors

## Architecture

VNCConnect uses the following technologies:

- **Next.js**: React framework for the frontend
- **WebRTC**: For direct peer-to-peer connections
- **Socket.IO**: For signaling and establishing WebRTC connections
- **Tailwind CSS**: For styling
- **shadcn/ui**: For UI components

The application consists of the following main components:

- **Socket Server**: Handles signaling for WebRTC connections
- **WebRTC Manager**: Manages WebRTC connections and data channels
- **VNC Host**: Captures and shares the screen
- **VNC Client**: Receives and displays the remote screen
- **Permission System**: Manages access permissions

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- [WebRTC](https://webrtc.org/)
- [Socket.IO](https://socket.io/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Nouvelle architecture (Next.js + Flask)

- **Frontend** : Next.js (pages, UI, appels API)
- **Backend** : Flask (Python)
  - Gère l'exécution des commandes système pour TightVNC et noVNC
  - Fournit des endpoints API :
    - `/api/start-share` : Démarre le partage d'écran (TightVNC)
    - `/api/start-novnc` : Démarre une session noVNC pour accéder à un écran distant

## Scénario d'utilisation

1. **Page d'accueil** : Deux boutons
   - Partager mon écran
   - Accéder à un écran
2. **Partager mon écran** :
   - Le backend génère l'IP et le mot de passe, lance TightVNC
   - Affiche les infos à l'utilisateur
3. **Accéder à un écran** :
   - L'utilisateur saisit l'IP cible
   - Le backend lance noVNC et redirige l'utilisateur vers l'interface noVNC

## Lancement du projet

1. Lancer le backend Flask :
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
2. Lancer le frontend Next.js :
   ```bash
   npm install
   npm run dev
   ```

## Sécurité
- Le backend exécute des commandes système, à utiliser sur un environnement de test !
- Le mot de passe VNC est généré aléatoirement à chaque session.

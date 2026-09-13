import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      agency: 'DIGITEX',
      email: 'info.digitex.media@gmail.com',
      phone: '9034242154',
      whatsapp: '919034242154',
      instagram: 'https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA==',
    });
  });

  // Admin login check
  app.post('/api/admin/login', (req, res) => {
    const { passkey } = req.body;
    const expectedPasskey = process.env.ADMIN_PASSKEY || 'Digitex@2026!';

    if (passkey && passkey.trim() === expectedPasskey) {
      return res.json({ success: true, message: 'Authenticated successfully' });
    }
    return res.status(401).json({ success: false, message: 'Invalid administrative passkey' });
  });

  // Vite middleware in development, static build serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DIGITEX Server] Active on port ${PORT}`);
  });
}

startServer();

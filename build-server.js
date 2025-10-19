import { build } from 'esbuild';

console.log('Building server code...');

try {
  await build({
    entryPoints: [
      'server/index.ts',
      'server/routes.ts',
      'server/storage.ts',
      'server/email.ts',
      'server/vite.ts',
      'server/security.ts',
      'db/index.ts',
      'db/seed.ts',
      'shared/schema.ts'
    ],
    outdir: 'dist',
    platform: 'node',
    format: 'esm',
    target: 'node18',
    packages: 'external',
    sourcemap: false,
    outExtension: { '.js': '.js' },
    logLevel: 'info',
  });
  
  console.log('✓ Server build completed successfully!');
} catch (error) {
  console.error('✗ Build failed:', error);
  process.exit(1);
}

import { series } from 'gulp';
import execa from 'execa';

export async function clean(): Promise<void> {
  await execa('rm', ['-rf', './.cache'], {
    cwd: __dirname,
  });
  await execa('rm', ['-rf', './public'], {
    cwd: __dirname,
  });
  await execa('npx', ['gatsby', 'clean'], {
    cwd: __dirname,
  });
}

export async function quickBuild(): Promise<void> {
  await execa('npm', ['run', 'build'], {
    cwd: __dirname,
  });
}

export const build = series(clean, quickBuild);

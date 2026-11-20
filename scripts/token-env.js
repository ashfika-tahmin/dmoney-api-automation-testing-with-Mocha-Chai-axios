import { readFile, writeFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));

export async function updateTokenInEnv(name, token) {
    if (!/^[A-Z][A-Z0-9_]*$/.test(name)) {
        throw new Error(`Invalid token environment variable name: ${name}`);
    }
    if (typeof token !== 'string' || !token.trim()) {
        throw new Error(`Cannot save an empty ${name} value.`);
    }

    const currentContents = await readFile(envPath, 'utf8');
    const newline = currentContents.includes('\r\n') ? '\r\n' : '\n';
    const hasTrailingNewline = currentContents.endsWith('\n');
    const lines = currentContents ? currentContents.split(/\r?\n/) : [];

    if (hasTrailingNewline) {
        lines.pop();
    }

    let found = false;
    const updatedLines = lines.map(line => {
        if (line.startsWith(`${name}=`)) {
            found = true;
            return `${name}=${token}`;
        }
        return line;
    });

    if (!found) {
        updatedLines.push(`${name}=${token}`);
    }

    const updatedContents = `${updatedLines.join(newline)}${hasTrailingNewline ? newline : ''}`;
    await writeFile(envPath, updatedContents, 'utf8');

    const persistedToken = dotenv.parse(await readFile(envPath, 'utf8'))[name];
    if (persistedToken !== token) {
        throw new Error(`Failed to verify ${name} in .env after writing it.`);
    }

    process.env[name] = persistedToken;
}

export function getScriptElements(scripts: string[]): string {
    return scripts.map((script) => `<script type="application/javascript" src=${script}></script>`).join('\n');
}
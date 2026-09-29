import asyncio, subprocess, time, pathlib, shutil
from playwright.async_api import async_playwright
ROUTES=["/","/workflows","/contact","/about"]
DIST=pathlib.Path("dist")
async def main():
    srv=subprocess.Popen(["npx","vite","preview","--port","4173","--strictPort"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(4)
    try:
        async with async_playwright() as p:
            b=await p.chromium.launch(headless=True)
            pg=await b.new_page()
            for r in ROUTES:
                await pg.goto("http://localhost:4173"+r,wait_until="networkidle")
                await pg.wait_for_timeout(1500)
                html="<!doctype html>\n"+await pg.evaluate("document.documentElement.outerHTML")
                out=DIST/(r.strip("/")+"/index.html" if r!="/" else "index.html")
                out.parent.mkdir(parents=True,exist_ok=True)
                out.write_text(html)
                print("prerendered",r)
            await b.close()
    finally:
        srv.terminate()
asyncio.run(main())
# Stamp sitemap with the real build date
import datetime, re
_sm=DIST/"sitemap.xml"
if _sm.exists():
    _d=datetime.date.today().isoformat()
    _t=re.sub(r"\s*<lastmod>[^<]*</lastmod>","",_sm.read_text())
    _sm.write_text(re.sub(r"(</loc>)",r"\1\n    <lastmod>"+_d+"</lastmod>",_t))
    print("sitemap lastmod",_d)

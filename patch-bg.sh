#!/bin/bash
# Replaces CSS blob backgrounds with assets/bg.png across all pages
# Run from project root: bash patch-bg.sh

echo "Patching background..."

# 1. Add bg-image rule to styles.css, replacing the bg-blobs style
python3 - << 'PY'
css = open('css/styles.css').read()

old = '.bg-blobs{position:fixed;inset:0;z-index:0;background:#07060d;overflow:hidden;}'
new = '.bg-blobs{position:fixed;inset:0;z-index:0;background:#07060d;overflow:hidden;background-image:url("../assets/bg.png");background-size:cover;background-position:center;background-repeat:no-repeat;opacity:0.85;}'

if old in css:
    open('css/styles.css','w').write(css.replace(old,new))
    print("  styles.css updated")
else:
    print("  bg-blobs rule not found - check css/styles.css manually")
PY

# 2. Sub-pages reference assets one level up — add a separate rule to each sub CSS
for f in blog/blog.css shop/shop.css projects/projects.css; do
    python3 - << PY
css = open('$f').read()
old = '.bg-blobs{position:fixed;inset:0;z-index:0;background:#07060d;overflow:hidden;}'
new = '.bg-blobs{position:fixed;inset:0;z-index:0;background:#07060d;overflow:hidden;background-image:url("../../assets/bg.png");background-size:cover;background-position:center;background-repeat:no-repeat;opacity:0.85;}'
if old in css:
    open('$f','w').write(css.replace(old,new))
    print("  $f updated")
else:
    # append override if rule not present
    if 'bg-blobs' not in css:
        open('$f','a').write('\n.bg-blobs{background-image:url("../../assets/bg.png");background-size:cover;background-position:center;opacity:0.85;}')
        print("  $f appended")
    else:
        print("  $f already has bg-blobs rule - check manually")
PY
done

echo "Done. Hard refresh your browser."

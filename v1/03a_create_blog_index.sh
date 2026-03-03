#!/bin/bash
# 03a_create_blog_index.sh
set -e

cat > blog/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — XCURSION</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <nav>
    <a href="../index.html" class="nav-logo">Xcursion</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../index.html#about">About</a></li>
      <li><a href="../shop/">Shop</a></li>
      <li><a href="." class="active">Blog</a></li>
      <li><a href="../projects/">Projects</a></li>
    </ul>
  </nav>
  <main style="padding:120px 56px 80px;">
    <div class="section-label">Writing</div>
    <h2 class="section-title">Blog</h2>
    <div class="blog-grid">
      <div class="blog-card">
        <div class="blog-cat">Travel</div>
        <h3 class="blog-title"><a href="kyoto.html" style="color:inherit;text-decoration:none;">Finding stillness in Kyoto</a></h3>
        <p class="blog-excerpt">Somewhere between the third temple and a bowl of ramen, I stopped trying to optimise the trip.</p>
        <div class="blog-footer"><span>Feb 2025 &middot; 8 min</span><a href="kyoto.html" class="blog-read">Read &rarr;</a></div>
      </div>
      <div class="blog-card">
        <div class="blog-cat">Review &middot; Game</div>
        <h3 class="blog-title"><a href="hollow-knight.html" style="color:inherit;text-decoration:none;">Hollow Knight and the philosophy of getting lost</a></h3>
        <p class="blog-excerpt">A game that rewards you for not knowing what you're doing. Which sounds about right.</p>
        <div class="blog-footer"><span>Jan 2025 &middot; 6 min</span><a href="hollow-knight.html" class="blog-read">Read &rarr;</a></div>
      </div>
      <div class="blog-card">
        <div class="blog-cat">Philosophy</div>
        <h3 class="blog-title"><a href="being-behind.html" style="color:inherit;text-decoration:none;">On the feeling of being behind</a></h3>
        <p class="blog-excerpt">You're not behind. There's no finish line. This is the excursion.</p>
        <div class="blog-footer"><span>Dec 2024 &middot; 4 min</span><a href="being-behind.html" class="blog-read">Read &rarr;</a></div>
      </div>
      <div class="blog-card">
        <div class="blog-cat">Review &middot; Book</div>
        <h3 class="blog-title"><a href="naval-almanack.html" style="color:inherit;text-decoration:none;">The Almanack of Naval Ravikant</a></h3>
        <p class="blog-excerpt">Not a summary. Just the parts that hit different at 2am.</p>
        <div class="blog-footer"><span>Nov 2024 &middot; 5 min</span><a href="naval-almanack.html" class="blog-read">Read &rarr;</a></div>
      </div>
      <div class="blog-card">
        <div class="blog-cat">Travel</div>
        <h3 class="blog-title"><a href="lagos.html" style="color:inherit;text-decoration:none;">48 hours in Lagos</a></h3>
        <p class="blog-excerpt">Chaotic, warm, overwhelming, electric. Leave the plan at the airport.</p>
        <div class="blog-footer"><span>Oct 2024 &middot; 7 min</span><a href="lagos.html" class="blog-read">Read &rarr;</a></div>
      </div>
      <div class="blog-card">
        <div class="blog-cat">Random Thoughts</div>
        <h3 class="blog-title"><a href="boredom.html" style="color:inherit;text-decoration:none;">Why boredom is the most underrated creative tool</a></h3>
        <p class="blog-excerpt">The best ideas I've had happened in the spaces where nothing was demanding my attention.</p>
        <div class="blog-footer"><span>Sep 2024 &middot; 3 min</span><a href="boredom.html" class="blog-read">Read &rarr;</a></div>
      </div>
    </div>
  </main>
</body>
</html>
EOF
echo "✓ blog/index.html"
